package br.com.desweb.trabalhodesweb.controller;

import br.com.desweb.trabalhodesweb.dto.TimeCreate;
import br.com.desweb.trabalhodesweb.model.Time;
import br.com.desweb.trabalhodesweb.service.TimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("times")
public class TimeController {

    @Autowired
    private TimeService timeService;

    @PostMapping
    public Time criarTime(@ModelAttribute TimeCreate timeCreate) {
        return timeService.criarTime(timeCreate);
    }

    @GetMapping("{id}")
    public Time buscarTimePorId(@PathVariable Long id) {
        return timeService.buscarTimePorId(id);
    }

    @PutMapping("{id}")
    public Time atualizarTime(@PathVariable Long id, @RequestBody TimeCreate timeCreate) {
        return timeService.atualizarTime(id, timeCreate);
    }

    @DeleteMapping("{id}")
    public void deletarTime(@PathVariable Long id) {
        timeService.deletarTime(id);
    }

    @GetMapping
    public List<Time> listarTimes() {
        return timeService.listarTimes();
    }
}
