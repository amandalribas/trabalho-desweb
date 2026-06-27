package br.com.desweb.trabalhodesweb.dto;

public record JogoCreate(
        Long competicaoId,
        Long timeAId,
        Long timeBId,
        String descricao,
        String local) {
}
