package br.com.desweb.trabalhodesweb.auth.service;

import br.com.desweb.trabalhodesweb.auth.dto.UsuarioCreate;
import br.com.desweb.trabalhodesweb.auth.model.Usuario;
import br.com.desweb.trabalhodesweb.auth.repository.UsuarioRepository;
import br.com.desweb.trabalhodesweb.auth.util.InfoUsuario;
import br.com.desweb.trabalhodesweb.auth.util.Role;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@AllArgsConstructor
@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public InfoUsuario cadastrarUsuario(UsuarioCreate usuarioCreate) {
        Usuario usuarioCadastrado = usuarioRepository
                .findByEmail(usuarioCreate.getEmail())
                .orElse(null);
        if (usuarioCadastrado == null) {
            List<Long> timesIds = usuarioCreate.getTimesIds() != null ? usuarioCreate.getTimesIds() : List.of();

            Usuario usuario = new Usuario(
                    usuarioCreate.getNome(),
                    usuarioCreate.getEmail(),
                    passwordEncoder.encode(usuarioCreate.getSenha()),
                    Role.USER,
                    new ArrayList<>(timesIds)
            );

            usuarioRepository.save(usuario);
            return new InfoUsuario(true, false, "Usuário cadastrado com sucesso!");
        }
        else {
            return new InfoUsuario(false, true, "Email já cadastrado!");
        }
    }

    public List<Usuario> recuperarUsuarios() {
        return usuarioRepository.findAll();
    }

    public List<Long> buscarTimesPorUsuarioId(Long id) {
        return usuarioRepository.findById(id)
                .map(Usuario::getTimesIds)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }
}