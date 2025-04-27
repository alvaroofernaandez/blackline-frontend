import { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

const TablaParticipantes = ({ id }) => {
  const [participantes, setParticipantes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSorteo = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/sorteos');
        if (!response.ok) throw new Error('Error al cargar los sorteos');
        const sorteos = await response.json();

        const sorteoEncontrado = sorteos.find((sorteo) => String(sorteo.id) === String(id));
        
        if (sorteoEncontrado) {
          setParticipantes(sorteoEncontrado.participantes || []);
        } else {
          console.error(`No se encontró el sorteo con id ${id}`);
          setParticipantes([]);
        }
      } catch (error) {
        console.error('Error al cargar sorteos:', error);
        setParticipantes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSorteo();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center">
        <button onClick={() => window.history.back()} className=" text-white p-2 rounded">
          <FaArrowLeftLong className="size-8 mr-2" />
        </button>
        <h2 className="text-4xl text-center font-bold mb-4 mx-auto">Participantes del sorteo</h2>
      </div>
      <hr />
      {loading ? (
        <p className="text-center text-gray-500 mt-10">Cargando participantes...</p>
      ) : participantes.length === 0 ? (
        <p className="text-red-500 text-center mt-10">No hay participantes actualmente.</p>
      ) : (
        <div className="max-h-[700px] overflow-y-auto rounded-xl mt-10">
          <table className="w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-neutral-800 text-white sticky top-0 z-10">
              <tr>
                <th className="p-3 text-left">Instagram</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {participantes.map((participante, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-100 transition ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-3 text-gray-600">{participante.instagram_username || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TablaParticipantes;
