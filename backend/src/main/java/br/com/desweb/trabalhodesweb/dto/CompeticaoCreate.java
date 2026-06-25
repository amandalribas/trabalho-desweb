package br.com.desweb.trabalhodesweb.dto;

import br.com.desweb.trabalhodesweb.model.Jogo;
import br.com.desweb.trabalhodesweb.model.Time;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class CompeticaoCreate {
    private String nome;
    private List<Long> jogosIds;
    private List<Long> timesIds;
    private Date dataInicio;
    private Date dataFim;
}
