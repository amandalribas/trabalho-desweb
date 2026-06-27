import { useEffect } from "react";
import useNotificacaoStore, { type NotificacaoItem } from "../store/NotificacaoStore";

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

const DURACAO_MS = 5000;

const ToastCard = ({ item }: { item: NotificacaoItem }) => {
  const removerToast = useNotificacaoStore((s) => s.removerToast);
  const { evento } = item;

  useEffect(() => {
    const timer = setTimeout(() => removerToast(item.uid), DURACAO_MS);
    return () => clearTimeout(timer);
  }, [item.uid, removerToast]);

  const label = LABEL_EVENTO[evento.tipoEvento] ?? evento.tipoEvento;
  const placar = evento.timeANome
    ? `${evento.timeANome} ${evento.placarA} x ${evento.placarB} ${evento.timeBNome}`
    : evento.jogoDescricao;

  return (
    <div className="w-80 overflow-hidden rounded-lg shadow-2xl border border-white/10"
         style={{ backgroundColor: "#0B3996" }}>
      {/* cabeçalho amarelo */}
      <div className="flex items-center justify-between px-4 py-2"
           style={{ backgroundColor: "#EDC928" }}>
        <span className="font-bold text-sm text-gray-900">{label}</span>
        <button
          onClick={() => removerToast(item.uid)}
          className="text-gray-700 hover:text-gray-900 text-lg leading-none ml-2"
          aria-label="Fechar"
        >
          ×
        </button>
      </div>

      {/* corpo */}
      <div className="px-4 py-3 text-white">
        <p className="font-semibold text-sm">{placar}</p>
        {(evento.jogador || evento.minuto) && (
          <p className="text-xs text-white/70 mt-0.5">
            {[evento.jogador, evento.minuto != null ? `${evento.minuto}'` : null]
              .filter(Boolean)
              .join(" · ")}
          </p>
        )}
      </div>

      {/* barra de progresso */}
      <div className="h-1" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
        <div
          className="h-1"
          style={{
            backgroundColor: "#EDC928",
            animation: `shrink ${DURACAO_MS}ms linear forwards`,
          }}
        />
      </div>

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </div>
  );
};

const ToastContainer = () => {
  const toastsAtivos = useNotificacaoStore((s) => s.toastsAtivos);

  if (toastsAtivos.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
      {toastsAtivos.map((item) => (
        <ToastCard key={item.uid} item={item} />
      ))}
    </div>
  );
};

export default ToastContainer;
