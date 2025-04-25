import { useEffect, useState } from "react";
import { toast } from "sonner"; // 👈 Añadimos Sonner
import { FaRegTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";

const TablaNoticias = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/noticias")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const formatearFecha = (fecha) => {
    const opciones = { year: "numeric", month: "long", day: "numeric" };
    return new Date(fecha).toLocaleDateString("es-ES", opciones);
  };

  const eliminarNoticia = async (id) => {
    try {
      const respuesta = await fetch(
        `http://127.0.0.1:8000/api/noticias/${id}/`,
        {
          method: "DELETE",
        }
      );
      if (respuesta.ok) {
        toast.success("Noticia eliminada con éxito."); // 👈 
        setData(data.filter((noticia) => noticia.id !== id));
      } else {
        toast.error("Error al eliminar la noticia."); // 👈 
      }
    } catch (e) {
      toast.error("Error al eliminar la noticia."); // 👈 
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Lista de Noticias
      </h2>
      <div className="max-h-[700px] overflow-y-auto rounded-xl">
        <table className="w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-neutral-800 text-white sticky top-0 z-10">
            <tr>
              <th className="p-3 text-left">Título</th>
              <th className="p-3 text-left">Descripción</th>
              <th className="p-3 text-left">Fecha</th>
              <th className="p-3 text-left">Imagen</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((fila, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 transition ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-3 text-gray-700">{fila.titulo}</td>
                <td className="p-3 text-gray-600 truncate max-w-xs">
                  {fila.descripcion}
                </td>
                <td className="p-3 text-gray-600">
                  {formatearFecha(fila.fecha)}
                </td>
                <td className="p-3">
                  <img
                    src={fila.imagen}
                    className="w-24 h-16 object-cover rounded-lg border"
                    alt="Imagen de noticia"
                  />
                </td>
                <td className="flex gap-3 justify-center items-center p-8">
                  <button
                    className="bg-neutral-400 hover:scale-105 transition-all duration-500 text-white size-10 items-center justify-items-center rounded-lg"
                    onClick={() => window.location.href = `/actualizar-noticia/${fila.id}`}
                  >
                    <AiFillEdit className="size-6"/>
                  </button>
                  <button
                    className="bg-neutral-800 hover:scale-105 transition-all duration-500 text-white size-10 items-center justify-items-center rounded-lg"
                    onClick={() => eliminarNoticia(fila.id)}
                  >
                    <FaRegTrashAlt className="size-6"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaNoticias;
