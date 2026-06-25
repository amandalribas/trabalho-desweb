const HomePage = () => {
  return (
    <div className=" flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl text-verde-texto font-bold">Simulador Copa</h1>
      <p className="mt-2 text-sm text-gray-600">
        Acompanhe partidas fictícias em tempo real com notificações e eventos do
        jogo.
      </p>
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          
          {/*Explicação do projeto box1 */}
          <h1 className="mb-3 text-xl font-bold text-gray-800">
            <i className="bi bi-info-circle me-2 text-verde-texto"></i> Sobre o
            projeto
          </h1>
          <p className="text-justify text-sm leading-6 text-gray-700">
            Esta web-page consiste no trabalho prático da disciplina de
            desenvolvimento web, ministrada pelo professor Carlos Ribeiro, no
            período 2026.1 na UFF (Universidade Federal Fluminense). O objetivo
            do trabalho é desenvolver uma aplicação web que utilize WebSockets +
            Mensageria: Spring WebSocket + RabbitMQ / Apache Kafka.
            <br />
            Dessa forma, é feito um site para acompanhamento de partidas de
            futebol fictícias em tempo real. Em que o usuário pode escolher um
            time para acompanhar, e o site mostra as partidas em andamento, além
            de permitir que o usuário se cadastre e faça login para receber
            notificações sobre os jogos do seu time.
            <br />
            Além disso, é possível que o usuário com perfil de administrador
            crie jogos, atualize os resultados e crie competições.
          </p>
        </div>
        {/* Como usar o site box2 */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h1 className="mb-3 text-xl font-bold text-gray-800">
            <i className="bi bi-question-circle me-2 text-verde-texto"></i>
            Como usar?
          </h1>
          <p className="text-justify text-sm leading-6 text-gray-700">
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
