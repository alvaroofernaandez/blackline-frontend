import React, { useState } from "react";
import Alert from "../Alert";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { GiPodiumWinner } from "react-icons/gi";

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

  const seleccionarGanador = async (id) => {
    try {
      const respuesta = await fetch(
        `http://127.0.0.1:8000/api/sorteos_seleccionar_ganador/${id}/`,
        {
          method: "PATCH",
        }
      );
      if (respuesta.ok) {
        setTimeout(() => {
          window.location.reload();
        }, 0);
      } else {
        setAlerta({ type: "error", message: "Error al seleccionar el ganador." });
      }
    } catch (e) {
      setAlerta({ type: "error", message: "Error al seleccionar el ganador." });
    }
  }

  return (
    <div className="bg-[#262626] rounded-2xl shadow-md p-6 border border-gray-700 hover:shadow-lg transition-shadow flex flex-col justify-between h-full">
      {alerta && (
        <Alert
          type={alerta.type}
          message={alerta.message}
          onClose={() => setAlerta(null)}
        />
      )}
      <div>
        <h2 className="text-4xl font-bold text-white text-center mb-2">{titulo}</h2>
        <hr class="border-neutral-700 mb-6" />
        <p className="text-gray-300 mb-4">Descripción: {descripcion}</p>
        <hr class="border-neutral-700 mb-6" />

        <div className="grid gap-3 justify-between text-sm text-gray-400 mb-4">
          <span>
            🕒 Fecha de inicio:{" "}
            <strong className="text-gray-200">{formatDate(fecha_inicio)}</strong>
          </span>
          <span>
            🕛 Fecha de finalización:{" "}
            <strong className="text-gray-200">{formatDate(fecha_fin)}</strong>
          </span>
        </div>

        <p className="text-gray-200 font-medium mb-4">
          🔷 Estado del sorteo: {" "}
          <span className="text-green-400 font-semibold">
            {estado}
          </span>
        </p>

        <p className="text-gray-200 font-medium mb-4">
          🎉 Ganador:{" "}
          <span className="text-green-400 font-semibold">
            {ganador || "Pendiente"}
          </span>
        </p>

        <div className="mb-4">
          <h3 className="text-md font-semibold text-white mb-1">🎁 Premios:</h3>
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
            👥 Nº de participantes: {participantes.length}
          </h3>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-10">
        <button
          onClick={() => window.location.href = `/ActualizarSorteo/${id}`}
          className="bg-neutral-400 hover:scale-105 transition-all duration-500 w-full text-white size-10 items-center justify-items-center rounded-lg"
        >
          <AiFillEdit className="size-6"/>
        </button>
        <button
          className="bg-neutral-900 hover:scale-105 transition-all duration-500 w-full text-white size-10 items-center justify-items-center rounded-lg"
          onClick={() => eliminarSorteo(id)}
        >
          <FaRegTrashAlt className="size-6" />
        </button>
        <button
          className="bg-green-500 hover:scale-105 transition-all duration-500 w-full text-white size-10 items-center justify-items-center rounded-lg"
          onClick={() => seleccionarGanador(id)}
        >
          <GiPodiumWinner className="size-6" />
        </button>
      </div>
    </div>
  );
};

export default CardSorteo;
