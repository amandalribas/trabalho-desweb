package br.com.desweb.trabalhodesweb.dto;
import org.springframework.web.multipart.MultipartFile;

public record TimeCreate( String nome,
                          String sigla,
                          MultipartFile imagem) {
}
