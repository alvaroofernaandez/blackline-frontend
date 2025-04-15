import React, { useEffect, useState } from "react";
import Alert from "../Alert";

const TablaNoticias = () => {
  const [data, setData] = useState([]);
  const [alerta, setAlerta] = useState(null);

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
        setAlerta({ type: "success", message: "Noticia eliminada con éxito." });
        setData(data.filter((noticia) => noticia.id !== id));
      } else {
        setAlerta({ type: "error", message: "Error al eliminar la noticia." });
      }
    } catch (e) {
      setAlerta({ type: "error", message: "Error al eliminar la noticia." });
    }
  };

  return (
    <div className="container mx-auto p-4">
      {alerta && (
        <Alert
          type={alerta.type}
          message={alerta.message}
          onClose={() => setAlerta(null)}
        />
      )}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Lista de Noticias
      </h2>
      <div className="max-h-96 overflow-y-auto">
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
                <td className="p-3 text-center flex justify-center gap-2">
                  <a
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-500 transition flex items-center justify-center"
                    href={`/ActualizarNoticia/${fila.id}`}
                  >
                    <img
                      alt="editar"
                      src="/icons/pencil.svg"
                      className="w-4 h-4 text-white"
                    />
                  </a>
                  <button
                    className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-500 transition flex items-center justify-center"
                    onClick={() => eliminarNoticia(fila.id)}
                  >
                    <img
                      alt="eliminar"
                      src="/icons/trash.svg"
                      className="w-4 h-4 text-white"
                    />
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
