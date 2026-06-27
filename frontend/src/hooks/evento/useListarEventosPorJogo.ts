import { useQuery } from "@tanstack/react-query";
import { URL_BASE, URL_EVENTOS } from "../../util/constantes";
import type { Evento } from "../../interfaces/Evento";

const useListarEventosPorJogo = (jogoId: number) => {
  return useQuery<Evento[]>({
    queryKey: ["eventos", jogoId],
    queryFn: async () => {
      const response = await fetch(`${URL_BASE}${URL_EVENTOS}/jogo/${jogoId}`);
      if (!response.ok) throw await response.json().catch(() => ({}));
      return response.json();
    },
    enabled: jogoId > 0,
    refetchInterval: 5000, // atualiza a cada 5s quando o jogo tá rolando
  });
};
export default useListarEventosPorJogo;