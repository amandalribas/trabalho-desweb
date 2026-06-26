package br.com.desweb.trabalhodesweb.repository;

import br.com.desweb.trabalhodesweb.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventoRepository extends JpaRepository<Evento, Long> {
    List<Evento> findByJogoId(Long jogoId);
}