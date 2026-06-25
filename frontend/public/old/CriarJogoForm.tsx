import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useNavigate } from "react-router-dom";
import useListarTimes from "../../src/hooks/time/useListarTimes";
import useListarCompeticoes from "../../src/hooks/competicao/useListarCompeticoes";
import useCriarJogo from "../../src/hooks/jogo/useCriarJogo";
import type { JogoCreate } from "../../src/interfaces/JogoCreate";

const schema = z.object({
  timeAId: z.coerce.number().min(1, "Selecione o Time A."),
  timeBId: z.coerce.number().min(1, "Selecione o Time B."),
  competicaoId: z.coerce.number().min(1, "Selecione a competição."),
  descricao: z.string().nonempty("Informe a descrição."),
  local: z.string().nonempty("Informe o local."),
});

type FormJogo = z.infer<typeof schema>;

const inputClass =
  "w-full rounded-md border-2 border-gray-300 bg-white px-4 py-2 text-gray-900 outline-none hover:border-gray-500";

const errorClass = "text-red-600 text-sm mt-1";

const CriarJogoForm = () => {
  const navigate = useNavigate();
  const { data: times } = useListarTimes();
  const { data: competicoes } = useListarCompeticoes();
  const { mutate: criarJogo } = useCriarJogo();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormJogo>({ resolver: zodResolver(schema) });

  const submit = (dados: FormJogo) => {
    const jogoCreate: JogoCreate = {
      timeAId: dados.timeAId,
      timeBId: dados.timeBId,
      competicaoId: dados.competicaoId,
      descricao: dados.descricao,
      local: dados.local,
    };
    criarJogo(jogoCreate, {
      onSuccess: () => navigate("/atualizar-jogo"),
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4 max-w-md">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Time A
        </label>
        <select {...register("timeAId")} className={inputClass}>
          <option value={0}>Selecione o Time A</option>
          {times?.map((time) => (
            <option key={time.id} value={time.id}>
              {time.nome}
            </option>
          ))}
        </select>
        {errors.timeAId && (
          <p className={errorClass}>{errors.timeAId.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Time B
        </label>
        <select {...register("timeBId")} className={inputClass}>
          <option value={0}>Selecione o Time B</option>
          {times?.map((time) => (
            <option key={time.id} value={time.id}>
              {time.nome}
            </option>
          ))}
        </select>
        {errors.timeBId && (
          <p className={errorClass}>{errors.timeBId.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Competição
        </label>
        <select {...register("competicaoId")} className={inputClass}>
          <option value={0}>Selecione a competição</option>
          {competicoes?.map((c) => (
            <option key={c.id} value={c.id}>
              Competição {c.id}
            </option>
          ))}
        </select>
        {errors.competicaoId && (
          <p className={errorClass}>{errors.competicaoId.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Descrição
        </label>
        <input
          {...register("descricao")}
          type="text"
          placeholder="Ex: Fase de grupos"
          className={inputClass}
        />
        {errors.descricao && (
          <p className={errorClass}>{errors.descricao.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Local
        </label>
        <input
          {...register("local")}
          type="text"
          placeholder="Ex: Maracanã"
          className={inputClass}
        />
        {errors.local && <p className={errorClass}>{errors.local.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full cursor-pointer rounded-md bg-green-600 py-2 font-semibold text-white duration-200 hover:bg-green-700"
      >
        Cadastrar Jogo
      </button>
    </form>
  );
};
export default CriarJogoForm;
