export interface Evento {
  id: number;
  tipoEvento: string;
  jogador: string | null;
  jogoId: number;
  jogoDescricao: string;
  timeId: number;
  timeNome: string;
}