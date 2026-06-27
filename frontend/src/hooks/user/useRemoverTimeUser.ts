import { useMutation } from "@tanstack/react-query";
import useTokenStore from "../../store/TokenStore";
import { queryClient } from "../../main";


const useRemoverTimeUser = () => {
  const tokenResponse = useTokenStore((s) => s.tokenResponse);

  const removerTime = async (idTime: number): Promise<void> => {
    const response = await fetch(
      `http://localhost:8080/usuarios/me/times/${idTime}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${tokenResponse.token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Erro ao remover time.");
    }
  };

  return useMutation({
    mutationFn: (idTime: number) => removerTime(idTime),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["times-user"],
      });
    },
  });
};

export default useRemoverTimeUser;