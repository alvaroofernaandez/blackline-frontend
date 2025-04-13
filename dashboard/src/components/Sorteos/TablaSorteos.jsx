import { useEffect, useState } from "react";
import CardSorteo from "./CardSorteo";

const TablaSorteos = () => {
  const [sorteos, setSorteos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerSorteos = async () => {
      try {
        const respuesta = await fetch("http://127.0.0.1:8000/api/sorteos/");
        if (!respuesta.ok) throw new Error("Error al obtener los sorteos");
        const datos = await respuesta.json();
        setSorteos(datos);
      } catch (err) {
        console.error("Error:", err);
        setError("No se pudieron cargar los sorteos.");
      } finally {
        setCargando(false);
      }
    };

    obtenerSorteos();
  }, []);

  if (cargando) return <p className="text-center">Cargando sorteos...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-4 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Listado de Sorteos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorteos.map((sorteo, index) => (
          <CardSorteo key={index} {...sorteo} />
        ))}
      </div>
    </div>
  );
};

export default TablaSorteos;
