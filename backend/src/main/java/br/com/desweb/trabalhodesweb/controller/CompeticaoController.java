package br.com.desweb.trabalhodesweb.controller;

import br.com.desweb.trabalhodesweb.model.Competicao;
import br.com.desweb.trabalhodesweb.service.CompeticaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("competicoes")
public class CompeticaoController {

    @Autowired
    private CompeticaoService competicaoService;

    @GetMapping
    public List<Competicao> listarCompeticoes() {
        return competicaoService.listarCompeticoes();
    }
}
