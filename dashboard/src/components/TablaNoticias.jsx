import React, { useEffect, useState } from "react";

const TablaNoticias = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/noticias")
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
      const respuesta = await fetch(`http://127.0.0.1:8000/noticias/${id}/`, {
        method: "DELETE",
      });
      if (respuesta.ok) {
        alert("Noticia eliminada con éxito.");
        setData(data.filter((noticia) => noticia.id !== id));
      } else {
        alert("Error al eliminar la noticia.");
      }
    } catch (e) {
      alert("Error al eliminar la noticia.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Lista de Noticias
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-900 text-white">
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
              <tr key={index} className="hover:bg-gray-100 transition">
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
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-500 transition"
                    href={`/ActualizarNoticia/${fila.id}`}
                  >
                    Editar
                  </a>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-500 transition"
                    onClick={() => eliminarNoticia(fila.id)}
                  >
                    Borrar
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
