package br.com.desweb.trabalhodesweb.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Dictionary;
import java.util.List;

public class Jogo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Competicao competicao;

    private Time time_a;
    private Time time_b;
    private int placar_a;
    private int placar_b;

    private List<Evento> eventos;

    private String descricao;
    private String local;
}
