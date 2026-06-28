import { useEffect, useState } from "react";
import useListarJogos from "../hooks/jogo/useListarJogos";
import useListarEventosPorJogo from "../hooks/evento/useListarEventosPorJogo";
import type { Jogo } from "../interfaces/Jogo";

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

const COR_STATUS: Record<string, string> = {
  AGUARDANDO: "bg-gray-100 text-gray-600",
  EM_ANDAMENTO: "bg-green-100 text-green-800",
  INTERVALO: "bg-yellow-100 text-yellow-800",
  ENCERRADO: "bg-gray-200 text-gray-500",
};

const LABEL_STATUS: Record<string, string> = {
  AGUARDANDO: "Em breve",
  EM_ANDAMENTO: "Ao vivo",
  INTERVALO: "Intervalo",
  ENCERRADO: "Encerrado",
};

const useTimer = (iniciadoEm: string | null, status: string) => {
  const [seg, setSeg] = useState(0);
  useEffect(() => {
    if (!iniciadoEm || status !== "EM_ANDAMENTO") {
      setSeg(0);
      return;
    }
    const calc = () =>
      setSeg(Math.floor((Date.now() - new Date(iniciadoEm).getTime()) / 1000));
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [iniciadoEm, status]);

  const m = Math.floor(seg / 60)
    .toString()
    .padStart(2, "0");
  const s = (seg % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const CardJogo = ({ jogo }: { jogo: Jogo }) => {
  const { data: eventos } = useListarEventosPorJogo(jogo.id);
  const timer = useTimer(jogo.iniciadoEm, jogo.status);
  const [expandido, setExpandido] = useState(jogo.status === "EM_ANDAMENTO");

  return (
    <div className="mb-4 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Placar */}
      <div
        className="cursor-pointer px-6 py-4"
        onClick={() => setExpandido(!expandido)}
      >
        <div className="mb-2 flex items-center justify-between">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${COR_STATUS[jogo.status]}`}
          >
            {LABEL_STATUS[jogo.status]}
            {jogo.status === "EM_ANDAMENTO" && (
              <span className="ml-2 font-mono">{timer}</span>
            )}
          </span>
          <span className="text-xs text-gray-400">{jogo.local}</span>
        </div>

        <div className="flex items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <img
              src={jogo.timeAImagem}
              className="h-16 w-16 object-contain"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <span className="font-semibold">{jogo.timeANome}</span>
          </div>

          <div className="text-center">
            <div className="text-4xl font-bold text-azul-background">
              {jogo.placarA} — {jogo.placarB}
            </div>
            <div className="mt-1 text-xs text-gray-400">{jogo.descricao}</div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <img
              src={jogo.timeBImagem}
              className="h-16 w-16 object-contain"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <span className="font-semibold">{jogo.timeBNome}</span>
          </div>
        </div>
      </div>

      {/* Eventos */}
      {expandido && (
        <div className="border-t border-gray-100 bg-gray-50 px-6 py-3">
          {!eventos || eventos.length === 0 ? (
            <p className="text-center text-sm text-gray-400">
              Nenhum evento registrado.
            </p>
          ) : (
            <ul className="space-y-1">
              {[...eventos].reverse().map((ev) => (
                <li key={ev.id} className="flex items-center gap-2 text-sm">
                  <span className="w-8 text-right font-mono text-xs text-gray-400">
                    {ev.minuto && ev.minuto > 0 ? `${ev.minuto}'` : "—"}
                  </span>
                  <span>{LABEL_EVENTO[ev.tipoEvento] ?? ev.tipoEvento}</span>
                  {ev.jogador && (
                    <span className="text-gray-600">— {ev.jogador}</span>
                  )}
                  <span className="ml-auto text-xs text-gray-400">
                    {ev.timeNome}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

const EmAndamentoPage = () => {
  const { data: jogos, isLoading } = useListarJogos();

  if (isLoading) return <p className="text-gray-500">Carregando...</p>;

  const vivos = jogos?.filter((j) => j.status === "EM_ANDAMENTO") ?? [];
  const outros = jogos?.filter((j) => j.status !== "EM_ANDAMENTO") ?? [];
  const ordenados = [...vivos, ...outros];

  return (
    <>
      <h1 className="text-3xl font-bold text-verde-texto">Jogos em andamento</h1>
      <br/>
      <hr className="mb-4" />

      {ordenados.length === 0 && (
        <p className="text-gray-500">Nenhum jogo cadastrado.</p>
      )}

      {ordenados.map((jogo) => (
        <CardJogo key={jogo.id} jogo={jogo} />
      ))}
    </>
  );
};
export default EmAndamentoPage;
