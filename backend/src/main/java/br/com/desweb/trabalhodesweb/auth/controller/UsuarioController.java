package br.com.desweb.trabalhodesweb.auth.controller;

import br.com.desweb.trabalhodesweb.auth.dto.UsuarioCreate;
import br.com.desweb.trabalhodesweb.auth.model.Usuario;
import br.com.desweb.trabalhodesweb.auth.service.UsuarioService;
import br.com.desweb.trabalhodesweb.auth.util.InfoUsuario;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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
}
