import { useEffect, useState } from 'react';
import { z } from 'zod';
import CardDiseños from './CardDiseños.jsx'; 
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

const DesignComponent = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4); 
  
  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("accessToken="))
          ?.split("=")[1];
        if (!token) throw new Error("Token no encontrado");
        const response = await fetch('http://localhost:8000/api/diseños/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-right">
        {designs.slice(0, visibleCount).map((design) => (
          <CardDiseños
            key={design.id}
            title={design.title}
            price={design.price}
            size={design.size}
            time={design.time} 
            imageUrl={design.imageUrl}
          />
        ))}
      </div>
      {visibleCount < designs.length && (
        <div className="text-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-neutral-950 text-white rounded-lg hover:bg-neutral-900 transition-all duration-300"
          >
            Ver más...
          </button>
        </div>
      )}
    </div>
  );
};

export default DesignComponent;
