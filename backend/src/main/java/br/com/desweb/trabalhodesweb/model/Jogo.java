package br.com.desweb.trabalhodesweb.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

// import java.util.List;

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

    // Comentei pq não existe o crud de eventos ainda
    // @OneToMany(mappedBy = "jogo")
    // private List<Evento> eventos;

    private String descricao;
    private String local;
}
