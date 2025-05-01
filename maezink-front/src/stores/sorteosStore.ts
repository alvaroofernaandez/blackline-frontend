import { create } from 'zustand';

type Sorteo = {
  id: number;
  titulo: string;
  descripcion: string;
  fecha_fin: string;
  premios: string[];
  participantes: any[];
  estado: string;
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
      const activos = data.filter((sorteo: Sorteo) => sorteo.estado === "activo");
      set({ sorteos: data, sorteosActivos: activos });
    } catch (error) {
      console.error("Error al obtener los sorteos:", error);
    }
  },
}));
