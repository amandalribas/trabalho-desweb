package br.com.desweb.trabalhodesweb.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        //Sentido back -> front
        config.enableSimpleBroker("/CanalBack");


        // Sentido front -> back
        // é padrão ter os dois sentidos em aplicações de WebSockets, mas como no nosso projeto
        // o foco é o back enviar as notificações pro front (sentido único), provavelmente não vamos
        //usar esse canal aqui
        config.setApplicationDestinationPrefixes("/CanalFront");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        //Cria o canal físico
        //Informalmente, falando, ws-server é o túnel (conecta o navegador do usuário ao servidor do Spring
        //Essa conexão acontece uma vez, com o Handshake e deixa o túnel criado
        //Esse túnel tem dois canal (físico) que a nível lógico tem dois sentidos (CanalBack e CanalFront)
        registry.addEndpoint("/ws-server")
                .setAllowedOriginPatterns("*") //Permite que qqlr porta conversa com o servidor
                .withSockJS();
    }
}
