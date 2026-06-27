import { useState } from "react";
import { Link } from "react-router-dom";
import useListarCompeticoes from "../hooks/competicao/useListarCompeticoes";
import useDeletarCompeticao from "../hooks/competicao/useDeletarCompeticao";
import type { Competicao } from "../interfaces/Competicao";


const PainelCompeticao = ({
  competicao,
  onDeletar,
}: {
  competicao: Competicao;
  onDeletar: (id: number) => void;
}) => {
  const [aberto, setAberto] = useState(false);

  const formatarData = (dataStr: string) => {
    if (!dataStr) return "—";
    return new Date(dataStr).toLocaleDateString("pt-BR", { timeZone: "UTC" });
  };

  return (
    <div className="mb-4 rounded-lg border border-gray-200 bg-white shadow-sm">
      <div
        className="flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
        onClick={() => setAberto(!aberto)}
      >
        <div className="flex items-center gap-6">
          <span className="font-semibold text-lg text-gray-800">
            🏆 {competicao.nome}
          </span>
          <span className="text-sm text-gray-500">
            📅 {formatarData(competicao.dataInicio)} até {formatarData(competicao.dataFim)}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs bg-azul-background/10 text-azul-background px-2.5 py-0.5 rounded-full font-medium">
            {competicao.times?.length ?? 0} Times • {competicao.jogos?.length ?? 0} Jogos
          </span>
          <span className="text-gray-400">{aberto ? "▲" : "▼"}</span>
        </div>
      </div>

      {aberto && (
        <div className="border-t border-gray-100 px-4 py-4 bg-gray-50/50">
          <div className="mb-4 flex justify-end gap-2">
            <button
              onClick={() => {
                if (confirm(`Deseja realmente deletar a competição "${competicao.nome}"?`)) {
                  onDeletar(competicao.id);
                }
              }}
              className="cursor-pointer rounded-md border border-red-300 px-4 py-1.5 text-sm font-medium text-red-600 bg-white hover:bg-red-50 transition-colors"
            >
              🗑️ Deletar Competição
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-md border border-gray-100 bg-white p-4 shadow-xs">
              <h3 className="mb-3 font-semibold text-gray-700 flex items-center gap-2">
                🛡️ Times Participantes ({competicao.times?.length ?? 0})
              </h3>
              {!competicao.times || competicao.times.length === 0 ? (
                <p className="text-sm text-gray-400 italic">Nenhum time vinculado a esta competição.</p>
              ) : (
                <ul className="max-h-60 space-y-2 overflow-y-auto pr-1">
                  {competicao.times.map((time) => (
                    <li
                      key={time.id}
                      className="flex items-center gap-3 rounded bg-gray-50 px-3 py-2 text-sm border border-gray-100"
                    >
                      <span className="font-medium text-gray-800">{time.nome}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-md border border-gray-100 bg-white p-4 shadow-xs">
              <h3 className="mb-3 font-semibold text-gray-700 flex items-center gap-2">
                ⚽ Tabela de Jogos ({competicao.jogos?.length ?? 0})
              </h3>
              {!competicao.jogos || competicao.jogos.length === 0 ? (
                <p className="text-sm text-gray-400 italic">Nenhum jogo gerado para esta competição.</p>
              ) : (
                <ul className="max-h-60 space-y-2 overflow-y-auto pr-1">
                  {competicao.jogos.map((jogo) => (
                    <li
                      key={jogo.id}
                      className="flex items-center justify-between rounded bg-gray-50 px-3 py-2 text-sm border border-gray-100"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800 w-24 truncate text-right">
                          {jogo.timeANome}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-azul-background/10 font-mono text-xs text-azul-background font-bold">
                          VS
                        </span>
                        <span className="font-medium text-gray-800 w-24 truncate text-left">
                          {jogo.timeBNome}
                        </span>
                      </div>
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

const VisualizarCompeticoesPage = () => {
  const { data: competicoes, isLoading } = useListarCompeticoes();
  const { mutate: deletarCompeticao } = useDeletarCompeticao();

  if (isLoading) return <p className="text-gray-500 p-6 animate-pulse">Carregando competições...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Visualizar Competições</h1>
          <p className="text-sm text-gray-500 mt-0.5">Gerencie os campeonatos, times participantes e tabelas de confrontos.</p>
        </div>
        <Link
          to="/criar-competicao"
          className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 transition-colors shadow-sm"
        >
          + Nova Competição
        </Link>
      </div>

      <hr className="mb-6 border-gray-200" />

      {competicoes && competicoes.length === 0 && (
        <div className="text-center py-12 rounded-lg border-2 border-dashed border-gray-200 bg-white">
          <p className="text-gray-400">Nenhuma competição cadastrada até o momento.</p>
        </div>
      )}

      <div className="space-y-1">
        {competicoes?.map((competicao) => (
          <PainelCompeticao
            key={competicao.id}
            competicao={competicao}
            onDeletar={deletarCompeticao}
          />
        ))}
      </div>
    </div>
  );
};

export default VisualizarCompeticoesPage;