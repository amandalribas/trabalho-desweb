package br.com.desweb.trabalhodesweb.dto;

import br.com.desweb.trabalhodesweb.model.TipoEvento;

public record EventoDTO(
        Long id,
        TipoEvento tipoEvento,
        String jogador,
        Integer minuto,
        Long jogoId,
        String jogoDescricao,
        int placarA,
        int placarB,
        String timeANome,
        String timeBNome,
        Long timeId,
        String timeNome
) {}