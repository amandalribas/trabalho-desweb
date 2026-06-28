import { create } from "zustand";
import type { Evento } from "../interfaces/Evento";

export interface NotificacaoItem {
  uid: string;
  evento: Evento;
  recebidaEm: Date;
}

interface NotificacaoStore {
  notificacoes: NotificacaoItem[];
  toastsAtivos: NotificacaoItem[];
  addNotificacao: (evento: Evento) => void;
  removerToast: (uid: string) => void;
}

const useNotificacaoStore = create<NotificacaoStore>((set) => ({
  notificacoes: [],
  toastsAtivos: [],
  addNotificacao: (evento) => {
    const uid = crypto.randomUUID();
    const item: NotificacaoItem = { uid, evento, recebidaEm: new Date() };
    set((s) => ({
      notificacoes: [item, ...s.notificacoes],
      toastsAtivos: [item, ...s.toastsAtivos],
    }));
  },
  removerToast: (uid) =>
    set((s) => ({ toastsAtivos: s.toastsAtivos.filter((t) => t.uid !== uid) })),
}));

export default useNotificacaoStore;
