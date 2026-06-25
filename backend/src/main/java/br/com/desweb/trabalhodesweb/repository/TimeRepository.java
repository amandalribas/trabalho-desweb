package br.com.desweb.trabalhodesweb.repository;

import br.com.desweb.trabalhodesweb.model.Time;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TimeRepository extends JpaRepository<Time, Long> {
    Optional<Time> findBySigla(String sigla);
}
