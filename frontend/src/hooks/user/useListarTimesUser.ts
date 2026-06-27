import { useQuery } from "@tanstack/react-query";
import useTokenStore from "../../store/TokenStore";
import type { Time } from "../../interfaces/Time";

const useListarTimesUser = () => {
  const tokenResponse = useTokenStore((s) => s.tokenResponse);

  const listarTimesUser = async (): Promise<Time[]> => {
    const response = await fetch("http://localhost:8080/usuarios/me/times", {
      headers: {
        Authorization: `Bearer ${tokenResponse.token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao listar times do usuário.");
    }

    return await response.json();
  };

  return useQuery({
    queryKey: ["times-user"],
    queryFn: listarTimesUser,
    enabled: tokenResponse.idUsuario > 0,
  });
};

export default useListarTimesUser;