import { useQuery } from "@tanstack/react-query";
import useAPI from "../useAPI";
import type { Jogo } from "../../interfaces/Jogo";
import { URL_JOGOS } from "../../util/constantes";

const useListarJogos = () => {
  const { recuperar } = useAPI<Jogo>(URL_JOGOS);

  return useQuery({
    queryKey: ["jogos"],
    queryFn: recuperar,
  });
};
export default useListarJogos;
