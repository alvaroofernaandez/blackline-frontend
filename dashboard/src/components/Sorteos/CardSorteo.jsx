import { useState } from "react";
import { toast } from "sonner";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { GiPodiumWinner } from "react-icons/gi";
import Modal from "../General/Modal";
import { z } from "zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const SorteoSchema = z.object({
  id: z.string(),
  titulo: z.string(),
  descripcion: z.string(),
  fecha_inicio: z.string(),
  fecha_fin: z.string(),
  estado: z.string(),
  ganador: z.string().nullable(),
  premios: z.array(z.string()).optional(),
  participantes: z.array(z.any()).optional(),
});

const CardSorteo = (props) => {
  const {
    id,
    titulo,
    descripcion,
    fecha_inicio,
    fecha_fin,
    estado,
    ganador,
    premios = [],
    participantes = [],
  } = SorteoSchema.parse(props);

  const [showModal, setShowModal] = useState(false);

  const formatDate = (fecha) => format(new Date(fecha), "dd 'de' MMMM 'de' yyyy", { locale: es });

  const eliminarSorteo = async (id) => {
    try {
      const respuesta = await fetch(`http://127.0.0.1:8000/api/sorteos/${id}/`, {
        method: "DELETE",
      });
      if (respuesta.ok) {
        toast.success("Sorteo eliminado con éxito.");
        setTimeout(() => {
          window.location.reload();
        }, 200);
      } else {
        toast.error("Error al eliminar el sorteo.");
      }
    } catch (e) {
      toast.error("Error al eliminar el sorteo.");
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
        toast.success("Ganador seleccionado con éxito.");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        const errorData = await respuesta.json();
        toast.error(
          "Error al seleccionar el ganador: " +
          (errorData.error ? errorData.error : "Error desconocido.")
        );
      }
    } catch (e) {
      toast.error("Error al seleccionar el ganador.");
    }
  };

  return (
    <div className="bg-[#262626] rounded-2xl shadow-md p-6 border border-gray-700 hover:shadow-lg transition-shadow flex flex-col justify-between h-full">
      <div>
        <h2 className="text-4xl font-bold text-white text-center mb-2">{titulo}</h2>
        <hr className="border-neutral-700 mb-6" />
        <p className="text-gray-300 mb-4">Descripción: {descripcion}</p>
        <hr className="border-neutral-700 mb-6" />

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
          🔷 Estado del sorteo:{" "}
          <span className="text-green-400 font-semibold">{estado}</span>
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

        <div className="flex justify-between items-center">
          <h3 className="text-md font-semibold text-white mb-1">
            👥 Nº de participantes: {participantes.length}
          </h3>
            <a href={`/participantes-sorteo/${id}`} className="bg-neutral-900 p-1 pl-3 pr-3 rounded-lg hover:bg-neutral-700 transition-all duration-100">Ver detalles</a>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-10">
        <button
          onClick={() => (window.location.href = `/actualizar-sorteo/${id}`)}
          className="bg-neutral-400 hover:scale-105 transition-all duration-500 w-full text-white size-10 items-center justify-items-center rounded-lg"
        >
          <AiFillEdit className="size-6" />
        </button>
        <button
          className="bg-neutral-900 hover:scale-105 transition-all duration-500 w-full text-white size-10 items-center justify-items-center rounded-lg"
          onClick={() => setShowModal(true)}
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

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          eliminarObjeto={eliminarSorteo}
          id={id}
        />
      )}
    </div>
  );
};

export default CardSorteo;
