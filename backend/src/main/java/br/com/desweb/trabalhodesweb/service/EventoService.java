package br.com.desweb.trabalhodesweb.service;

import br.com.desweb.trabalhodesweb.dto.EventoDTO;
import br.com.desweb.trabalhodesweb.dto.EventoCreate;
import br.com.desweb.trabalhodesweb.mapper.EventoMapper;
import br.com.desweb.trabalhodesweb.model.Evento;
import br.com.desweb.trabalhodesweb.model.Jogo;
import br.com.desweb.trabalhodesweb.model.Time;
import br.com.desweb.trabalhodesweb.repository.EventoRepository;
import br.com.desweb.trabalhodesweb.repository.JogoRepository;
import br.com.desweb.trabalhodesweb.repository.TimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private JogoRepository jogoRepository;

    @Autowired
    private TimeRepository timeRepository;

    @Autowired
    private EventoMapper eventoMapper;

    public List<EventoDTO> listarEventos() {
        return eventoMapper.toEventosDTO(eventoRepository.findAll());
    }

    public List<EventoDTO> listarEventosPorJogo(Long jogoId) {
        return eventoMapper.toEventosDTO(eventoRepository.findByJogoId(jogoId));
    }

    public EventoDTO buscarEventoPorId(Long id) {
        Evento evento = eventoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Evento não encontrado"));
        return eventoMapper.toEventoDTO(evento);
    }

    public EventoDTO criarEvento(EventoCreate eventoCreate) {
        Jogo jogo = jogoRepository.findById(eventoCreate.getJogoId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Jogo não encontrado"));

        Time time = timeRepository.findById(eventoCreate.getTimeId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Time não encontrado"));

        Evento evento = new Evento();
        evento.setTipoEvento(eventoCreate.getTipoEvento());
        evento.setJogador(eventoCreate.getJogador());
        evento.setJogo(jogo);
        evento.setTime(time);

        return eventoMapper.toEventoDTO(eventoRepository.save(evento));
    }

    public EventoDTO atualizarEvento(Long id, EventoCreate eventoCreate) {
        Evento evento = eventoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Evento não encontrado"));

        Jogo jogo = jogoRepository.findById(eventoCreate.getJogoId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Jogo não encontrado"));

        Time time = timeRepository.findById(eventoCreate.getTimeId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Time não encontrado"));

        evento.setTipoEvento(eventoCreate.getTipoEvento());
        evento.setJogador(eventoCreate.getJogador());
        evento.setJogo(jogo);
        evento.setTime(time);

        return eventoMapper.toEventoDTO(eventoRepository.save(evento));
    }

    public void deletarEvento(Long id) {
        eventoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Evento não encontrado"));
        eventoRepository.deleteById(id);
    }
}