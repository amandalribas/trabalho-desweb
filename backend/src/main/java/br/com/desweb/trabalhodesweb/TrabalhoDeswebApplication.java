package br.com.desweb.trabalhodesweb;

import br.com.desweb.trabalhodesweb.auth.model.Usuario;
import br.com.desweb.trabalhodesweb.auth.repository.UsuarioRepository;
import br.com.desweb.trabalhodesweb.auth.util.Role;
import br.com.desweb.trabalhodesweb.model.Time;
import br.com.desweb.trabalhodesweb.repository.TimeRepository;
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

    @Autowired
    private TimeRepository timeRepository;

    private void criarTime(String nome, String sigla, String imagem) {
        if (timeRepository.findBySigla(sigla).isPresent()) {
            return;
        }

        Time time = new Time();
        time.setNome(nome);
        time.setSigla(sigla);
        time.setImagem(imagem);

        timeRepository.save(time);
    }

    public static void main(String[] args) {
        SpringApplication.run(TrabalhoDeswebApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        //=======================CRIANDO USUÁRIOS======================
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
        //=======================CRIANDO TIMES======================
        criarTime("BRASIL", "BRA", "/times/brasil.png");
        criarTime("ARGENTINA", "ARG", "/times/argentina.png");
        criarTime("URUGUAI", "URU", "/times/uruguai.png");
        criarTime("INGLATERRA", "ENG", "/times/inglaterra.png");
        criarTime("FRANÇA", "FRA", "/times/franca.png");
        criarTime("ALEMANHA", "GER", "/times/alemanha.png");
        criarTime("PORTUGAL", "POR", "/times/portugal.png");
        criarTime("MARROCOS", "MAR", "/times/marrocos.png");
        criarTime("ESPANHA", "ESP", "/times/espanha.png");


    }
}
