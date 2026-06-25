package br.com.desweb.trabalhodesweb.dto;

import lombok.Data;

@Data
public class JogoCreate {
    // é criado sem eventos
    private Long competicaoId;
    private Long timeAId;
    private Long timeBId;
    private String descricao;
    private String local;
}
