package br.com.desweb.trabalhodesweb.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class Time {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_time;

    private String nome;
    private String sigla;
    private String imagem;

}
