package br.com.desweb.trabalhodesweb.auth.repository;

import br.com.desweb.trabalhodesweb.auth.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
}
