import React, { useState } from "react";
import Alert from "../Alert";

const CardSorteo = ({
  id,
  titulo,
  descripcion,
  fecha_inicio,
  fecha_fin,
  estado,
  ganador,
  premios = [],
  participantes = [],
}) => {
  const [alerta, setAlerta] = useState(null);

  const formatDate = (fecha) =>
    new Date(fecha).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const eliminarSorteo = async (id) => {
    try {
      const respuesta = await fetch(
        `http://127.0.0.1:8000/api/sorteos/${id}/`,
        {
          method: "DELETE",
        }
      );
      if (respuesta.ok) {
        setTimeout(() => {
          window.location.reload();
        }, 0);
      } else {
        setAlerta({ type: "error", message: "Error al eliminar el sorteo." });
      }
    } catch (e) {
      setAlerta({ type: "error", message: "Error al eliminar el sorteo." });
    }
  };

  return (
    <div className="bg-[#262626] rounded-2xl shadow-md p-6 border border-gray-700 hover:shadow-lg transition-shadow">
      {alerta && (
        <Alert
          type={alerta.type}
          message={alerta.message}
          onClose={() => setAlerta(null)}
        />
      )}
      <h2 className="text-xl font-bold text-white mb-2">{titulo}</h2>
      <p className="text-gray-300 mb-4">{descripcion}</p>

      <div className="flex justify-between text-sm text-gray-400 mb-4">
        <span>
          🕒 Inicio:{" "}
          <strong className="text-gray-200">{formatDate(fecha_inicio)}</strong>
        </span>
        <span>
          🕛 Fin:{" "}
          <strong className="text-gray-200">{formatDate(fecha_fin)}</strong>
        </span>
      </div>

      <p className="text-gray-200 font-medium mb-4">
        🎉 Ganador:{" "}
        <span className="text-green-400 font-semibold">
          {ganador || "Pendiente"}
        </span>
      </p>

      <div className="mb-4">
        <h3 className="text-md font-semibold text-white mb-1">🎁 Premios</h3>
        <ul className="list-disc list-inside text-gray-300">
          {premios.length > 0 ? (
            premios.map((premio, index) => <li key={index}>{premio}</li>)
          ) : (
            <li>No hay premios disponibles</li>
          )}
        </ul>
      </div>

      <div>
        <h3 className="text-md font-semibold text-white mb-1">
          👥 Participantes
        </h3>
        <ul className="list-disc list-inside text-gray-300">
          {participantes.length > 0 ? (
            participantes.map((p, index) => (
              <li key={index}>{p.instagram_username}</li>
            ))
          ) : (
            <li>No hay participantes</li>
          )}
        </ul>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <button
          className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-500 transition flex items-center justify-center"
          onClick={() => eliminarSorteo(id)}
        >
          <img
            alt="eliminar"
            src="/icons/trash.svg"
            className="w-4 h-4 text-white"
          />
        </button>
        {/* Puedes agregar un botón de editar si es necesario */}
        <a
          href={`/ActualizarSorteo/${id}`}
          className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-500 transition flex items-center justify-center"
        >
          <img
            alt="editar"
            src="/icons/pencil.svg"
            className="w-4 h-4 text-white"
          />
        </a>
      </div>
    </div>
  );
};

export default CardSorteo;
