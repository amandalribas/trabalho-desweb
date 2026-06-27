package br.com.desweb.trabalhodesweb.controller;

import br.com.desweb.trabalhodesweb.dto.EventoCreate;
import br.com.desweb.trabalhodesweb.dto.EventoDTO;
import br.com.desweb.trabalhodesweb.service.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("eventos")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @GetMapping
    public ResponseEntity<List<EventoDTO>> listarEventos() {
        return ResponseEntity.ok(eventoService.listarEventos());
    }

    @GetMapping("jogo/{jogoId}")
    public ResponseEntity<List<EventoDTO>> listarEventosPorJogo(@PathVariable Long jogoId) {
        return ResponseEntity.ok(eventoService.listarEventosPorJogo(jogoId));
    }

    @GetMapping("{id}")
    public ResponseEntity<EventoDTO> buscarEventoPorId(@PathVariable Long id) {
        return ResponseEntity.ok(eventoService.buscarEventoPorId(id));
    }

    @PostMapping
    public ResponseEntity<EventoDTO> criarEvento(@RequestBody EventoCreate eventoCreate) {
        return new ResponseEntity<>(eventoService.criarEvento(eventoCreate), HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<EventoDTO> atualizarEvento(@PathVariable Long id, @RequestBody EventoCreate eventoCreate) {
        return ResponseEntity.ok(eventoService.atualizarEvento(id, eventoCreate));
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletarEvento(@PathVariable Long id) {
        eventoService.deletarEvento(id);
    }
}