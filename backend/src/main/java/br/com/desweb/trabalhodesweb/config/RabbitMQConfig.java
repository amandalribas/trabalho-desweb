package br.com.desweb.trabalhodesweb.config;


import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class RabbitMQConfig {
    //RabbitMQ tem três componentes: EXCHANGE, FILA e BINDINGS

    public static final String EXCHANGE_EVENTOS = "exchange.eventos";
    public static final String FILA_EVENTOS = "fila.eventos";

    //Anotação para avisar ao spring para executar um método e guardar o objeto que ele devolver na memória
    @Bean
    //Criação da fila
    //Fznd do jeito mais simples só para começar
    //uma única fila, logo o exchange vai jogar tudo nessa fila no back
    //A filtragem vai ser pelo front (ao invés de ter uma fila para cada time no back)
    public Queue eventos(){
        return new Queue(FILA_EVENTOS, true, false, false);
    }

    //Exchange do tipo Fanout (ela envia cópias para todas as filas ligadas nela)
    @Bean
    public FanoutExchange exchange(){
        return new FanoutExchange(EXCHANGE_EVENTOS);
    }

    @Bean
    public Binding binding(Queue eventos, FanoutExchange exchange){
        return BindingBuilder.bind(eventos).to(exchange);
    }
}
