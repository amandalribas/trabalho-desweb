package br.com.desweb.trabalhodesweb.auth.controller;

import br.com.desweb.trabalhodesweb.auth.dto.UsuarioCreate;
import br.com.desweb.trabalhodesweb.auth.model.Usuario;
import br.com.desweb.trabalhodesweb.auth.repository.UsuarioRepository;
import br.com.desweb.trabalhodesweb.auth.service.UsuarioService;
import br.com.desweb.trabalhodesweb.auth.util.InfoUsuario;
import br.com.desweb.trabalhodesweb.exception.EntidadeNaoEncontradaException;
import br.com.desweb.trabalhodesweb.model.Time;
import br.com.desweb.trabalhodesweb.repository.TimeRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("usuarios")   // htttp://localhost:8080/usuarios
public class UsuarioController {

    private final UsuarioService usuarioService;


    @GetMapping
    public List<Usuario> recuperaUsuarios() {
        return usuarioService.recuperarUsuarios();
    }

    @PostMapping
    public InfoUsuario cadastrarUsuario(@RequestBody @Valid UsuarioCreate usuarioCreate) {
        return usuarioService.cadastrarUsuario(usuarioCreate);
    }

    /*
    @GetMapping("/{id}/times")
    public List<Long> recuperarTimesDoUsuario(@PathVariable Long id) {
        return usuarioService.buscarTimesPorUsuarioId(id);
    }*/


    // ======== metodos relacionados aos times
    @PostMapping("/me/times/{timeId}")
    public List<Time> adicionarTime(
            Authentication authentication,
            @PathVariable Long timeId) {

        Long usuarioId = ((Number) authentication.getPrincipal()).longValue();

        return usuarioService.adicionarTime(usuarioId, timeId);
    }

    @GetMapping("/me/times")
    public List<Time> listarTimes(Authentication authentication) {
        Long usuarioId = ((Number) authentication.getPrincipal()).longValue();

        return usuarioService.listarTimes(usuarioId);
    }

    @DeleteMapping("/me/times/{timeId}")
    public void removerTime(
            Authentication authentication,
            @PathVariable Long timeId) {

        Long usuarioId = ((Number) authentication.getPrincipal()).longValue();

        usuarioService.removerTime(usuarioId, timeId);
    }

}
