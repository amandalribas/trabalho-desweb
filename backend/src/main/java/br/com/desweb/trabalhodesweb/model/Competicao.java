package br.com.desweb.trabalhodesweb.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Competicao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Mexi e comentei pq não preciso no momento para poder testar a criação do jogo
    // @OneToMany(mappedBy = "competicao")
    // @JsonIgnore
    // private List<Jogo> jogo;

    // @ManyToMany
    // @JoinTable(name = "competicao_time",
    //     joinColumns = @JoinColumn(name = "competicao_id"),
    //     inverseJoinColumns = @JoinColumn(name = "time_id"))
    // private List<Time> time;

    private Date dataInicio;
    private Date dataFim;
}
