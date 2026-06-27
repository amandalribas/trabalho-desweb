import { useMutation } from "@tanstack/react-query";
import useAPI from "../useAPI";
import type { Evento } from "../../interfaces/Evento";
import type { EventoCreate } from "../../interfaces/EventoCreate";
import { queryClient } from "../../main";
import { URL_EVENTOS } from "../../util/constantes";

const useCriarEvento = () => {
  const { cadastrar } = useAPI<Evento>(URL_EVENTOS);

  return useMutation({
    mutationFn: (eventoCreate: EventoCreate) => cadastrar(eventoCreate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventos"] });
    },
  });
};
export default useCriarEvento;