package br.com.desweb.trabalhodesweb.service;

import br.com.desweb.trabalhodesweb.dto.JogoCreate;
import br.com.desweb.trabalhodesweb.model.Competicao;
import br.com.desweb.trabalhodesweb.model.Jogo;
import br.com.desweb.trabalhodesweb.model.Time;
import br.com.desweb.trabalhodesweb.repository.CompeticaoRepository;
import br.com.desweb.trabalhodesweb.repository.JogoRepository;
import br.com.desweb.trabalhodesweb.repository.TimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class JogoService {

    @Autowired
    private JogoRepository jogoRepository;

    @Autowired
    private TimeRepository timeRepository;

    @Autowired
    private CompeticaoRepository competicaoRepository;

    public List<Jogo> listarJogos() {
        return jogoRepository.findAll();
    }

    public Jogo buscarJogoPorId(Long id) {
        return jogoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Jogo não encontrado"));
    }

    public Jogo criarJogo(JogoCreate jogoCreate) {
        Time timeA = timeRepository.findById(jogoCreate.timeAId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Time A não encontrado"));

        Time timeB = timeRepository.findById(jogoCreate.timeBId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Time B não encontrado"));

        Competicao competicao = competicaoRepository.findById(jogoCreate.competicaoId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Competição não encontrada"));

        Jogo jogo = new Jogo();
        jogo.setTimeA(timeA);
        jogo.setTimeB(timeB);
        jogo.setCompeticao(competicao);
        jogo.setDescricao(jogoCreate.descricao());
        jogo.setLocal(jogoCreate.local());

        return jogoRepository.save(jogo);
    }

    // essa daqui não faz sentido sem os eventos(é a mesma coisa do criarJogo), não sei ainda como vai ser a atualização de um jogo
    public Jogo atualizarJogo(Long id, JogoCreate jogoCreate) {
        Jogo jogo = buscarJogoPorId(id);

        Time timeA = timeRepository.findById(jogoCreate.timeAId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Time A não encontrado"));

        Time timeB = timeRepository.findById(jogoCreate.timeBId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Time B não encontrado"));

        Competicao competicao = competicaoRepository.findById(jogoCreate.competicaoId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Competição não encontrada"));

        jogo.setTimeA(timeA);
        jogo.setTimeB(timeB);
        jogo.setCompeticao(competicao);
        jogo.setDescricao(jogoCreate.descricao());
        jogo.setLocal(jogoCreate.local());

        return jogoRepository.save(jogo);
    }

    public void deletarJogo(Long id) {
        buscarJogoPorId(id);
        jogoRepository.deleteById(id);
    }
}
