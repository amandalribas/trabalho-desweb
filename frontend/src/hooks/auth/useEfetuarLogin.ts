import { useMutation } from "@tanstack/react-query";
import useAPIAutenticacao from "./useAPIAutenticacao";
import type { UsuarioLogin } from "../../interfaces/UsuarioLogin";

const useEfetuarLogin = () => {
  const { login } = useAPIAutenticacao();
  
  return useMutation({
    mutationFn: (usuarioLogin: UsuarioLogin) => login(usuarioLogin),
  });
};
export default useEfetuarLogin;