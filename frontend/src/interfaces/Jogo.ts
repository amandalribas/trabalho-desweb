import type { Competicao } from "./Competicao";
import type { Time } from "./Time";

export interface Jogo {
  id: number;
  timeA: Time;
  timeB: Time;
  competicao: Competicao;
  placarA: number;
  placarB: number;
  descricao: string;
  local: string;
}
