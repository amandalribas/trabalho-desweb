package br.com.desweb.trabalhodesweb.service;

import br.com.desweb.trabalhodesweb.dto.TimeCreate;
import br.com.desweb.trabalhodesweb.model.Time;
import br.com.desweb.trabalhodesweb.repository.TimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
public class TimeService {

    @Autowired
    private TimeRepository timeRepository;

    private final java.nio.file.Path pastaUpload = java.nio.file.Paths.get("src/main/resources/static/uploads");

    public Time criarTime(TimeCreate timeCreate) {
        Time time = new Time();
        time.setNome(timeCreate.nome());
        time.setSigla(timeCreate.sigla());

        if (timeCreate.imagem() != null && !timeCreate.imagem().isEmpty()) {
            try {
                if (!Files.exists(pastaUpload)) {
                    Files.createDirectories(pastaUpload);
                }

                String nomeOriginal = timeCreate.imagem().getOriginalFilename();
                String extensao = nomeOriginal.substring(nomeOriginal.lastIndexOf("."));
                String novoNomeArquivo = UUID.randomUUID().toString() + extensao;

                Path caminhoCompleto = pastaUpload.resolve(novoNomeArquivo);

                Files.copy(timeCreate.imagem().getInputStream(), caminhoCompleto, StandardCopyOption.REPLACE_EXISTING);

                String urlDaImagem = "http://localhost:8080/uploads/" + novoNomeArquivo;
                time.setImagem(urlDaImagem);

            } catch (IOException e) {
                throw new ResponseStatusException(
                        HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao salvar a imagem", e
                );
            }
        }

        return timeRepository.save(time);
    }

    public Time buscarTimePorId(Long id) {
        return timeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Time não encontrado"));
    }

    public Time atualizarTime(Long id, TimeCreate timeCreate) {
        Time time = buscarTimePorId(id);

        time.setNome(timeCreate.nome());
        time.setSigla(timeCreate.sigla());

        if (timeCreate.imagem() != null && !timeCreate.imagem().isEmpty()) {
            try {
                if (!Files.exists(pastaUpload)) {
                    Files.createDirectories(pastaUpload);
                }

                String nomeOriginal = timeCreate.imagem().getOriginalFilename();
                String extensao = nomeOriginal.substring(nomeOriginal.lastIndexOf("."));
                String novoNomeArquivo = UUID.randomUUID().toString() + extensao;

                Path caminhoCompleto = pastaUpload.resolve(novoNomeArquivo);
                Files.copy(timeCreate.imagem().getInputStream(), caminhoCompleto, StandardCopyOption.REPLACE_EXISTING);

                String urlDaImagem = "http://localhost:8080/uploads/" + novoNomeArquivo;
                time.setImagem(urlDaImagem);

            } catch (IOException e) {
                throw new ResponseStatusException(
                        HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao atualizar a imagem", e
                );
            }
        }

        return timeRepository.save(time);
    }

    public void deletarTime(Long id) {
        buscarTimePorId(id);
        timeRepository.deleteById(id);
    }

    public List<Time> listarTimes() {
        return timeRepository.findAll();
    }
}
