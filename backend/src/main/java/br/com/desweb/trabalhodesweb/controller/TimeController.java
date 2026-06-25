package br.com.desweb.trabalhodesweb.controller;

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

    @GetMapping
    public List<Time> listarTimes() {
        return timeService.listarTimes();
    }
}
