export interface EventoCreate {
  tipoEvento: string;
  jogador: string | null;
  jogoId: number;
  timeId: number;
}