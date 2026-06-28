package br.com.desweb.trabalhodesweb.service;

import br.com.desweb.trabalhodesweb.dto.EventoDTO;
import br.com.desweb.trabalhodesweb.config.RabbitMQConfig;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificacaoService {

    // Ferramenta do Spring para injetar dados diretamento do canal do webSocket
    @Autowired
    private SimpMessagingTemplate messagingTemplate;


    @org.springframework.amqp.rabbit.annotation.RabbitListener(queues = "fila.eventos")
    public void notificarEvento(String mensagemJson) {
        try {
            // 1. Instancia o Jackson para ler o texto JSON
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();

            // 2. Converte a String de volta para o seu Objeto DTO
            br.com.desweb.trabalhodesweb.dto.EventoDTO eventoDTO = mapper.readValue(mensagemJson, br.com.desweb.trabalhodesweb.dto.EventoDTO.class);

            // 3. Envia a notificação para todos os clientes conectados no WebSocket
            System.out.println("Recebido e convertido com sucesso: " + eventoDTO.tipoEvento());
            messagingTemplate.convertAndSend("/CanalBack/notificacoes", eventoDTO);
            System.out.println("Notificação enviada para o WebSocket: " + eventoDTO.tipoEvento());

        } catch (com.fasterxml.jackson.core.JsonProcessingException e) {
            System.err.println("Erro ao converter o JSON recebido da fila: " + e.getMessage());
            e.printStackTrace();
        }
    }
}