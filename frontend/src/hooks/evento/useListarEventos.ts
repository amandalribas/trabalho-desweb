import { useQuery } from "@tanstack/react-query";
import useAPI from "../useAPI";
import type { Evento } from "../../interfaces/Evento";
import { URL_EVENTOS } from "../../util/constantes";

const useListarEventos = () => {
  const { recuperar } = useAPI<Evento>(URL_EVENTOS);

  return useQuery({
    queryKey: ["eventos"],
    queryFn: recuperar,
  });
};
export default useListarEventos;