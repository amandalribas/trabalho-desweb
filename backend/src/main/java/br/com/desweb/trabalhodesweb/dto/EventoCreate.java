package br.com.desweb.trabalhodesweb.dto;

import br.com.desweb.trabalhodesweb.model.TipoEvento;
import lombok.Data;

@Data
public class EventoCreate {
    private TipoEvento tipoEvento;
    private Long timeId;
    private Long jogoId;
    private String jogador;
}

