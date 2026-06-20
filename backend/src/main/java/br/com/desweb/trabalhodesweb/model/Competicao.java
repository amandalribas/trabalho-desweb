package br.com.desweb.trabalhodesweb.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Date;
import java.util.List;

public class Competicao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_competicao;

    private List<Jogo> jogo;
    private List<Time> time;

    private Date data_inicio;
    private Date data_fim;

}
