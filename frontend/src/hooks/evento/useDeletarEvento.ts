import { useMutation } from "@tanstack/react-query";
import useAPI from "../useAPI";
import type { Evento } from "../../interfaces/Evento";
import { queryClient } from "../../main";
import { URL_EVENTOS } from "../../util/constantes";

const useDeletarEvento = () => {
  const { removerPorId } = useAPI<Evento>(URL_EVENTOS);

  return useMutation({
    mutationFn: (id: number) => removerPorId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventos"] });
    },
  });
};
export default useDeletarEvento;