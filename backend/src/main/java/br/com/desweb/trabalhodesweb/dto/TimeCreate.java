package br.com.desweb.trabalhodesweb.dto;
import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class TimeCreate {
    private String nome;
    private String sigla;
    private MultipartFile imagem;

}
