const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold text-verde-texto">Simulador Copa</h1>

      <p className="mt-2 text-center text-sm text-gray-600">
        Acompanhe partidas fictícias em tempo real com notificações e eventos do
        jogo.
      </p>

      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sobre o projeto */}
        <div className="rounded-xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-emerald-100 px-3 py-2 text-emerald-700">
              <i className="bi bi-info-circle"></i>
            </span>
            <h1 className="text-xl font-bold text-gray-800">
              Sobre o projeto
            </h1>
          </div>

          <p className="text-justify text-sm leading-6 text-gray-700">
            Esta web-page consiste no trabalho prático da disciplina de
            Desenvolvimento Web, ministrada pelo professor Carlos Ribeiro, no
            período 2026.1 na UFF (Universidade Federal Fluminense). O objetivo
            do trabalho é desenvolver uma aplicação web que utilize{" "}
            <span className="font-semibold text-emerald-700">
              WebSockets + Mensageria
            </span>
            , com Spring WebSocket e RabbitMQ.
            <br />
            <br />
            O sistema simula o acompanhamento de partidas fictícias de futebol
            em tempo real, permitindo que usuários acompanhem jogos, recebam
            notificações e visualizem eventos importantes das partidas.
          </p>

          <a
            href="https://github.com/amandalribas/trabalho-desweb"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            <i className="bi bi-github"></i>
            Ver repositório
          </a>
        </div>

        {/* Como usar como usuário comum */}
        <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-2 text-blue-700">
              <i className="bi bi-person"></i>
            </span>
            <h1 className="text-xl font-bold text-gray-800">
              Usuário comum
            </h1>
          </div>

          <p className="text-justify text-sm leading-6 text-gray-700">
            Para utilizar o site como usuário comum, faça login com um dos
            perfis disponíveis no{" "}
            <span className="font-semibold text-blue-700">README.md</span> do
            projeto. Depois, acesse a página{" "}
            <span className="font-semibold text-blue-700">Meus Times</span> e
            selecione os times que deseja acompanhar.
            <br />
            <br />
            A partir disso, você poderá visualizar partidas em andamento,
            consultar eventos dos jogos e receber notificações em tempo real
            sempre que houver uma atualização relacionada aos seus times
            favoritos, como gols, cartões, substituições ou mudanças no status
            da partida.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
              <i className="bi bi-people me-1"></i>
              Meus Times
            </span>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
              <i className="bi bi-broadcast me-1"></i>
              Jogos ao vivo
            </span>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
              <i className="bi bi-bell me-1"></i>
              Notificações
            </span>
          </div>
        </div>

        {/* Como usar como administrador */}
        <div className="rounded-xl border border-amber-100 bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-amber-100 px-3 py-2 text-amber-700">
              <i className="bi bi-shield-lock"></i>
            </span>
            <h1 className="text-xl font-bold text-gray-800">
              Administrador
            </h1>
          </div>

          <p className="text-justify text-sm leading-6 text-gray-700">
            O usuário administrador possui acesso às funcionalidades de
            gerenciamento do sistema. Após fazer login com o perfil de admin, é
            possível cadastrar novos times, criar competições, criar jogos e
            atualizar partidas em andamento.
            <br />
            <br />
            Durante uma partida, o administrador pode registrar eventos como
            gols, cartões, substituições, intervalo e encerramento do jogo.
            Essas atualizações são enviadas automaticamente aos usuários
            interessados por meio de WebSockets e RabbitMQ, permitindo uma
            experiência dinâmica de acompanhamento em tempo real.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">
              <i className="bi bi-calendar-plus me-1"></i>
              Criar jogos
            </span>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">
              <i className="bi bi-trophy me-1"></i>
              Competições
            </span>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">
              <i className="bi bi-pencil-square me-1"></i>
              Atualizar eventos
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
