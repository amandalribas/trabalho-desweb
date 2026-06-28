import { useState, useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import useListarJogos from "../hooks/jogo/useListarJogos";
import useDeletarJogo from "../hooks/jogo/useDeletarJogo";
import useListarTimes from "../hooks/time/useListarTimes";
import useListarEventosPorJogo from "../hooks/evento/useListarEventosPorJogo";
import {
  useIniciarJogo,
  useIniciarIntervalo,
  useEncerrarJogo,
  useAdicionarEventoNoJogo,
} from "../hooks/jogo/useControlarJogo";
import type { Jogo } from "../interfaces/Jogo";
import type { EventoCreate } from "../interfaces/EventoCreate";

const TIPOS_MANUAIS = [
  "GOL",
  "GOL_CONTRA",
  "CARTAO_AMARELO",
  "CARTAO_VERMELHO",
  "IMPEDIMENTO",
  "ACRESCIMO",
  "PENALTI",
  "SUBSTITUICAO",
] as const;

const LABEL_EVENTO: Record<string, string> = {
  GOL: "⚽ Gol",
  GOL_CONTRA: "⚽ Gol Contra",
  CARTAO_AMARELO: "🟨 Cartão Amarelo",
  CARTAO_VERMELHO: "🟥 Cartão Vermelho",
  IMPEDIMENTO: "🚩 Impedimento",
  ACRESCIMO: "⏱ Acréscimo",
  PENALTI: "🎯 Pênalti",
  SUBSTITUICAO: "🔄 Substituição",
  INICIO: "▶️ Início",
  INTERVALO: "⏸ Intervalo",
  FIM: "🏁 Fim",
};

const LABEL_STATUS: Record<string, string> = {
  AGUARDANDO: "Aguardando",
  EM_ANDAMENTO: "Em andamento",
  INTERVALO: "Intervalo",
  ENCERRADO: "Encerrado",
};

const COR_STATUS: Record<string, string> = {
  AGUARDANDO: "bg-gray-100 text-gray-700",
  EM_ANDAMENTO: "bg-green-100 text-green-800",
  INTERVALO: "bg-yellow-100 text-yellow-800",
  ENCERRADO: "bg-red-100 text-red-700",
};

// ─── Schema corrigido ────────────────────────────────────────────────────────
const schemaEvento = z.object({
  tipoEvento: z.string().min(1, "Selecione o tipo."),
  timeId: z.coerce.number().min(1, "Selecione o time."),
  jogador: z.string().optional(),
});

type FormEvento = z.infer<typeof schemaEvento>;

// ─── Timer ───────────────────────────────────────────────────────────────────
const useTimer = (iniciadoEm: string | null, status: string) => {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    if (!iniciadoEm || status === "AGUARDANDO" || status === "ENCERRADO") {
      setSegundos(0);
      return;
    }
    const calcular = () =>
      setSegundos(
        Math.floor((Date.now() - new Date(iniciadoEm).getTime()) / 1000)
      );
    calcular();
    const id = setInterval(calcular, 1000);
    return () => clearInterval(id);
  }, [iniciadoEm, status]);

  const min = Math.floor(segundos / 60).toString().padStart(2, "0");
  const sec = (segundos % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
};

