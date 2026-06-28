package br.com.desweb.trabalhodesweb.service;

import br.com.desweb.trabalhodesweb.config.RabbitMQConfig;
import br.com.desweb.trabalhodesweb.dto.EventoCreate;
import br.com.desweb.trabalhodesweb.dto.EventoDTO;
import br.com.desweb.trabalhodesweb.dto.JogoCreate;
import br.com.desweb.trabalhodesweb.dto.JogoDTO;
import br.com.desweb.trabalhodesweb.mapper.EventoMapper;
import br.com.desweb.trabalhodesweb.mapper.JogoMapper;
import br.com.desweb.trabalhodesweb.model.*;
import br.com.desweb.trabalhodesweb.repository.CompeticaoRepository;
import br.com.desweb.trabalhodesweb.repository.EventoRepository;
import br.com.desweb.trabalhodesweb.repository.JogoRepository;
import br.com.desweb.trabalhodesweb.repository.TimeRepository;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;

@Service
public class JogoService {

    @Autowired
    private JogoRepository jogoRepository;
    @Autowired
    private TimeRepository timeRepository;
    @Autowired
    private CompeticaoRepository competicaoRepository;
    @Autowired
    private EventoRepository eventoRepository;
    @Autowired
    private JogoMapper jogoMapper;
    @Autowired
    private EventoMapper eventoMapper;
    @Autowired
    private RabbitTemplate rabbitTemplate;

    public List<JogoDTO> listarJogos() {
        return jogoMapper.toJogosDTO(jogoRepository.findAll());
    }

    public JogoDTO buscarJogoPorId(Long id) {
        return jogoMapper.toJogoDTO(encontrarJogo(id));
    }

