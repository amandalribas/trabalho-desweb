import { useMutation } from "@tanstack/react-query";
import useAPI from "../useAPI";
import type { Jogo } from "../../interfaces/Jogo";
import type { JogoCreate } from "../../interfaces/JogoCreate";
import { queryClient } from "../../main";
import { URL_JOGOS } from "../../util/constantes";

const useCriarJogo = () => {
  const { cadastrar } = useAPI<Jogo>(URL_JOGOS);

  return useMutation({
    mutationFn: (jogoCreate: JogoCreate) => cadastrar(jogoCreate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jogos"] });
    },
  });
};
export default useCriarJogo;
