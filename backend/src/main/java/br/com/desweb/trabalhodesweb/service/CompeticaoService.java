package br.com.desweb.trabalhodesweb.service;

import br.com.desweb.trabalhodesweb.dto.CompeticaoCreate;
import br.com.desweb.trabalhodesweb.dto.CompeticaoDTO;
import br.com.desweb.trabalhodesweb.mapper.CompeticaoMapper;
import br.com.desweb.trabalhodesweb.model.Competicao;
import br.com.desweb.trabalhodesweb.repository.CompeticaoRepository;
import br.com.desweb.trabalhodesweb.repository.JogoRepository;
import br.com.desweb.trabalhodesweb.repository.TimeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CompeticaoService {

    @Autowired
    private CompeticaoRepository competicaoRepository;
    @Autowired
    private TimeRepository timeRepository;
    @Autowired
    private JogoRepository jogoRepository;

    @Autowired
    private CompeticaoMapper competicaoMapper;

    public List<CompeticaoDTO> listarCompeticoes() {
        List<Competicao> competicoes = competicaoRepository.findAll();
        return competicaoMapper.toCompeticoesDTO(competicoes);
    }

    public CompeticaoDTO buscarCompeticaoPorId(Long id) {
        Competicao competicao = competicaoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Competicao Nao Encontrada"));
        return competicaoMapper.toCompeticaoDTO(competicao);
    }

    @Transactional
    public CompeticaoDTO criarCompeticao(CompeticaoCreate competicaoCreate){

        Competicao competicao = new Competicao();
        competicao.setNome(competicaoCreate.nome());
        competicao.setDataInicio(competicaoCreate.dataInicio());
        competicao.setDataFim(competicaoCreate.dataFim());

        Competicao competicaoSalva = competicaoRepository.save(competicao);
        return competicaoMapper.toCompeticaoDTO(competicaoSalva);
    }

    @Transactional
    public CompeticaoDTO atualizarCompeticao(Long id, CompeticaoCreate competicaoCreate){
        Competicao competicao = competicaoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Competicao nao encontrada"));

        competicao.setNome(competicaoCreate.nome());
        competicao.setDataInicio(competicaoCreate.dataInicio());
        competicao.setDataFim(competicaoCreate.dataFim());

        Competicao competicaoAtualizada = competicaoRepository.save(competicao);
        return competicaoMapper.toCompeticaoDTO(competicaoAtualizada);
    }

    @Transactional
    public void deletarCompeticao(Long id){
        Competicao competicao = competicaoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Competicao nao encontrada"));
        if (competicao.getTimes() != null) {
            competicao.getTimes().clear();
        }
        if (competicao.getJogos() != null) {
            competicao.getJogos().clear();
        }

        competicaoRepository.delete(competicao);
    }
}