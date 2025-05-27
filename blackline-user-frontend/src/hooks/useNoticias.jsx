import { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';

const noticiasPorPagina = 2;

const noticiaSchema = z.object({
  id: z.string(),
  titulo: z.string(),
  descripcion: z.string(),
  fecha: z.string(),
  imagen_url: z.string().optional(),
});

export function useNoticias() {
  const [noticias, setNoticias] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [cargando, setCargando] = useState(false);

  const fetchNoticias = useCallback(async () => {
    setCargando(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/noticias", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
      const raw = await res.json();
      const validadas = raw.map((n) => noticiaSchema.parse(n));
      if (validadas.length === 0) {
        toast.info("No hay noticias disponibles");
      }
      setNoticias(validadas);
    } catch (err) {
      toast.error("Error al cargar las noticias");
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    fetchNoticias();
  }, [fetchNoticias]);

  const totalPaginas = Math.ceil(noticias.length / noticiasPorPagina);
  const inicio = (paginaActual - 1) * noticiasPorPagina;
  const noticiasPaginadas = noticias.slice(inicio, inicio + noticiasPorPagina);

  const irPaginaAnterior = () => setPaginaActual(prev => Math.max(prev - 1, 1));
  const irPaginaSiguiente = () => setPaginaActual(prev => Math.min(prev + 1, totalPaginas));

  return {
    noticias,
    noticiasPaginadas,
    paginaActual,
    totalPaginas,
    cargando,
    irPaginaAnterior,
    irPaginaSiguiente,
    setPaginaActual,
    fetchNoticias,
    noticiasPorPagina,
  };
}