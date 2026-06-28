import { useMutation } from "@tanstack/react-query";
import useAPI from "../useAPI";
import type { Competicao } from "../../interfaces/Competicao";
import type { CompeticaoCreate } from "../../interfaces/CompeticaoCreate";
import { queryClient } from "../../main";
import { URL_COMPETICOES } from "../../util/constantes";

const useCriarCompeticao = () => {
  const { cadastrar } = useAPI<Competicao>(URL_COMPETICOES);

  return useMutation({
    mutationFn: (competicaoCreate: CompeticaoCreate) => cadastrar(competicaoCreate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["competicoes"] });
    },
  });
};
export default useCriarCompeticao;