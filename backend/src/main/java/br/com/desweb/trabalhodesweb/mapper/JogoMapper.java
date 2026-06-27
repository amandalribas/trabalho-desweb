package br.com.desweb.trabalhodesweb.mapper;

import br.com.desweb.trabalhodesweb.dto.JogoDTO;
import br.com.desweb.trabalhodesweb.model.Jogo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface JogoMapper {

    @Mapping(source = "timeA.id",     target = "timeAId")
    @Mapping(source = "timeA.nome",   target = "timeANome")
    @Mapping(source = "timeA.imagem", target = "timeAImagem")
    @Mapping(source = "timeB.id",     target = "timeBId")
    @Mapping(source = "timeB.nome",   target = "timeBNome")
    @Mapping(source = "timeB.imagem", target = "timeBImagem")
    @Mapping(source = "competicao.id", target = "competicaoId")
    JogoDTO toJogoDTO(Jogo jogo);

    List<JogoDTO> toJogosDTO(List<Jogo> jogos);
}