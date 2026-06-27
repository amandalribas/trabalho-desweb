package br.com.desweb.trabalhodesweb.mapper;

import br.com.desweb.trabalhodesweb.dto.CompeticaoDTO;
import br.com.desweb.trabalhodesweb.dto.TimeCreate;
import br.com.desweb.trabalhodesweb.model.Competicao;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = { JogoMapper.class, TimeCreate.class })
public interface CompeticaoMapper {

    CompeticaoDTO toCompeticaoDTO(Competicao competicao);

    List<CompeticaoDTO> toCompeticoesDTO(List<Competicao> competicoes);
}