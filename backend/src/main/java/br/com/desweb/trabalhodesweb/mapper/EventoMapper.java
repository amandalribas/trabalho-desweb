package br.com.desweb.trabalhodesweb.mapper;

import br.com.desweb.trabalhodesweb.dto.EventoDTO;
import br.com.desweb.trabalhodesweb.model.Evento;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EventoMapper {

    @Mapping(source = "jogo.id", target = "jogoId")
    @Mapping(source = "jogo.descricao", target = "jogoDescricao")
    @Mapping(source = "time.id", target = "timeId")
    @Mapping(source = "time.nome", target = "timeNome")
    EventoDTO toEventoDTO(Evento evento);

    List<EventoDTO> toEventosDTO(List<Evento> eventos);

    @Mapping(target = "jogo", ignore = true)
    @Mapping(target = "time", ignore = true)
    Evento toEvento(EventoDTO eventoDTO);
}