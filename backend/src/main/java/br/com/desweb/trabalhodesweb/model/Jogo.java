package br.com.desweb.trabalhodesweb.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.Instant;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Jogo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "competicao_id")
    private Competicao competicao;

    @ManyToOne
    @JoinColumn(name = "time_a_id")
    private Time timeA;

    @ManyToOne
    @JoinColumn(name = "time_b_id")
    private Time timeB;

    private int placarA;
    private int placarB;

    @OneToMany(mappedBy = "jogo", cascade = CascadeType.ALL)
    private List<Evento> eventos;

    private String descricao;
    private String local;

    // Timer: momento em que o jogo foi iniciado (null = ainda não começou)
    private Instant iniciadoEm;

    // Status do jogo: AGUARDANDO, EM_ANDAMENTO, INTERVALO, ENCERRADO
    @Enumerated(EnumType.STRING)
    private StatusJogo status = StatusJogo.AGUARDANDO;
}