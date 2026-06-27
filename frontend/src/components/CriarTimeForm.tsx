import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useNavigate } from "react-router-dom";
import useCriarTime from "../hooks/time/useCriarTime";
import type { TimeCreate } from "../interfaces/TimeCreate";

const schema = z.object({
  nome: z.string().nonempty("Informe o nome."),
  sigla: z.string().nonempty("Informe a sigla."),
  imagem: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, "A logo do time é obrigatória.")
    .refine((files) => files?.[0]?.size <= 5 * 1024 * 1024, "A imagem deve ter no máximo 5MB.")
    .refine(
      (files) => ["image/jpeg", "image/png", "image/webp"].includes(files?.[0]?.type),
      "Formato inválido. Escolha uma imagem JPEG, PNG ou WebP."
    ),
});

type FormTime = z.infer<typeof schema>;

const inputClass =
  "w-full rounded-md border-2 border-gray-300 bg-white px-4 py-2 text-gray-900 outline-none hover:border-gray-500";

const errorClass = "text-red-600 text-sm mt-1";

const CriarTimeForm = () => {
  const navigate = useNavigate();
  const { mutate: criarTime } = useCriarTime();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTime>({ resolver: zodResolver(schema) });



const submit = (dados: FormTime) => {

    const formData = new FormData();

    formData.append("nome", dados.nome);
    formData.append("sigla", dados.sigla);
    
    if (dados.imagem && dados.imagem.length > 0) {
      formData.append("imagem", dados.imagem[0]);
    }

    criarTime(formData as any, {
      onSuccess: () => navigate("/home"),
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="mt-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="form-card space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Nome (Time ou seleção)
            </label>
            <input
              {...register("nome")}
              type="text"
              placeholder="Ex: Brasil"
              className={inputClass}
            />
            {errors.nome && (
              <p className={errorClass}>{errors.nome.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Sigla
            </label>
            <input
              {...register("sigla")}
              type="text"
              placeholder="Ex: BRA"
              className={inputClass}
            />
            {errors.sigla && (
              <p className={errorClass}>{errors.sigla.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Logo do Time (Imagem)
            </label>
            <input
              {...register("imagem")}
              type="file"
              accept="image/*"
              className={inputClass}
            />
            {errors.imagem && (
              <p className={errorClass}>{errors.imagem.message}</p>
            )}
          </div>

        </div>
        
      </div>
      <div className="mt-10 flex justify-center">
        <button
          type="submit"
          className="w-96 cursor-pointer rounded-md bg-green-600 py-2 font-semibold text-white duration-200 hover:bg-green-700"
        >
          Cadastrar Time
        </button>
      </div>
    </form>
  );
};
export default CriarTimeForm;
