package br.com.desweb.trabalhodesweb.controller;

import br.com.desweb.trabalhodesweb.dto.JogoCreate;
import br.com.desweb.trabalhodesweb.model.Jogo;
import br.com.desweb.trabalhodesweb.service.JogoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("jogos")
public class JogoController {

    @Autowired
    private JogoService jogoService;

    @GetMapping
    public List<Jogo> listarJogos() {
        return jogoService.listarJogos();
    }

    // acho que nem é necessário
    @GetMapping("{id}")
    public Jogo buscarJogoPorId(@PathVariable Long id) {
        return jogoService.buscarJogoPorId(id);
    }

    @PostMapping
    public Jogo criarJogo(@RequestBody JogoCreate jogoCreate) {
        return jogoService.criarJogo(jogoCreate);
    }

    // não sei como vai funcionar isso com os eventos
    @PutMapping("{id}")
    public Jogo atualizarJogo(@PathVariable Long id, @RequestBody JogoCreate jogoCreate) {
        return jogoService.atualizarJogo(id, jogoCreate);
    }

    // também não sei se é necessário
    @DeleteMapping("{id}")
    public void deletarJogo(@PathVariable Long id) {
        jogoService.deletarJogo(id);
    }
}
