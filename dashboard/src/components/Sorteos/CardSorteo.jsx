import { useState } from "react";
import { toast } from "sonner";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { GiPodiumWinner } from "react-icons/gi";
import { FaGift } from "react-icons/fa6";
import Modal from "../General/Modal";
import { z } from "zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useSorteos } from "../../hooks/useSorteos";

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

  const { eliminarSorteo, asignarPremio } = useSorteos();
  const [showModal, setShowModal] = useState(false);
  const [hoveredButton, setHoveredButton] = useState("");

  const formatDate = (fecha) =>
    format(new Date(fecha), "dd 'de' MMMM 'de' yyyy", { locale: es });

  const handleEliminarSorteo = async () => {
    const success = await eliminarSorteo(id);
    if (success) {
      setTimeout(() => {
        window.location.reload();
      }, 200);
    }
  };

  const handleSeleccionarGanador = async () => {
    const success = await asignarPremio(id, "ganador");
    if (success) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
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
          <a
            href={`/participantes-sorteo/${id}`}
            className="bg-neutral-900 p-1 pl-3 pr-3 rounded-lg hover:bg-neutral-700 transition-all duration-100"
          >
            Ver detalles
          </a>
        </div>
      </div>

      <div className="flex gap-4 mt-10 relative">
        <div className="relative flex flex-col items-center w-full">
          <button
            onMouseEnter={() => setHoveredButton("Editar sorteo")}
            onMouseLeave={() => setHoveredButton("")}
            onClick={() => (window.location.href = `/actualizar-sorteo/${id}`)}
            className="bg-neutral-400 hover:scale-105 transition-all duration-500 w-full text-white size-10 items-center justify-items-center rounded-lg"
          >
            <AiFillEdit className="size-6" />
          </button>
          {hoveredButton === "Editar sorteo" && (
            <div className="absolute bottom-12 bg-black text-white text-xs py-1 px-2 rounded-md">
              {hoveredButton}
            </div>
          )}
        </div>
        <div className="relative flex flex-col items-center w-full">
          <button
            onMouseEnter={() => setHoveredButton("Eliminar sorteo")}
            onMouseLeave={() => setHoveredButton("")}
            className="bg-neutral-900 hover:scale-105 transition-all duration-500 w-full text-white size-10 items-center justify-items-center rounded-lg"
            onClick={() => setShowModal(true)}
          >
            <FaRegTrashAlt className="size-6" />
          </button>
          {hoveredButton === "Eliminar sorteo" && (
            <div className="absolute bottom-12 bg-black text-white text-xs py-1 px-2 rounded-md">
              {hoveredButton}
            </div>
          )}
        </div>
        <div className="relative flex flex-col items-center w-full">
          <button
            onMouseEnter={() => setHoveredButton("Finalizar sorteo")}
            onMouseLeave={() => setHoveredButton("")}
            className="bg-green-500 hover:scale-105 transition-all duration-500 w-full text-white size-10 items-center justify-items-center rounded-lg"
            onClick={handleSeleccionarGanador}
          >
            <GiPodiumWinner className="size-6" />
          </button>
          {hoveredButton === "Finalizar sorteo" && (
            <div className="absolute bottom-12 bg-black text-white text-xs py-1 px-2 rounded-md">
              {hoveredButton}
            </div>
          )}
        </div>
        <div className="relative flex flex-col items-center w-full">
          <button
            onMouseEnter={() => setHoveredButton("Asignar premios")}
            onMouseLeave={() => setHoveredButton("")}
            className="bg-yellow-500 hover:scale-105 transition-all duration-500 w-full text-white size-10 items-center justify-items-center rounded-lg"
            onClick={() => (window.location.href = `/asignar-premio/${id}`)}
          >
            <FaGift className="size-6" />
          </button>
          {hoveredButton === "Asignar premios" && (
            <div className="absolute bottom-12 bg-black text-white text-xs py-1 px-2 rounded-md">
              {hoveredButton}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          eliminarObjeto={handleEliminarSorteo}
          id={id}
        />
      )}
    </div>
  );
};

export default CardSorteo;
