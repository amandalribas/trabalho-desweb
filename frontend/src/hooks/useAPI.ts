import { URL_BASE } from "../util/constantes";

const useAPI = <T>(endpoint: string) => {
  const URL = `${URL_BASE}${endpoint}`;

  const handleResponseError = async (response: Response) => {
    if (!response.ok) {
      const error: any = await response.json().catch(() => ({}));
      if (error) throw error;
      else
        throw new Error("Erro desconhecido - Status code: " + response.status);
    }
  };

  const recuperar = async (): Promise<T[]> => {
    const response = await fetch(URL);
    await handleResponseError(response);
    return await response.json();
  };

  const recuperarPorId = async (id: number): Promise<T> => {
    const response = await fetch(`${URL}/${id}`);
    await handleResponseError(response);
    return await response.json();
  };

  const cadastrar = async (obj: any): Promise<T> => {
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(obj),
    });
    await handleResponseError(response);
    return await response.json();
  };

  const alterar = async (id: number, obj: any): Promise<T> => {
    const response = await fetch(`${URL}/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(obj),
    });
    await handleResponseError(response);
    return await response.json();
  };

  const removerPorId = async (id: number): Promise<void> => {
    const response = await fetch(`${URL}/${id}`, { method: "DELETE" });
    await handleResponseError(response);
  };

  return { recuperar, recuperarPorId, cadastrar, alterar, removerPorId };
};
export default useAPI;
