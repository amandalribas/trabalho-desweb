import { useQuery } from "@tanstack/react-query";
import useAPI from "../useAPI";
import type { Competicao } from "../../interfaces/Competicao";
import { URL_COMPETICOES } from "../../util/constantes";

const useListarCompeticoes = () => {
  const { recuperar } = useAPI<Competicao>(URL_COMPETICOES);

  return useQuery({
    queryKey: ["competicoes"],
    queryFn: recuperar,
  });
};
export default useListarCompeticoes;
