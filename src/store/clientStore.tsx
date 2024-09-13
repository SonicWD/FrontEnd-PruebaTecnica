import create from 'zustand';

interface Client {
  id: string;
  name: string;
  identificationNumber: string;
  email: string;
}

interface ClientStore {
  clients: Client[];
  setClients: (clients: Client[]) => void;
}

export const useClientStore = create<ClientStore>((set) => ({
  clients: [],
  setClients: (clients) => set({ clients }),
}));
