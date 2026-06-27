import useListarEventos from "../hooks/evento/useListarEventos";
import useListarJogos from "../hooks/jogo/useListarJogos";

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

const EventosPage = () => {
  const { data: eventos, isLoading, isError } = useListarEventos();
  const { data: jogos } = useListarJogos();

  if (isLoading) return <p className="text-gray-500">Carregando eventos...</p>;

  if (isError)
    return <p className="text-red-600">Não foi possível carregar os eventos.</p>;

  const eventosOrdenados = eventos
    ? [...eventos].sort((a, b) => b.id - a.id)
    : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="mb-1 text-2xl font-semibold text-gray-800">Eventos</h1>
      <p className="mb-6 text-sm text-gray-500">
        Eventos mais recentes primeiro.
      </p>

      {eventosOrdenados.length === 0 && (
        <p className="text-gray-500">Nenhum evento encontrado.</p>
      )}

      <div className="space-y-3">
        {eventosOrdenados.map((evento) => {
          // Jogo vindo do JogoDTO (campos flat)
          const jogoDoEvento = jogos?.find((j) => j.id === evento.jogoId);

          const confronto = jogoDoEvento
            ? `${jogoDoEvento.timeANome} x ${jogoDoEvento.timeBNome}`
            : evento.jogoDescricao;

          return (
            <div
              key={evento.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Minuto */}
                  <span className="w-10 text-right font-mono text-sm font-bold text-azul-background">
                    {evento.minuto && evento.minuto > 0 ? `${evento.minuto}'` : "—"}
                  </span>

                  <div>
                    <p className="font-semibold text-azul-background">
                      {LABEL_EVENTO[evento.tipoEvento] ?? evento.tipoEvento}
                    </p>
                    <p className="text-sm text-gray-600">{confronto}</p>

                    {/* Imagens dos times — só se tiver o jogo */}
                    {jogoDoEvento && (
                      <div className="mt-1 flex items-center gap-2">
                        <img
                          src={jogoDoEvento.timeAImagem}
                          alt={jogoDoEvento.timeANome}
                          className="h-7 w-7 rounded-full border border-gray-200 object-cover"
                          onError={(e) =>
                            (e.currentTarget.style.display = "none")
                          }
                        />
                        <span className="text-xs text-gray-400">x</span>
                        <img
                          src={jogoDoEvento.timeBImagem}
                          alt={jogoDoEvento.timeBNome}
                          className="h-7 w-7 rounded-full border border-gray-200 object-cover"
                          onError={(e) =>
                            (e.currentTarget.style.display = "none")
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right text-sm text-gray-600">
                  <p className="font-medium">{evento.timeNome}</p>
                  {evento.jogador && <p className="text-gray-500">{evento.jogador}</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventosPage;