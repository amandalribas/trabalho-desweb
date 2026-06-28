import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import useCriarCompeticao from "../hooks/competicao/useCriarCompeticao";
import type { CompeticaoCreate } from "../interfaces/CompeticaoCreate";

const schema = z.object({
    nome: z.string().nonempty("Informe o nome"),
    dataInicio: z.string().min(1, "A data de início é obrigatória"),
    dataFim: z.string().min(1, "A data de fim é obrigatória"),
}).refine((dados) => dados.dataFim > dados.dataInicio, {
    message: "A data de término precisa ser após a data de início",
    path: ["dataFim"]
});

export type CriarCompeticaoFormData = z.infer<typeof schema>

const inputClass =
  "w-full rounded-md border-2 border-gray-300 bg-white px-4 py-2 text-gray-900 outline-none hover:border-gray-500 focus:border-green-600 transition-colors";

const errorClass = "text-red-600 text-sm mt-1 font-medium";

const CriarCompeticaoForm = () => {
    const navigate = useNavigate();
    const { mutate: criarCompeticao } = useCriarCompeticao();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CriarCompeticaoFormData>({
        resolver: zodResolver(schema) as Resolver<CriarCompeticaoFormData>,
    });

    const submit = (dados: CriarCompeticaoFormData) => {
        const payload: CompeticaoCreate = {
            nome: dados.nome,
            dataInicio: dados.dataInicio,
            dataFim: dados.dataFim,
        };

        criarCompeticao(payload, {
            onSuccess: () => navigate("/atualizar-competicao"),
        });
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="mt-6 max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
            <div className="space-y-4">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Nome
                    </label>
                    <input
                        {...register("nome")}
                        type="text"
                        placeholder="Ex: Copa do Mundo FIFA 2026"
                        className={inputClass}
                    />
                    {errors.nome && <p className={errorClass}>{errors.nome.message}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Data Início
                    </label>
                    <input
                        {...register("dataInicio")}
                        type="date"
                        className={inputClass}
                    />
                    {errors.dataInicio && <p className={errorClass}>{errors.dataInicio.message}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Data Fim
                    </label>
                    <input
                        {...register("dataFim")}
                        type="date"
                        className={inputClass}
                    />
                    {errors.dataFim && <p className={errorClass}>{errors.dataFim.message}</p>}
                </div>
            </div>

            <div className="mt-10 flex justify-center">
                <button
                    type="submit"
                    className="w-96 cursor-pointer rounded-md bg-green-600 py-2 font-semibold text-white duration-200 hover:bg-green-700"
                >
                    Cadastrar Competição
                </button>
            </div>
        </form>
    );
};

export default CriarCompeticaoForm;