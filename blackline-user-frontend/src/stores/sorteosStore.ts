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
  usuarioActualParticipando?: boolean; // Nuevo campo
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
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      if (!token) throw new Error("Token no encontrado");

      const response = await fetch("http://localhost:8000/api/sorteos/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      // Obtener el usuario actual desde el authStore
      const currentUser = useAuthStore.getState().user;
      const currentInstagramUsername = currentUser?.instagram_username;

      // Marcar si el usuario actual está participando
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
      console.error("Error al obtener los sorteos:", error);
    }
  },
}));
