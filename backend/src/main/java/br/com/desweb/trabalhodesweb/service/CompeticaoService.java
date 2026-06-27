package br.com.desweb.trabalhodesweb.service;

import br.com.desweb.trabalhodesweb.dto.CompeticaoCreate;
import br.com.desweb.trabalhodesweb.model.Competicao;
import br.com.desweb.trabalhodesweb.model.Jogo;
import br.com.desweb.trabalhodesweb.model.Time;
import br.com.desweb.trabalhodesweb.repository.CompeticaoRepository;
import br.com.desweb.trabalhodesweb.repository.JogoRepository;
import br.com.desweb.trabalhodesweb.repository.TimeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class CompeticaoService {

    @Autowired
    private CompeticaoRepository competicaoRepository;
    @Autowired
    private TimeRepository timeRepository;
    @Autowired
    private JogoRepository jogoRepository;

    public List<Competicao> listarCompeticoes() {
        return competicaoRepository.findAll();
    }

    public Competicao buscarCompeticaoPorId(Long id) { return competicaoRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Competicao Nao Encontrada"));}

    @Transactional
    public Competicao criarCompeticao(CompeticaoCreate competicaoCreate){

        Competicao competicao = new Competicao();
        competicao.setNome(competicaoCreate.nome());
        competicao.setDataInicio(competicaoCreate.dataInicio());
        competicao.setDataFim(competicaoCreate.dataFim());


        if (competicaoCreate.timesIds() != null && !competicaoCreate.timesIds().isEmpty()){
            List<Time> times = timeRepository.findAllById(competicaoCreate.timesIds());
            competicao.setTimes(times);
        }

        if (competicaoCreate.jogosIds() != null && !competicaoCreate.jogosIds().isEmpty()){
            List<Jogo> jogos = jogoRepository.findAllById(competicaoCreate.jogosIds());
            competicao.setJogos(jogos);
        }

        return competicaoRepository.save(competicao);
    }

    @Transactional
    public Competicao atualizarCompeticao(Long id, CompeticaoCreate competicaoCreate){
        Competicao competicao = competicaoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Competicao nao encontrada"));

        if (competicaoCreate.timesIds() != null && !competicaoCreate.timesIds().isEmpty()){
            List<Time> times = timeRepository.findAllById(competicaoCreate.timesIds());
            competicao.setTimes(times);
        }

        if (competicaoCreate.jogosIds() != null && !competicaoCreate.jogosIds().isEmpty()){
            List<Jogo> jogos = jogoRepository.findAllById(competicaoCreate.jogosIds());
            competicao.setJogos(jogos);
        }

        competicao.setNome(competicaoCreate.nome());
        competicao.setDataInicio(competicaoCreate.dataInicio());
        competicao.setDataFim(competicaoCreate.dataFim());

        return competicaoRepository.save(competicao);
    }

    @Transactional
    public void deletarCompeticao(Long id){
        competicaoRepository.deleteById(id);
    }
}
