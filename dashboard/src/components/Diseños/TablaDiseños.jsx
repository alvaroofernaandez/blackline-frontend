import { useEffect, useState } from "react";
import CardDiseño from "./CardDiseño";

const TablaDiseños = () => {
  const [diseños, setDiseños] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerDiseños = async () => {
      try {
        const respuesta = await fetch("http://127.0.0.1:8000/api/diseños/");
        if (!respuesta.ok) throw new Error("Error al obtener los diseños");
        const datos = await respuesta.json();
        setDiseños(datos);
      } catch (err) {
        console.error("Error:", err);
        setError("No se pudieron cargar los diseños.");
      } finally {
        setCargando(false);
      }
    };

    obtenerDiseños();
  }, []);

  if (cargando) return <p className="text-center">Cargando diseños...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (diseños.length === 0)
    return <p className="text-red-500 text-center">No hay diseños actualmente, añade un diseño</p>;

  return (
    <div className="p-4 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">
        Listado de Diseños
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {diseños.map((diseño) => (
          <CardDiseño key={diseño.id} {...diseño} />
        ))}
      </div>
    </div>
  );
};

export default TablaDiseños;
