package br.com.desweb.trabalhodesweb.dto;

import br.com.desweb.trabalhodesweb.model.Jogo;
import br.com.desweb.trabalhodesweb.model.Time;
import lombok.Data;

import java.util.Date;
import java.util.List;

public record CompeticaoCreate (
    String nome,
    List<Long> jogosIds,
    List<Long> timesIds,
    Date dataInicio,
    Date dataFim
) {
}
