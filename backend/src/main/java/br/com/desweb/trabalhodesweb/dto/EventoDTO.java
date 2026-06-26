package br.com.desweb.trabalhodesweb.dto;

import br.com.desweb.trabalhodesweb.model.TipoEvento;

public record EventoDTO(
        Long id,
        TipoEvento tipoEvento,
        String jogador,
        Long jogoId,
        String jogoDescricao,
        Long timeId,
        String timeNome
) {}