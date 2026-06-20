package br.com.desweb.trabalhodesweb.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_evento;

    private TipoEvento tipoEvento;

    private Time time;
    private Jogo jogo;
    private String jogador;
}
