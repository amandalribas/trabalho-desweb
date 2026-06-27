package br.com.desweb.trabalhodesweb.controller;

import br.com.desweb.trabalhodesweb.dto.CompeticaoCreate;
import br.com.desweb.trabalhodesweb.dto.CompeticaoDTO;
import br.com.desweb.trabalhodesweb.service.CompeticaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("competicoes")
public class CompeticaoController {

    @Autowired
    private CompeticaoService competicaoService;

    @GetMapping
    public List<CompeticaoDTO> listarCompeticoes() {
        return competicaoService.listarCompeticoes();
    }

    @GetMapping("/{id}")
    public CompeticaoDTO buscarPorCompeticaoId(@PathVariable Long id) {
        return competicaoService.buscarCompeticaoPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CompeticaoDTO criarCompeticao(@RequestBody CompeticaoCreate competicaoCreate) {
        return competicaoService.criarCompeticao(competicaoCreate);
    }

    @PutMapping("/{id}")
    public CompeticaoDTO atualizarCompeticao(@PathVariable Long id, @RequestBody CompeticaoCreate competicaoCreate){
        return competicaoService.atualizarCompeticao(id, competicaoCreate);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletarCompeticao(@PathVariable Long id) {
        competicaoService.deletarCompeticao(id);
    }
}