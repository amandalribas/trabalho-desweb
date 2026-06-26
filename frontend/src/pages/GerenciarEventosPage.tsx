import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import useListarEventos from "../hooks/evento/useListarEventos";
import useAlterarEvento from "../hooks/evento/useAlterarEvento";
import useDeletarEvento from "../hooks/evento/useDeletarEvento";
import useListarTimes from "../hooks/time/useListarTimes";
import useListarJogos from "../hooks/jogo/useListarJogos";
import type { Evento } from "../interfaces/Evento";
import type { EventoCreate } from "../interfaces/EventoCreate";

const TIPOS_EVENTO = [
  "GOL",
  "GOL_CONTRA",
  "CARTAO_AMARELO",
  "CARTAO_VERMELHO",
  "IMPEDIMENTO",
  "INTERVALO",
  "ACRESCIMO",
  "PENALTI",
  "SUBSTITUICAO",
  "INICIO",
  "FIM",
];

const schema = z.object({
  tipoEvento: z.string().nonempty("Selecione o tipo do evento."),
  jogador: z.string().nullable(),
  jogoId: z.coerce.number().min(1, "Selecione o jogo."),
  timeId: z.coerce.number().min(1, "Selecione o time."),
});

type FormEvento = z.infer<typeof schema>;

const inputClass =
  "w-full rounded-md border-2 border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 outline-none hover:border-gray-500";

const errorClass = "text-red-600 text-xs mt-1";

const GerenciarEventosPage = () => {
  const { data: eventos, isLoading } = useListarEventos();
  const { data: times } = useListarTimes();
  const { data: jogos } = useListarJogos();
  const { mutate: alterarEvento } = useAlterarEvento();
  const { mutate: deletarEvento } = useDeletarEvento();

  const [eventoEditando, setEventoEditando] = useState<Evento | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormEvento>({
    resolver: zodResolver(schema) as Resolver<FormEvento>,
  });

  const iniciarEdicao = (evento: Evento) => {
    setEventoEditando(evento);
    reset({
      tipoEvento: evento.tipoEvento,
      jogador: evento.jogador ?? "",
      jogoId: evento.jogoId,
      timeId: evento.timeId,
    });
  };

  const cancelarEdicao = () => {
    setEventoEditando(null);
    reset();
  };

  const submit = (dados: FormEvento) => {
    if (!eventoEditando) return;
    const eventoCreate: EventoCreate = {
      tipoEvento: dados.tipoEvento,
      jogador: dados.jogador || null,
      jogoId: dados.jogoId,
      timeId: dados.timeId,
    };
    alterarEvento(
      { id: eventoEditando.id, dados: eventoCreate },
      {
        onSuccess: () => {
          setEventoEditando(null);
          reset();
        },
      }
    );
  };

  if (isLoading) return <p className="text-gray-500">Carregando eventos...</p>;

  return (
    <>
      <h1 className="mb-1 text-xl font-semibold">Gerenciar Eventos</h1>
      <hr className="mb-4" />

      {/* Formulário de edição inline */}
      {eventoEditando && (
        <div className="mb-6 rounded-md border-2 border-azul-background bg-white p-4">
          <h2 className="mb-3 font-semibold text-azul-background">
            Editando evento #{eventoEditando.id}
          </h2>
          <form onSubmit={handleSubmit(submit)}>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Jogo
                </label>
                <select {...register("jogoId")} className={inputClass}>
                  <option value={0}>Selecione o jogo</option>
                  {jogos?.map((jogo) => (
                    <option key={jogo.id} value={jogo.id}>
                      {jogo.timeA.nome} x {jogo.timeB.nome} — {jogo.descricao}
                    </option>
                  ))}
                </select>
                {errors.jogoId && (
                  <p className={errorClass}>{errors.jogoId.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Time
                </label>
                <select {...register("timeId")} className={inputClass}>
                  <option value={0}>Selecione o time</option>
                  {times?.map((time) => (
                    <option key={time.id} value={time.id}>
                      {time.nome}
                    </option>
                  ))}
                </select>
                {errors.timeId && (
                  <p className={errorClass}>{errors.timeId.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Tipo do Evento
                </label>
                <select {...register("tipoEvento")} className={inputClass}>
                  <option value="">Selecione o tipo</option>
                  {TIPOS_EVENTO.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo.replace("_", " ")}
                    </option>
                  ))}
                </select>
                {errors.tipoEvento && (
                  <p className={errorClass}>{errors.tipoEvento.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Jogador{" "}
                  <span className="text-gray-400">(opcional)</span>
                </label>
                <input
                  {...register("jogador")}
                  type="text"
                  placeholder="Ex: Vinicius Jr"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                type="submit"
                className="cursor-pointer rounded-md bg-azul-background px-6 py-2 font-semibold text-white duration-200 hover:opacity-90"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={cancelarEdicao}
                className="cursor-pointer rounded-md border-2 border-gray-400 px-6 py-2 font-semibold text-gray-700 duration-200 hover:border-gray-600"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabela de eventos */}
      {eventos && eventos.length === 0 && (
        <p className="text-gray-500">Nenhum evento cadastrado.</p>
      )}

      {eventos && eventos.length > 0 && (
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Tipo</th>
              <th className="p-2 text-left">Jogador</th>
              <th className="p-2 text-left">Jogo</th>
              <th className="p-2 text-left">Time</th>
              <th className="p-2 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((evento) => (
              <tr
                key={evento.id}
                className={'border-b ' + (eventoEditando?.id === evento.id ? "bg-blue-50" : "")}
              >
                <td className="p-2">{evento.id}</td>
                <td className="p-2">{evento.tipoEvento.replace("_", " ")}</td>
                <td className="p-2">{evento.jogador ?? "—"}</td>
                <td className="p-2">{evento.jogoDescricao}</td>
                <td className="p-2">{evento.timeNome}</td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => iniciarEdicao(evento)}
                    className="cursor-pointer rounded-md bg-azul-background px-3 py-1 text-white duration-200 hover:opacity-90"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deletarEvento(evento.id)}
                    className="cursor-pointer rounded-md bg-red-600 px-3 py-1 text-white duration-200 hover:bg-red-700"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
export default GerenciarEventosPage;