// ─── Painel de um jogo ───────────────────────────────────────────────────────
const PainelJogo = ({
  jogo,
  onDeletar,
}: {
  jogo: Jogo;
  onDeletar: (id: number) => void;
}) => {
  const { data: times } = useListarTimes();
  const { data: eventos } = useListarEventosPorJogo(jogo.id);
  const { mutate: iniciar } = useIniciarJogo();
  const { mutate: intervalo } = useIniciarIntervalo();
  const { mutate: encerrar } = useEncerrarJogo();
  const { mutate: addEvento } = useAdicionarEventoNoJogo();
  const timer = useTimer(jogo.iniciadoEm, jogo.status);

  const [aberto, setAberto] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormEvento>({
    resolver: zodResolver(schemaEvento) as Resolver<FormEvento>,
    defaultValues: { tipoEvento: "", timeId: 0, jogador: "" },
  });

  const timesDoJogo = times?.filter(
    (t) => t.id === jogo.timeAId || t.id === jogo.timeBId
  );

  const submitEvento = (dados: FormEvento) => {
    const eventoCreate: EventoCreate = {
      tipoEvento: dados.tipoEvento,
      timeId: dados.timeId,
      jogador: dados.jogador || null,
      jogoId: jogo.id,
    };
    addEvento(
      { jogoId: jogo.id, dados: eventoCreate },
      { onSuccess: () => reset() }
    );
  };

  const emAndamento = jogo.status === "EM_ANDAMENTO";

  return (
    <div className="mb-4 rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* Cabeçalho clicável */}
      <div
        className="flex cursor-pointer items-center justify-between px-4 py-3"
        onClick={() => setAberto(!aberto)}
      >
        <div className="flex items-center gap-4">
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${COR_STATUS[jogo.status]}`}
          >
            {LABEL_STATUS[jogo.status]}
          </span>
          <span className="font-semibold">
            {jogo.timeANome}{" "}
            <span className="text-azul-background">
              {jogo.placarA} – {jogo.placarB}
            </span>{" "}
            {jogo.timeBNome}
          </span>
          <span className="text-sm text-gray-500">{jogo.descricao}</span>
        </div>
        <div className="flex items-center gap-3">
          {jogo.status !== "AGUARDANDO" && jogo.status !== "ENCERRADO" && (
            <span className="font-mono text-lg font-bold text-azul-background">
              {timer}
            </span>
          )}
          <span className="text-gray-400">{aberto ? "▲" : "▼"}</span>
        </div>
      </div>

      {aberto && (
        <div className="border-t border-gray-100 px-4 py-4">
          {/* Botões de controle */}
          <div className="mb-4 flex flex-wrap gap-2">
            {jogo.status === "AGUARDANDO" && (
              <button
                onClick={() => iniciar(jogo.id)}
                className="cursor-pointer rounded-md bg-green-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-green-700"
              >
                ▶️ Iniciar jogo
              </button>
            )}
            {jogo.status === "EM_ANDAMENTO" && (
              <button
                onClick={() => intervalo(jogo.id)}
                className="cursor-pointer rounded-md bg-yellow-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-yellow-600"
              >
                ⏸ Intervalo
              </button>
            )}
            {jogo.status === "INTERVALO" && (
              <button
                onClick={() => iniciar(jogo.id)}
                className="cursor-pointer rounded-md bg-green-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-green-700"
              >
                ▶️ Retomar jogo
              </button>
            )}
            {(jogo.status === "EM_ANDAMENTO" || jogo.status === "INTERVALO") && (
              <button
                onClick={() => encerrar(jogo.id)}
                className="cursor-pointer rounded-md bg-red-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                🏁 Encerrar jogo
              </button>
            )}
            <button
              onClick={() => {
                if (confirm("Deletar este jogo?")) onDeletar(jogo.id);
              }}
              className="ml-auto cursor-pointer rounded-md border border-red-300 px-4 py-1.5 text-sm text-red-600 hover:bg-red-50"
            >
              Deletar
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Formulário de evento — só aparece quando em andamento */}
            {emAndamento && (
              <div>
                <h3 className="mb-2 font-semibold text-gray-700">
                  Adicionar evento
                </h3>
                <form onSubmit={handleSubmit(submitEvento)} className="space-y-2">
                  {/* Tipo do evento */}
                  <div>
                    <select
                      {...register("tipoEvento")}
                      className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm"
                    >
                      <option value="">Tipo do evento</option>
                      {TIPOS_MANUAIS.map((t) => (
                        <option key={t} value={t}>
                          {LABEL_EVENTO[t]}
                        </option>
                      ))}
                    </select>
                    {errors.tipoEvento && (
                      <p className="text-xs text-red-600">
                        {errors.tipoEvento.message}
                      </p>
                    )}
                  </div>

                  {/* Time — usa onChange manual para setValue com number */}
                  <div>
                    <select
                      onChange={(e) =>
                        setValue("timeId", Number(e.target.value), {
                          shouldValidate: true,
                        })
                      }
                      defaultValue="0"
                      className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm"
                    >
                      <option value="0">Time</option>
                      {timesDoJogo?.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.nome}
                        </option>
                      ))}
                    </select>
                    {errors.timeId && (
                      <p className="text-xs text-red-600">
                        {errors.timeId.message}
                      </p>
                    )}
                  </div>

                  {/* Jogador */}
                  <input
                    {...register("jogador")}
                    type="text"
                    placeholder="Jogador (opcional)"
                    className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm"
                  />

                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-md bg-azul-background py-1.5 text-sm font-semibold text-white hover:opacity-90"
                  >
                    + Registrar evento
                  </button>
                </form>
              </div>
            )}

            {/* Lista de eventos */}
            <div>
              <h3 className="mb-2 font-semibold text-gray-700">
                Eventos ({eventos?.length ?? 0})
              </h3>
              {!eventos || eventos.length === 0 ? (
                <p className="text-sm text-gray-400">Nenhum evento ainda.</p>
              ) : (
                <ul className="max-h-64 space-y-1 overflow-y-auto">
                  {[...eventos].reverse().map((ev) => (
                    <li
                      key={ev.id}
                      className="flex items-center gap-2 rounded bg-gray-50 px-3 py-1.5 text-sm"
                    >
                      <span className="w-10 text-right font-mono text-xs text-gray-400">
                        {ev.minuto != null ? `${ev.minuto}'` : "—"}
                      </span>
                      <span className="font-medium">
                        {LABEL_EVENTO[ev.tipoEvento] ?? ev.tipoEvento}
                      </span>
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
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Página principal ─────────────────────────────────────────────────────────
const AtualizarJogoPage = () => {
  const { data: jogos, isLoading } = useListarJogos();
  const { mutate: deletarJogo } = useDeletarJogo();

  if (isLoading) return <p className="text-gray-500">Carregando jogos...</p>;

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-verde-texto">
          Atualizar jogos
        </h1>
          <hr />
        </div>
        <Link
          to="/criar-jogo"
          className="rounded-md bg-azul-background px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          + Novo jogo
        </Link>
      </div>

      {jogos && jogos.length === 0 && (
        <p className="text-gray-500">Nenhum jogo cadastrado.</p>
      )}

      {jogos?.map((jogo) => (
        <PainelJogo key={jogo.id} jogo={jogo} onDeletar={deletarJogo} />
      ))}
    </>
  );
};
export default AtualizarJogoPage;