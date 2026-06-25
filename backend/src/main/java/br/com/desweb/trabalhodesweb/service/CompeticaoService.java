package br.com.desweb.trabalhodesweb.service;

import br.com.desweb.trabalhodesweb.model.Competicao;
import br.com.desweb.trabalhodesweb.repository.CompeticaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompeticaoService {

    @Autowired
    private CompeticaoRepository competicaoRepository;

    public List<Competicao> listarCompeticoes() {
        return competicaoRepository.findAll();
    }
}
