package br.com.desweb.trabalhodesweb.controller;

import br.com.desweb.trabalhodesweb.dto.CompeticaoCreate;
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

    @GetMapping("/{id}")
    public Competicao buscarPorCompeticaoId(@PathVariable Long id) { return competicaoService.buscarCompeticaoPorId(id);}

    @PostMapping
    public Competicao criarCompeticao(@RequestBody CompeticaoCreate competicaoCreate) { return competicaoService.criarCompeticao(competicaoCreate);}

    @PutMapping("/{id}")
    public Competicao atualizarCompeticao(@PathVariable Long id, @RequestBody CompeticaoCreate competicaoCreate){
        return competicaoService.atualizarCompeticao(id, competicaoCreate);
    }

    @DeleteMapping("/{id}")
    public void deletarCompeticao(@PathVariable Long id) { competicaoService.deletarCompeticao(id); }
}
