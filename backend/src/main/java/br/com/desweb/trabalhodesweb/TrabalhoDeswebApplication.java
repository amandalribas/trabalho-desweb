package br.com.desweb.trabalhodesweb;

import br.com.desweb.trabalhodesweb.auth.model.Usuario;
import br.com.desweb.trabalhodesweb.auth.repository.UsuarioRepository;
import br.com.desweb.trabalhodesweb.auth.util.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;


@SpringBootApplication
public class TrabalhoDeswebApplication implements CommandLineRunner {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(TrabalhoDeswebApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        if (usuarioRepository.findByEmail("admin@mail.com").isEmpty()) {
            Usuario admin = new Usuario(
                    "Admin",
                    "admin@mail.com",
                    passwordEncoder.encode("desweb"),
                    Role.ADMIN);
            usuarioRepository.save(admin);
        }

        if (usuarioRepository.findByEmail("user@mail.com").isEmpty()) {
            Usuario user = new Usuario(
                    "User",
                    "user@mail.com",
                    passwordEncoder.encode("desweb"),
                    Role.USER);
            usuarioRepository.save(user);
        }
    }
}
