package br.com.desweb.trabalhodesweb.dto;

import br.com.desweb.trabalhodesweb.model.StatusJogo;

import java.time.Instant;

public record JogoDTO(
        Long id,
        String descricao,
        String local,
        int placarA,
        int placarB,
        Long timeAId,
        String timeANome,
        String timeAImagem,
        Long timeBId,
        String timeBNome,
        String timeBImagem,
        Long competicaoId,
        StatusJogo status,
        Instant iniciadoEm
) {}