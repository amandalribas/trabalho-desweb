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

    // A anotação abaixo avisa para monitorar a fila
    @RabbitListener(queues = RabbitMQConfig.FILA_EVENTOS)
    public void notificarEvento(EventoDTO eventoDto) {

        System.out.println("Atualização no jogo: " + eventoDto.tipoEvento());

        //Pega esse JSON e envia para notificacoes
        messagingTemplate.convertAndSend("/CanalBack/notificacoes", eventoDto);

    }
}