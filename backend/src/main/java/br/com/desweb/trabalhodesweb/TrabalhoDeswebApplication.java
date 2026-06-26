package br.com.desweb.trabalhodesweb;

import br.com.desweb.trabalhodesweb.auth.model.Usuario;
import br.com.desweb.trabalhodesweb.auth.repository.UsuarioRepository;
import br.com.desweb.trabalhodesweb.auth.util.Role;
import br.com.desweb.trabalhodesweb.model.*;
import br.com.desweb.trabalhodesweb.repository.CompeticaoRepository;
import br.com.desweb.trabalhodesweb.repository.EventoRepository;
import br.com.desweb.trabalhodesweb.repository.JogoRepository;
import br.com.desweb.trabalhodesweb.repository.TimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@SpringBootApplication
public class TrabalhoDeswebApplication implements CommandLineRunner {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TimeRepository timeRepository;

    @Autowired
    private CompeticaoRepository competicaoRepository;

    @Autowired
    private JogoRepository jogoRepository;

    @Autowired
    private EventoRepository eventoRepository;

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

    private Evento criarEvento(TipoEvento tipo, String jogador, Time time, Jogo jogo) {
        Evento evento = new Evento();
        evento.setTipoEvento(tipo);
        evento.setJogador(jogador);
        evento.setTime(time);
        evento.setJogo(jogo);
        return eventoRepository.save(evento);
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
                    Role.ADMIN,
                    new java.util.ArrayList<>(java.util.List.of(1L, 4L)));
            usuarioRepository.save(admin);
        }
        if (usuarioRepository.findByEmail("user@mail.com").isEmpty()) {
            Usuario user = new Usuario(
                    "eu",
                    "user@mail.com",
                    passwordEncoder.encode("desweb"),
                    Role.USER,
                    new java.util.ArrayList<>(java.util.List.of(2L, 3L)));
            usuarioRepository.save(user);
        }
        //=======================CRIANDO COMPETIÇÕES======================
        if (competicaoRepository.count() == 0) {
            Competicao copa = new Competicao();
            copa.setDataInicio(new Date());
            copa.setDataFim(new Date());
            competicaoRepository.save(copa);
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


        //=======================CRIANDO JOGOS E EVENTOS======================
        if (jogoRepository.count() == 0) {
            Competicao copa = competicaoRepository.findAll().get(0);

            Time brasil    = timeRepository.findBySigla("BRA").get();
            Time argentina = timeRepository.findBySigla("ARG").get();
            Time franca    = timeRepository.findBySigla("FRA").get();
            Time portugal  = timeRepository.findBySigla("POR").get();

            // Jogo 1: Brasil x Argentina
            Jogo jogo1 = new Jogo();
            jogo1.setCompeticao(copa);
            jogo1.setTimeA(brasil);
            jogo1.setTimeB(argentina);
            jogo1.setPlacarA(2);
            jogo1.setPlacarB(1);
            jogo1.setDescricao("Semifinal da copa 2026");
            jogo1.setLocal("Maracanã, Rio de Janeiro");
            jogoRepository.save(jogo1);

            criarEvento(TipoEvento.INICIO,          null,          brasil,    jogo1);
            criarEvento(TipoEvento.GOL,             "Vinicius Jr", brasil,    jogo1);
            criarEvento(TipoEvento.CARTAO_AMARELO,  "De Paul",     argentina, jogo1);
            criarEvento(TipoEvento.INTERVALO,       null,          brasil,    jogo1);
            criarEvento(TipoEvento.GOL,             "Messi",       argentina, jogo1);
            criarEvento(TipoEvento.GOL,             "Rodrygo",     brasil,    jogo1);
            criarEvento(TipoEvento.CARTAO_VERMELHO, "Otamendi",    argentina, jogo1);
            criarEvento(TipoEvento.FIM,             null,          brasil,    jogo1);

            // Jogo 2: França x Portugal
            Jogo jogo2 = new Jogo();
            jogo2.setCompeticao(copa);
            jogo2.setTimeA(franca);
            jogo2.setTimeB(portugal);
            jogo2.setPlacarA(1);
            jogo2.setPlacarB(1);
            jogo2.setDescricao("Jogo");
            jogo2.setLocal("Stade de France, Paris");
            jogoRepository.save(jogo2);

            criarEvento(TipoEvento.INICIO,         null,       franca,   jogo2);
            criarEvento(TipoEvento.GOL,            "Kylian Dictador",   franca,   jogo2);
            criarEvento(TipoEvento.CARTAO_AMARELO, "Bruno Fernandes",  portugal, jogo2);
            criarEvento(TipoEvento.INTERVALO,      null,       franca,   jogo2);
            criarEvento(TipoEvento.PENALTI,        "Ronaldo",  portugal, jogo2);
            criarEvento(TipoEvento.GOL,            "Ronaldo",  portugal, jogo2);
            criarEvento(TipoEvento.ACRESCIMO,      null,       franca,   jogo2);
            criarEvento(TipoEvento.FIM,            null,       franca,   jogo2);


        }
    }
}
