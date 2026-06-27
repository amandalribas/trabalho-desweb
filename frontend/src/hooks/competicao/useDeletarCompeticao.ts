import { useMutation } from "@tanstack/react-query";
import useAPI from "../useAPI";
import type { Competicao } from "../../interfaces/Competicao";
import { queryClient } from "../../main";
import { URL_COMPETICOES } from "../../util/constantes";

const useDeletarCompeticao = () => {
  const { removerPorId } = useAPI<Competicao>(URL_COMPETICOES);

  return useMutation({
    mutationFn: (id: number) => removerPorId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["competicoes"] });
    },
  });
};
export default useDeletarCompeticao;