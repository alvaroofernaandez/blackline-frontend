import { useEffect, useState } from 'react';
import { z } from 'zod';
import CardDiseños from './CardDiseños.jsx'; 

const DesignSchema = z.object({
  id: z.number(),
  titulo: z.string(),
  descripcion: z.string(),
  precio: z.string(),
  ancho: z.number(),
  alto: z.number(),
  image: z.string().url()
});

const DesignComponent = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/diseños/');
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
          imageUrl: design.image            
        }));

        setDesigns(adaptedDesigns);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {designs.map((design) => (
        <CardDiseños
          key={design.id}
          title={design.title}
          price={design.price}
          size={design.size}
          imageUrl={design.imageUrl}
        />
      ))}
    </div>
  );
};

export default DesignComponent;
