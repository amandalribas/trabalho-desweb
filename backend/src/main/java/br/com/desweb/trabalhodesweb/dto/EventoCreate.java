package br.com.desweb.trabalhodesweb.dto;

import br.com.desweb.trabalhodesweb.model.TipoEvento;

public record EventoCreate(
        TipoEvento tipoEvento,
        Long timeId,
        Long jogoId,
        String jogador
) {}