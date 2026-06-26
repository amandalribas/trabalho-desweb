import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useNavigate } from "react-router-dom";
import useListarTimes from "../hooks/time/useListarTimes";
import useListarJogos from "../hooks/jogo/useListarJogos";
import useCriarEvento from "../hooks/evento/useCriarEvento";
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
  "w-full rounded-md border-2 border-gray-300 bg-white px-4 py-2 text-gray-900 outline-none hover:border-gray-500";

const errorClass = "text-red-600 text-sm mt-1";

const CriarEventoForm = () => {
  const navigate = useNavigate();
  const { data: times } = useListarTimes();
  const { data: jogos } = useListarJogos();
  const { mutate: criarEvento } = useCriarEvento();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormEvento>({
    resolver: zodResolver(schema) as Resolver<FormEvento>,
  });

  const submit = (dados: FormEvento) => {
    const eventoCreate: EventoCreate = {
      tipoEvento: dados.tipoEvento,
      jogador: dados.jogador || null,
      jogoId: dados.jogoId,
      timeId: dados.timeId,
    };
    criarEvento(eventoCreate, {
      onSuccess: () => navigate("/gerenciar-eventos"),
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="mt-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
            Jogador <span className="text-gray-400">(opcional)</span>
          </label>
          <input
            {...register("jogador")}
            type="text"
            placeholder="Ex: Vinicius Jr"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          type="submit"
          className="w-96 cursor-pointer rounded-md bg-green-600 py-2 font-semibold text-white duration-200 hover:bg-green-700"
        >
          Cadastrar Evento
        </button>
      </div>
    </form>
  );
};
export default CriarEventoForm;