package br.com.desweb.trabalhodesweb.auth.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import br.com.desweb.trabalhodesweb.auth.util.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;

@ToString
@Getter
@Setter
@NoArgsConstructor
@Entity
public class Usuario {
    //Consideramos a parte de autenticação vista em sala:
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "O 'Nome' deve ser informado.")
    private String nome;

    @NotEmpty(message = "O 'Email' deve ser informado.")
    @Email(message = "Email inválido.")
    @Column(unique = true)
    private String email;

    @NotEmpty(message = "A 'Senha' deve ser informada.")
    private String senha;

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(
            name = "usuario_times",
            joinColumns = @JoinColumn(name = "usuario_id")
    )
    @Column(name = "time_id") //
    private java.util.List<Long> timesIds = new java.util.ArrayList<>();

    public Usuario(String nome, String email, String senha, Role role, ArrayList<Long> timesIds) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.role = role;
        this.timesIds = new java.util.ArrayList<>(timesIds);;
    }
}
