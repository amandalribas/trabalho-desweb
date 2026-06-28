export interface Evento {
  id: number;
  tipoEvento: string;
  jogador: string | null;
  minuto: number | null;
  jogoId: number;
  jogoDescricao: string;
  placarA: number;
  placarB: number;
  timeAId: number;
  timeANome: string;
  timeBId: number;
  timeBNome: string;
  timeId: number;
  timeNome: string;
}