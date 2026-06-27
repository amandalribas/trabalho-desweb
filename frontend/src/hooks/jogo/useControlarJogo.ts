import { useMutation } from "@tanstack/react-query";
import { URL_BASE, URL_JOGOS } from "../../util/constantes";
import { queryClient } from "../../main";
import type { Jogo } from "../../interfaces/Jogo";
import type { EventoCreate } from "../../interfaces/EventoCreate";
import type { Evento } from "../../interfaces/Evento";

const acao = async (jogoId: number, path: string): Promise<Jogo> => {
  const response = await fetch(`${URL_BASE}${URL_JOGOS}/${jogoId}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw await response.json().catch(() => ({}));
  return response.json();
};

const adicionarEventoFetch = async (
  jogoId: number,
  dados: EventoCreate
): Promise<Evento> => {
  const response = await fetch(
    `${URL_BASE}${URL_JOGOS}/${jogoId}/eventos`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    }
  );
  if (!response.ok) throw await response.json().catch(() => ({}));
  return response.json();
};

const invalidar = () => {
  queryClient.invalidateQueries({ queryKey: ["jogos"] });
  queryClient.invalidateQueries({ queryKey: ["eventos"] });
};

export const useIniciarJogo = () =>
  useMutation({
    mutationFn: (jogoId: number) => acao(jogoId, "iniciar"),
    onSuccess: invalidar,
  });

export const useIniciarIntervalo = () =>
  useMutation({
    mutationFn: (jogoId: number) => acao(jogoId, "intervalo"),
    onSuccess: invalidar,
  });

export const useEncerrarJogo = () =>
  useMutation({
    mutationFn: (jogoId: number) => acao(jogoId, "encerrar"),
    onSuccess: invalidar,
  });

export const useAdicionarEventoNoJogo = () =>
  useMutation({
    mutationFn: ({ jogoId, dados }: { jogoId: number; dados: EventoCreate }) =>
      adicionarEventoFetch(jogoId, dados),
    onSuccess: invalidar,
  });