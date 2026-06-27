import type { Jogo } from "./Jogo";
import type { Time } from "./Time";

export interface Competicao {
  id: number;
  nome: string;
  dataInicio: string;
  dataFim: string;
  times: Time[];
  jogos: Jogo[];
}
