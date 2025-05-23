import { useEffect, useState } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';

const DesignSchema = z.object({
  id: z.number(),
  titulo: z.string(),
  descripcion: z.string(),
  precio: z.string(),
  ancho: z.number(),
  alto: z.number(),
  image: z.string().url(),
  duracion: z.number().optional(),
});

export const useDiseños = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/diseños/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch designs');
        }
        const data = await response.json();

        const validatedData = z.array(DesignSchema).parse(data);

        const adaptedDesigns = validatedData.map(design => ({
          id: design.id,
          title: design.titulo,
          description: design.descripcion,
          price: design.precio,
          size: `${design.ancho} x ${design.alto}`,
          imageUrl: design.image,
          time: design.duracion ? `${design.duracion} horas` : 'No disponible',
        }));

        setDesigns(adaptedDesigns);

        if (adaptedDesigns.length === 0) {
          toast.info('No hay diseños disponibles en este momento.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return {
    designs: designs.slice(0, visibleCount),
    loading,
    error,
    hasMore: visibleCount < designs.length,
    handleLoadMore,
  };
};