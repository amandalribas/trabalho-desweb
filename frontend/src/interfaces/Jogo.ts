export interface Jogo {
  id: number;
  descricao: string;
  local: string;
  placarA: number;
  placarB: number;
  timeAId: number;
  timeANome: string;
  timeAImagem: string;
  timeBId: number;
  timeBNome: string;
  timeBImagem: string;
  competicaoId: number;
  status: "AGUARDANDO" | "EM_ANDAMENTO" | "INTERVALO" | "ENCERRADO";
  iniciadoEm: string | null;
}