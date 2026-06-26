package br.com.desweb.trabalhodesweb.service;

import br.com.desweb.trabalhodesweb.dto.TimeCreate;
import br.com.desweb.trabalhodesweb.model.Time;
import br.com.desweb.trabalhodesweb.repository.TimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TimeService {

    @Autowired
    private TimeRepository timeRepository;

    private final java.nio.file.Path pastaUpload = java.nio.file.Paths.get("src/main/resources/static/uploads");

    public Time criarTime(TimeCreate timeCreate) {
        Time time = new Time();
        time.setNome(timeCreate.getNome());
        time.setSigla(timeCreate.getSigla());

        if (timeCreate.getImagem() != null && !timeCreate.getImagem().isEmpty()) {
            try {
                if (!java.nio.file.Files.exists(pastaUpload)) {
                    java.nio.file.Files.createDirectories(pastaUpload);
                }

                String nomeOriginal = timeCreate.getImagem().getOriginalFilename();
                String extensao = nomeOriginal.substring(nomeOriginal.lastIndexOf("."));
                String novoNomeArquivo = java.util.UUID.randomUUID().toString() + extensao;

                java.nio.file.Path caminhoCompleto = pastaUpload.resolve(novoNomeArquivo);

                java.nio.file.Files.copy(timeCreate.getImagem().getInputStream(), caminhoCompleto, java.nio.file.StandardCopyOption.REPLACE_EXISTING);

                String urlDaImagem = "http://localhost:8080/uploads/" + novoNomeArquivo;
                time.setImagem(urlDaImagem);

            } catch (java.io.IOException e) {
                throw new org.springframework.web.server.ResponseStatusException(
                        org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao salvar a imagem", e
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

        time.setNome(timeCreate.getNome());
        time.setSigla(timeCreate.getSigla());

        if (timeCreate.getImagem() != null && !timeCreate.getImagem().isEmpty()) {
            try {
                if (!java.nio.file.Files.exists(pastaUpload)) {
                    java.nio.file.Files.createDirectories(pastaUpload);
                }

                String nomeOriginal = timeCreate.getImagem().getOriginalFilename();
                String extensao = nomeOriginal.substring(nomeOriginal.lastIndexOf("."));
                String novoNomeArquivo = java.util.UUID.randomUUID().toString() + extensao;

                java.nio.file.Path caminhoCompleto = pastaUpload.resolve(novoNomeArquivo);
                java.nio.file.Files.copy(timeCreate.getImagem().getInputStream(), caminhoCompleto, java.nio.file.StandardCopyOption.REPLACE_EXISTING);

                String urlDaImagem = "http://localhost:8080/uploads/" + novoNomeArquivo;
                time.setImagem(urlDaImagem);

            } catch (java.io.IOException e) {
                throw new org.springframework.web.server.ResponseStatusException(
                        org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao atualizar a imagem", e
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
