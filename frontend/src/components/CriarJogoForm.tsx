import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useNavigate } from "react-router-dom";
import useListarTimes from "../hooks/time/useListarTimes";
import useListarCompeticoes from "../hooks/competicao/useListarCompeticoes";
import useCriarJogo from "../hooks/jogo/useCriarJogo";
import type { JogoCreate } from "../interfaces/JogoCreate";

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
    watch,
    formState: { errors },
  } = useForm<FormJogo>({
    resolver: zodResolver(schema) as Resolver<FormJogo>,
  });

  const timeAIdSelecionado = watch("timeAId");
  const timeBIdSelecionado = watch("timeBId");

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

  const timeASelecionado = times?.find(
    (time) => time.id === Number(timeAIdSelecionado)
  );
  const timeBSelecionado = times?.find(
    (time) => time.id === Number(timeBIdSelecionado)
  );

  return (
    <form onSubmit={handleSubmit(submit)} className="mt-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Time A */}
        <div className="form-card">
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
          <div className="mt-4 flex h-48 w-full items-center justify-center overflow-hidden bg-cinza-background">
            {timeASelecionado && (
              <img
                src={timeASelecionado.imagem}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Dados do jogo */}
        <div className="py-4">
          <div className="mb-3">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Competição
            </label>
            <select {...register("competicaoId")} className={inputClass}>
              <option value={0}>Selecione a competição</option>
              {competicoes?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
            {errors.competicaoId && (
              <p className={errorClass}>{errors.competicaoId.message}</p>
            )}
          </div>
          <div className="mb-3">
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
            {errors.local && (
              <p className={errorClass}>{errors.local.message}</p>
            )}
          </div>
        </div>

        {/* Time B */}
        <div className="form-card">
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
          <div className="mt-4 flex h-48 w-full items-center justify-center overflow-hidden bg-cinza-background">
            {timeBSelecionado && (
              <img
                src={timeBSelecionado.imagem}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          type="submit"
          className="w-96 cursor-pointer rounded-md bg-green-600 py-2 font-semibold text-white duration-200 hover:bg-green-700"
        >
          Cadastrar Jogo
        </button>
      </div>
    </form>
  );
};
export default CriarJogoForm;