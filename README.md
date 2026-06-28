# trabalho-desweb
Trabalho prático para a discilpina Desenvolvimento Web, cursada na UFF no período 2026.1. O trabalho consiste no uso de WebSockets + Mensageria: Spring WebSocket + RabbitMQ / Apache Kafka para notificação de jogos fictícios de futebol.

# Usuários Padrões:
## ADMIN:

email: admin@mail.com
senha: desweb

## COMUM

email: user@mail.com
senha: desweb

Para Windows, é necessária a instalação do Docker.
Ao ter o docker instalado. Faça no cmd: 
docker run -d --hostname rmq --name rabbitmq-server -p 15672:15672 -p 5672:5672 rabbitmq:3-management
