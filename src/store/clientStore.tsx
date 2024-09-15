import {create} from 'zustand';

export interface Client {
  id: number;
  nombre: string;
  tipo_identificacion: string;
  numero_identificacion: string;
  correo: string;
  edad: number;
  telefono: string;
  fecha_creacion: string;
  fecha_actualizacion?: string;
}

interface ClientStore {
  clients: Client[];
  setClients: (clients: Client[]) => void;
}

export const useClientStore = create<ClientStore>((set) => ({
  clients: [],
  setClients: (clients) => set({ clients }),
}));
