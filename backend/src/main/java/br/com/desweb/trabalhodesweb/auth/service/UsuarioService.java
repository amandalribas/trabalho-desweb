package br.com.desweb.trabalhodesweb.auth.service;

import br.com.desweb.trabalhodesweb.auth.dto.UsuarioCreate;
import br.com.desweb.trabalhodesweb.auth.model.Usuario;
import br.com.desweb.trabalhodesweb.auth.repository.UsuarioRepository;
import br.com.desweb.trabalhodesweb.auth.util.InfoUsuario;
import br.com.desweb.trabalhodesweb.auth.util.Role;
import br.com.desweb.trabalhodesweb.exception.EntidadeNaoEncontradaException;
import br.com.desweb.trabalhodesweb.model.Time;
import br.com.desweb.trabalhodesweb.repository.TimeRepository;
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
    private final TimeRepository timeRepository;

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
        } else {
            return new InfoUsuario(false, true, "Email já cadastrado!");
        }
    }

    public List<Usuario> recuperarUsuarios() {
        return usuarioRepository.findAll();
    }

    /*
    public List<Long> buscarTimesPorUsuarioId(Long id) {
        return usuarioRepository.findById(id)
                .map(Usuario::getTimesIds)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }*/
    // ================ lista de times favoritos
    public List<Time> adicionarTime(Long idUsuario, Long idTime) {
        Usuario usuario = usuarioRepository.findById(idUsuario).orElseThrow(
                () -> new EntidadeNaoEncontradaException(
                        "Usuário com id " + idUsuario + " não encontrado! ")
        );
        Time time = timeRepository.findById(idTime).orElseThrow(
                () -> new EntidadeNaoEncontradaException(
                        "Time com id " + idTime + " não encontrado!")
        );
        if (!usuario.getTimesFavoritos().contains(time)) {
            usuario.getTimesFavoritos().add(time);
        }
        usuarioRepository.save(usuario);

        return usuario.getTimesFavoritos();
    }

    public List<Time> listarTimes(Long idUsuario) {
        Usuario usuario = usuarioRepository.findById(idUsuario).orElseThrow(
                () -> new EntidadeNaoEncontradaException(
                        "Usuário com id " + idUsuario + " não encontrado!")
        );
        return usuario.getTimesFavoritos();
    }

    public void removerTime(Long idUsuario, Long idTime) {
        Usuario usuario = usuarioRepository.findById(idUsuario).orElseThrow(
                () -> new EntidadeNaoEncontradaException(
                        "Usuario com id " + idUsuario + " não encontrado!"
                )
        );
        Time time = timeRepository.findById(idTime).orElseThrow(
                () -> new EntidadeNaoEncontradaException("Time com id " + idTime + " não encontrado!")
        );
        usuario.getTimesFavoritos().remove(time);
        usuarioRepository.save(usuario);
    }
}