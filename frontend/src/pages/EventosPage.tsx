import { useMemo } from "react";
import useListarEventos from "../hooks/evento/useListarEventos";
import useListarJogos from "../hooks/jogo/useListarJogos";
import type { Evento } from "../interfaces/Evento";

const getTimeValue = (evento: Evento) => {
  const candidato = evento as Evento & {
    dataHora?: string | null;
    horario?: string | null;
    createdAt?: string | null;
    timestamp?: string | number | null;
    momento?: string | null;
    data?: string | null;
  };

  const campos = [
    candidato.dataHora,
    candidato.horario,
    candidato.createdAt,
    candidato.timestamp,
    candidato.momento,
    candidato.data,
  ];

  for (const valor of campos) {
    if (!valor) continue;

    const numero = typeof valor === "number" ? valor : Date.parse(String(valor));
    if (!Number.isNaN(numero)) {
      return numero;
    }
  }

  return Number(evento.id);
};

const EventosPage = () => {
  const { data: eventos, isLoading, isError } = useListarEventos();
  const { data: jogos } = useListarJogos();

  console.log("Primeiro Jogo carregado:", jogos?.[0]);
  console.log("Primeiro Evento carregado:", eventos?.[0]);

  const eventosOrdenados = useMemo(() => {
    if (!eventos) return [];
    return [...eventos].sort((a, b) => getTimeValue(b) - getTimeValue(a));
  }, [eventos]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Eventos</h1>
        <p className="mt-2 text-sm text-gray-600">
          Veja os eventos mais recentes primeiro.
        </p>
      </div>

      {isLoading && <p className="text-gray-500">Carregando eventos...</p>}

      {isError && (
        <p className="text-red-600">Não foi possível carregar os eventos.</p>
      )}

      {!isLoading && !isError && eventosOrdenados.length === 0 && (
        <p className="text-gray-500">Nenhum evento encontrado.</p>
      )}

      {!isLoading && !isError && eventosOrdenados.length > 0 && (
        <div className="space-y-3">
          {eventosOrdenados.map((evento) => {
            const jogoDoEvento = jogos?.find((jogo) => String(jogo.id) === String(evento.jogoId));
            const confronto = jogoDoEvento
              ? `${jogoDoEvento.timeA.nome} x ${jogoDoEvento.timeB.nome}`
              : evento.jogoDescricao;

            return (
              <div
                key={evento.id}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-sm font-semibold text-azul-background">
                        {evento.tipoEvento.replace("_", " ")}
                      </p>
                      <p className="text-sm text-gray-700">{confronto}</p>
                      {jogoDoEvento && (
                        <div className="mt-2 flex items-center gap-2">
                          <img
                            src={jogoDoEvento.timeA.imagem}
                            alt={jogoDoEvento.timeA.nome}
                            className="h-8 w-8 rounded-full border border-gray-200 object-cover"
                          />
                          <span className="text-xs font-medium text-gray-500">x</span>
                          <img
                            src={jogoDoEvento.timeB.imagem}
                            alt={jogoDoEvento.timeB.nome}
                            className="h-8 w-8 rounded-full border border-gray-200 object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p className="font-medium">{evento.timeNome}</p>
                    {evento.jogador ? <p>{evento.jogador}</p> : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EventosPage;
