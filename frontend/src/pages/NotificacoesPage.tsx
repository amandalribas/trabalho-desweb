import useNotificacaoStore from "../store/NotificacaoStore";

const LABEL_EVENTO: Record<string, string> = {
  GOL: "⚽ Gol",
  GOL_CONTRA: "⚽ Gol Contra",
  CARTAO_AMARELO: "🟨 Cartão Amarelo",
  CARTAO_VERMELHO: "🟥 Cartão Vermelho",
  IMPEDIMENTO: "🚩 Impedimento",
  INTERVALO: "⏸ Intervalo",
  ACRESCIMO: "⏱ Acréscimo",
  PENALTI: "🎯 Pênalti",
  SUBSTITUICAO: "🔄 Substituição",
  INICIO: "▶️ Início",
  FIM: "🏁 Fim",
};

export const NotificacoesPage = () => {
  const { notificacoes } = useNotificacaoStore();

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-verde-texto">
          Notificações
        </h1>
          <p className="text-sm text-gray-500 mt-1">
            Eventos recebidos nesta sessão — mais recentes primeiro.
          </p>
        </div>
        {notificacoes.length > 0 && (
          <span className="rounded-full bg-azul-background px-3 py-1 text-sm font-bold text-white">
            {notificacoes.length}
          </span>
        )}
      </div>

      {notificacoes.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-10 text-center text-gray-400">
          <p className="text-4xl mb-3"><i className="bi bi-bell-slash"></i></p>
          <p className="font-medium">Nenhuma notificação recebida ainda.</p>
          <p className="text-sm mt-1">
            As notificações aparecem aqui quando eventos ocorrem nos jogos.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notificacoes.map((item) => {
            const { evento } = item;
            const label = LABEL_EVENTO[evento.tipoEvento] ?? evento.tipoEvento;
            const placar = evento.timeANome
              ? `${evento.timeANome} ${evento.placarA} x ${evento.placarB} ${evento.timeBNome}`
              : evento.jogoDescricao;
            const horario = item.recebidaEm.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            });

            return (
              <div
                key={item.uid}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                {/* faixa colorida de título */}
                <div
                  className="flex items-center justify-between px-4 py-2"
                  style={{ backgroundColor: "#EDC928" }}
                >
                  <span className="font-bold text-sm text-gray-900">{label}</span>
                  <span className="text-xs text-gray-700">{horario}</span>
                </div>

                {/* corpo */}
                <div className="px-4 py-3">
                  <p className="font-semibold text-azul-background">{placar}</p>
                  {(evento.jogador || evento.minuto != null) && (
                    <p className="text-sm text-gray-500 mt-0.5">
                      {[
                        evento.jogador,
                        evento.minuto != null ? `${evento.minuto}'` : null,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
