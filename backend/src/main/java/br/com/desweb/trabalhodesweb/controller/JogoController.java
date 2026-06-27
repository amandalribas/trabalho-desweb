package br.com.desweb.trabalhodesweb.controller;

import br.com.desweb.trabalhodesweb.dto.EventoCreate;
import br.com.desweb.trabalhodesweb.dto.EventoDTO;
import br.com.desweb.trabalhodesweb.dto.JogoCreate;
import br.com.desweb.trabalhodesweb.dto.JogoDTO;
import br.com.desweb.trabalhodesweb.service.JogoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("jogos")
public class JogoController {

    @Autowired
    private JogoService jogoService;

    @GetMapping
    public ResponseEntity<List<JogoDTO>> listarJogos() {
        return ResponseEntity.ok(jogoService.listarJogos());
    }

    @GetMapping("{id}")
    public ResponseEntity<JogoDTO> buscarJogoPorId(@PathVariable Long id) {
        return ResponseEntity.ok(jogoService.buscarJogoPorId(id));
    }

    @PostMapping
    public ResponseEntity<JogoDTO> criarJogo(@RequestBody JogoCreate jogoCreate) {
        return new ResponseEntity<>(jogoService.criarJogo(jogoCreate), HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<JogoDTO> atualizarJogo(@PathVariable Long id, @RequestBody JogoCreate jogoCreate) {
        return ResponseEntity.ok(jogoService.atualizarJogo(id, jogoCreate));
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletarJogo(@PathVariable Long id) {
        jogoService.deletarJogo(id);
    }

    @PostMapping("{id}/iniciar")
    public ResponseEntity<JogoDTO> iniciarJogo(@PathVariable Long id) {
        return ResponseEntity.ok(jogoService.iniciarJogo(id));
    }

    @PostMapping("{id}/intervalo")
    public ResponseEntity<JogoDTO> iniciarIntervalo(@PathVariable Long id) {
        return ResponseEntity.ok(jogoService.iniciarIntervalo(id));
    }

    @PostMapping("{id}/encerrar")
    public ResponseEntity<JogoDTO> encerrarJogo(@PathVariable Long id) {
        return ResponseEntity.ok(jogoService.encerrarJogo(id));
    }

    @PostMapping("{id}/eventos")
    public ResponseEntity<EventoDTO> adicionarEvento(
            @PathVariable Long id,
            @RequestBody EventoCreate eventoCreate) {
        return new ResponseEntity<>(jogoService.adicionarEvento(id, eventoCreate), HttpStatus.CREATED);
    }
}