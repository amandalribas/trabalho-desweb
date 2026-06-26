import { useMutation } from "@tanstack/react-query";
import useAPI from "../useAPI";
import type { Evento } from "../../interfaces/Evento";
import type { EventoCreate } from "../../interfaces/EventoCreate";
import { queryClient } from "../../main";
import { URL_EVENTOS } from "../../util/constantes";

const useAlterarEvento = () => {
  const { alterar } = useAPI<Evento>(URL_EVENTOS);

  return useMutation({
    mutationFn: ({ id, dados }: { id: number; dados: EventoCreate }) =>
      alterar(id, dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventos"] });
    },
  });
};
export default useAlterarEvento;