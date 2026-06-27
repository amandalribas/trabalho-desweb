package br.com.desweb.trabalhodesweb.dto;


import br.com.desweb.trabalhodesweb.model.Time;
import br.com.desweb.trabalhodesweb.dto.JogoDTO;

import java.util.Date;
import java.util.List;

public record CompeticaoDTO (
        Long id,
        String nome,
        Date dataInicio,
        Date dataFim,
        List<JogoDTO> jogos,

        // alterar para TimeDTO caso seja feito
        List<Time> times
) {}
