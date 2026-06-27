import { useMutation } from "@tanstack/react-query";
import useTokenStore from "../../store/TokenStore";
import type { Time } from "../../interfaces/Time";
import { queryClient } from "../../main";


const useAdicionarTimeUser = () => {
  const tokenResponse = useTokenStore((s) => s.tokenResponse);

  const adicionarTime = async (idTime: number): Promise<Time[]> => {
    const response = await fetch(
      `http://localhost:8080/usuarios/me/times/${idTime}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenResponse.token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Erro ao adicionar time.");
    }

    return await response.json();
  };

  return useMutation({
    mutationFn: (idTime: number) => adicionarTime(idTime),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["times-user"],
      });
    },
  });
};

export default useAdicionarTimeUser;