import { create } from 'zustand';
import { useAuthStore } from './authStore';

type Sorteo = {
  id: string;
  titulo: string;
  descripcion: string;
  fecha_inicio: string;
  fecha_fin: string;
  estado: string;
  ganador: string | null;
  premios: string[];
  participantes: {
    instagram_username: string;
    requirements: boolean;
  }[];
  usuarioActualParticipando?: boolean; 
};

type SorteosState = {
  sorteos: Sorteo[];
  sorteosActivos: Sorteo[];
  fetchSorteos: () => Promise<void>;
};

export const useSorteosStore = create<SorteosState>((set) => ({
  sorteos: [],
  sorteosActivos: [],
  fetchSorteos: async () => {
    try {
      const response = await fetch("http://localhost:8000/api/sorteos/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
      const data = await response.json();

      const currentUser = useAuthStore.getState().user;
      const currentInstagramUsername = currentUser?.instagram_username;

      const sorteosConParticipacion = data.map((sorteo: Sorteo) => ({
        ...sorteo,
        usuarioActualParticipando: sorteo.participantes.some(
          (participante) => participante.instagram_username === currentInstagramUsername
        ),
      }));

      const activos = sorteosConParticipacion.filter(
        (sorteo: Sorteo) => sorteo.estado === "activo"
      );

      set({ sorteos: sorteosConParticipacion, sorteosActivos: activos });
    } catch (error) {
      console.log("Error fetching sorteos:", error);
    }
  },
}));