    public JogoDTO criarJogo(JogoCreate jogoCreate) {
        Time timeA = timeRepository.findById(jogoCreate.timeAId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Time A não encontrado"));
        Time timeB = timeRepository.findById(jogoCreate.timeBId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Time B não encontrado"));
        Competicao competicao = competicaoRepository.findById(jogoCreate.competicaoId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Competição não encontrada"));

        if (!competicao.getTimes().contains(timeA)){
            competicao.getTimes().add(timeA);
        }
        if (!competicao.getTimes().contains(timeB)){
            competicao.getTimes().add(timeB);
        }

        Jogo jogo = new Jogo();
        jogo.setTimeA(timeA);
        jogo.setTimeB(timeB);
        jogo.setCompeticao(competicao);
        jogo.setDescricao(jogoCreate.descricao());
        jogo.setLocal(jogoCreate.local());
        jogo.setStatus(StatusJogo.AGUARDANDO);

        return jogoMapper.toJogoDTO(jogoRepository.save(jogo));
    }

    public JogoDTO atualizarJogo(Long id, JogoCreate jogoCreate) {
        Jogo jogo = encontrarJogo(id);
        Time timeA = timeRepository.findById(jogoCreate.timeAId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Time A não encontrado"));
        Time timeB = timeRepository.findById(jogoCreate.timeBId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Time B não encontrado"));
        Competicao competicao = competicaoRepository.findById(jogoCreate.competicaoId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Competição não encontrada"));

        if (!competicao.getTimes().contains(timeA)){
            competicao.getTimes().add(timeA);
        }
        if (!competicao.getTimes().contains(timeB)){
            competicao.getTimes().add(timeB);
        }

        jogo.setTimeA(timeA);
        jogo.setTimeB(timeB);
        jogo.setCompeticao(competicao);
        jogo.setDescricao(jogoCreate.descricao());
        jogo.setLocal(jogoCreate.local());

        return jogoMapper.toJogoDTO(jogoRepository.save(jogo));
    }

    public void deletarJogo(Long id) {
        encontrarJogo(id);
        jogoRepository.deleteById(id);
    }

    public JogoDTO iniciarJogo(Long id) {
        Jogo jogo = encontrarJogo(id);
        if (jogo.getStatus() != StatusJogo.AGUARDANDO && jogo.getStatus() != StatusJogo.INTERVALO) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Jogo não pode ser iniciado neste estado.");
        }
        if (jogo.getIniciadoEm() == null) {
            jogo.setIniciadoEm(Instant.now());
        }
        jogo.setStatus(StatusJogo.EM_ANDAMENTO);
        criarEventoInterno(jogo, TipoEvento.INICIO);
        return jogoMapper.toJogoDTO(jogoRepository.save(jogo));
    }

    public JogoDTO iniciarIntervalo(Long id) {
        Jogo jogo = encontrarJogo(id);
        if (jogo.getStatus() != StatusJogo.EM_ANDAMENTO) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Jogo precisa estar em andamento.");
        }
        jogo.setStatus(StatusJogo.INTERVALO);
        criarEventoInterno(jogo, TipoEvento.INTERVALO);
        return jogoMapper.toJogoDTO(jogoRepository.save(jogo));
    }

    public JogoDTO encerrarJogo(Long id) {
        Jogo jogo = encontrarJogo(id);
        if (jogo.getStatus() == StatusJogo.ENCERRADO) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Jogo já encerrado.");
        }
        jogo.setStatus(StatusJogo.ENCERRADO);
        criarEventoInterno(jogo, TipoEvento.FIM);
        return jogoMapper.toJogoDTO(jogoRepository.save(jogo));
    }

    public EventoDTO adicionarEvento(Long jogoId, EventoCreate eventoCreate) {
        Jogo jogo = encontrarJogo(jogoId);
        if (jogo.getStatus() != StatusJogo.EM_ANDAMENTO) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Só é possível adicionar eventos com o jogo em andamento.");
        }
        Time time = timeRepository.findById(eventoCreate.timeId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Time não encontrado"));

        Evento evento = new Evento();
        evento.setTipoEvento(eventoCreate.tipoEvento());
        evento.setJogador(eventoCreate.jogador());
        evento.setJogo(jogo);
        evento.setTime(time);
        evento.setMinuto(calcularMinuto(jogo));


        if (eventoCreate.tipoEvento() == TipoEvento.GOL) {
            if (time.getId().equals(jogo.getTimeA().getId())) {
                jogo.setPlacarA(jogo.getPlacarA() + 1);
            } else {
                jogo.setPlacarB(jogo.getPlacarB() + 1);
            }
            jogoRepository.save(jogo);
        } else if (eventoCreate.tipoEvento() == TipoEvento.GOL_CONTRA) {

            if (time.getId().equals(jogo.getTimeA().getId())) {
                jogo.setPlacarB(jogo.getPlacarB() + 1);
            } else {
                jogo.setPlacarA(jogo.getPlacarA() + 1);
            }
            jogoRepository.save(jogo);
        }

        EventoDTO eventoDTO = eventoMapper.toEventoDTO(eventoRepository.save(evento));

        // CONVERSÃO MANUAL PARA STRING JSON AQUI:
        try {
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            String jsonNotificacao = mapper.writeValueAsString(eventoDTO);
            rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_EVENTOS, "eventos", jsonNotificacao);
        } catch (com.fasterxml.jackson.core.JsonProcessingException e) {
            e.printStackTrace();
        }

        return eventoDTO;
    }

    private Jogo encontrarJogo(Long id) {
        return jogoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Jogo não encontrado"));
    }

    private void criarEventoInterno(Jogo jogo, TipoEvento tipo) {
        Evento evento = new Evento();
        evento.setTipoEvento(tipo);
        evento.setJogo(jogo);
        evento.setMinuto(calcularMinuto(jogo));
        EventoDTO eventoDTO = eventoMapper.toEventoDTO(eventoRepository.save(evento));


        try {
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            String jsonNotificacao = mapper.writeValueAsString(eventoDTO);
            rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_EVENTOS, "eventos", jsonNotificacao);
        } catch (com.fasterxml.jackson.core.JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    private int calcularMinuto(Jogo jogo) {
        if (jogo.getIniciadoEm() == null) return 0;
        long segundos = Instant.now().getEpochSecond() - jogo.getIniciadoEm().getEpochSecond();
        return (int) (segundos / 60);
    }
}