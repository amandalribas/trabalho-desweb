export interface Evento {
  id: number;
  tipoEvento: string;
  jogador: string | null;
  minuto: number | null;
  jogoId: number;
  jogoDescricao: string;
  placarA: number;
  placarB: number;
  timeANome: string;
  timeBNome: string;
  timeId: number;
  timeNome: string;
}