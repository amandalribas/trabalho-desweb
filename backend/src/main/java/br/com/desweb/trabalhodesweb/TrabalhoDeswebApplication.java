package br.com.desweb.trabalhodesweb;

import br.com.desweb.trabalhodesweb.auth.model.Usuario;
import br.com.desweb.trabalhodesweb.auth.repository.UsuarioRepository;
import br.com.desweb.trabalhodesweb.auth.util.Role;
import br.com.desweb.trabalhodesweb.model.*;
import br.com.desweb.trabalhodesweb.repository.CompeticaoRepository;
import br.com.desweb.trabalhodesweb.repository.EventoRepository;
import br.com.desweb.trabalhodesweb.repository.JogoRepository;
import br.com.desweb.trabalhodesweb.repository.TimeRepository;
import jakarta.transaction.Transactional;
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

    private Evento criarEvento(TipoEvento tipo, String jogador, Time time, Jogo jogo, Integer minuto) {
        Evento evento = new Evento();
        evento.setTipoEvento(tipo);
        evento.setJogador(jogador);
        evento.setTime(time);
        evento.setJogo(jogo);
        evento.setMinuto(minuto);
        return eventoRepository.save(evento);
    }



    public static void main(String[] args) {
        SpringApplication.run(TrabalhoDeswebApplication.class, args);
    }

    @Override
    @Transactional
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
            copa.setNome("Copa do Mundo FIFA 2026");
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
            Time alemanha  = timeRepository.findBySigla("GER").get();
            Time espanha   = timeRepository.findBySigla("ESP").get();
            Time uruguai   = timeRepository.findBySigla("URU").get();
            Time marrocos  = timeRepository.findBySigla("MAR").get();

            //=======================ADICIONANDO TIMES A COPA=====================

            if (copa.getTimes() == null){
                copa.setTimes(new ArrayList<>());
            }

            copa.getTimes().addAll(List.of(brasil, argentina, franca, portugal, alemanha, espanha, uruguai, marrocos));
            competicaoRepository.save(copa);

            // --- JOGO 1: ENCERRADO (Semifinal) ---
            Jogo jogo1 = new Jogo();
            jogo1.setCompeticao(copa);
            jogo1.setTimeA(brasil);
            jogo1.setTimeB(argentina);
            jogo1.setPlacarA(10);
            jogo1.setPlacarB(1);
            jogo1.setStatus(StatusJogo.ENCERRADO);
            jogo1.setIniciadoEm(java.time.Instant.now().minus(java.time.Duration.ofDays(2)));
            jogo1.setDescricao("Semifinal - Copa 2026");
            jogo1.setLocal("MetLife Stadium, Nova York");
            jogoRepository.save(jogo1);

            criarEvento(TipoEvento.INICIO,          null,          brasil,    jogo1, 0);
            criarEvento(TipoEvento.GOL,             "Vinicius Jr", brasil,    jogo1, 15);
            criarEvento(TipoEvento.GOL,             "Vinicius Jr", brasil,    jogo1, 16);
            criarEvento(TipoEvento.GOL,             "Vinicius Jr", brasil,    jogo1, 17);
            criarEvento(TipoEvento.GOL,             "Vinicius Jr", brasil,    jogo1, 18);
            criarEvento(TipoEvento.GOL,             "Vinicius Jr", brasil,    jogo1, 19);
            criarEvento(TipoEvento.INTERVALO,       null,          brasil,    jogo1, 45);
            criarEvento(TipoEvento.GOL,             "Messi",       argentina, jogo1, 55);
            criarEvento(TipoEvento.GOL,             "Vinicius Jr", brasil,    jogo1, 67);
            criarEvento(TipoEvento.GOL,             "Vinicius Jr", brasil,    jogo1, 69);
            criarEvento(TipoEvento.GOL,             "Endrick",     brasil,    jogo1, 78);
            criarEvento(TipoEvento.CARTAO_VERMELHO, "Messi",    argentina, jogo1, 85);
            criarEvento(TipoEvento.GOL,             "Vinicius Jr", brasil,    jogo1, 84);
            criarEvento(TipoEvento.GOL,             "Vinicius Jr", brasil,    jogo1, 89);
            criarEvento(TipoEvento.FIM,             null,          brasil,    jogo1, 90);

            // --- JOGO 2: ENCERRADO (Quartas de Final) ---
            Jogo jogo2 = new Jogo();
            jogo2.setCompeticao(copa);
            jogo2.setTimeA(franca);
            jogo2.setTimeB(alemanha);
            jogo2.setPlacarA(3);
            jogo2.setPlacarB(1);
            jogo2.setStatus(StatusJogo.ENCERRADO);
            jogo2.setIniciadoEm(java.time.Instant.now().minus(java.time.Duration.ofDays(4)));
            jogo2.setDescricao("Oitavas de Final - Copa 2026");
            jogo2.setLocal("Gillette Stadium, Boston");
            jogoRepository.save(jogo2);

            criarEvento(TipoEvento.INICIO,         null,              franca,   jogo2, 0);
            criarEvento(TipoEvento.GOL,            "Kylian Mbappé",   franca,   jogo2, 22);
            criarEvento(TipoEvento.CARTAO_AMARELO, "Bruno Fernandes", alemanha, jogo2, 41);
            criarEvento(TipoEvento.INTERVALO,      null,              franca,   jogo2, 45);
            criarEvento(TipoEvento.GOL,            "Kylian Mbappé",   franca,   jogo2, 50);
            criarEvento(TipoEvento.GOL,            "Kylian Mbappé",   franca,   jogo2, 67);
            criarEvento(TipoEvento.PENALTI,        "Musiala",         alemanha, jogo2, 88);
            criarEvento(TipoEvento.GOL,            "Musiala",         alemanha, jogo2, 89);
            criarEvento(TipoEvento.FIM,            null,              franca,   jogo2, 90);

            // --- JOGO 4: AGUARDANDO (Oitavas de Final) ---
            Jogo jogo4 = new Jogo();
            jogo4.setCompeticao(copa);
            jogo4.setTimeA(uruguai);
            jogo4.setTimeB(marrocos);
            jogo4.setPlacarA(0); // Placar inicial
            jogo4.setPlacarB(0);
            jogo4.setStatus(StatusJogo.AGUARDANDO);
            jogo4.setIniciadoEm(null); // Jogo ainda não começou
            jogo4.setDescricao("Oitavas de Final - Copa 2026");
            jogo4.setLocal("AT&T Stadium, Dallas");
            jogoRepository.save(jogo4);
            // Jogos aguardando não possuem eventos registrados ainda.

            // --- JOGO 5: AGUARDANDO (A Grande Final) ---
            Jogo jogo5 = new Jogo();
            jogo5.setCompeticao(copa);
            jogo5.setTimeA(brasil);
            jogo5.setTimeB(franca);
            jogo5.setPlacarA(0);
            jogo5.setPlacarB(0);
            jogo5.setStatus(StatusJogo.AGUARDANDO);
            jogo5.setIniciadoEm(null);
            jogo5.setDescricao("FINAL - Copa 2026");
            jogo5.setLocal("Azteca, Cidade do México");
            jogoRepository.save(jogo5);

        }
    }
}
