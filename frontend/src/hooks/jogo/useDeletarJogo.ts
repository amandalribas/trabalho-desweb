import { useMutation } from "@tanstack/react-query";
import useAPI from "../useAPI";
import type { Jogo } from "../../interfaces/Jogo";
import { queryClient } from "../../main";
import { URL_JOGOS } from "../../util/constantes";

const useDeletarJogo = () => {
  const { removerPorId } = useAPI<Jogo>(URL_JOGOS);

  return useMutation({
    mutationFn: (id: number) => removerPorId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jogos"] });
    },
  });
};
export default useDeletarJogo;
