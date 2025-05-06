import { useState } from "react";
import { FaRegTrashAlt, FaGift } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { GiPodiumWinner } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import Modal from "../General/Modal";
import { z } from "zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useSorteos } from "../../hooks/useSorteos";
import { navigate } from "astro/virtual-modules/transitions-router.js";

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

  const { eliminarSorteo, seleccionarGanador } = useSorteos();
  const [showModal, setShowModal] = useState(false);

  const formatDate = (fecha) =>
    format(new Date(fecha), "dd/MM/yyyy", { locale: es });

  const handleEliminarSorteo = async () => {
    const success = await eliminarSorteo(id);
    if (success) window.location.reload();
  };

  const handleSeleccionarGanador = async () => {
    const success = await seleccionarGanador(id);
    if (success) window.location.reload();
  };

  return (
    <>
      <div className="bg-gradient-to-br from-neutral-600 to-neutral-500 dark:from-neutral-900 dark:to-neutral-800 hover:-translate-y-1 shadow-lg transition-transform duration-300 text-white rounded-lg p-6 flex flex-col gap-4">
        <h2 className="text-3xl font-semibold">{titulo}</h2>
        <p className="text-sm text-gray-400">{descripcion}</p>
        <div className="text-sm text-gray-400">
          <p>Inicio: <span className="text-gray-200">{formatDate(fecha_inicio)}</span></p>
          <p>Fin: <span className="text-gray-200">{formatDate(fecha_fin)}</span></p>
          <p>Estado: <span className="text-green-400 font-extrabold">{estado}</span></p>
          <p>Ganador: <span className="text-green-400 font-extrabold">{ganador || "Pendiente"}</span></p>
          <p>Premios: <span className="text-gray-200">{premios.length || "Ninguno"}</span></p>
          <p>Participantes: <span className="text-gray-200">{participantes.length}</span></p>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            type="button"
            aria-label="Editar sorteo"
            onClick={() => navigate(`/actualizar-sorteo/${id}`)}
            className="flex-1 bg-neutral-500 hover:bg-neutral-400 transition-colors duration-300 text-white py-2 rounded-md flex items-center justify-center"
          >
            <AiFillEdit />
          </button>
          <button
            type="button"
            aria-label="Eliminar sorteo"
            onClick={() => setShowModal(true)}
            className="flex-1 bg-neutral-700 hover:bg-neutral-600 transition-colors duration-300 text-white py-2 rounded-md flex items-center justify-center"
          >
            <FaRegTrashAlt />
          </button>
          <button
            type="button"
            aria-label="Ver participantes"
            onClick={() => navigate(`/participantes-sorteo/${id}`)}
            className="flex-1 bg-blue-500 hover:bg-blue-400 transition-colors duration-300 text-white py-2 rounded-md flex items-center justify-center"
          >
            <FaUsers />
          </button>
          <button
            type="button"
            aria-label="Seleccionar ganador"
            onClick={handleSeleccionarGanador}
            className="flex-1 bg-green-600 hover:bg-green-500 transition-colors duration-300 text-white py-2 rounded-md flex items-center justify-center"
          >
            <GiPodiumWinner />
          </button>
          <button
            onClick={() => navigate(`/asignar-premio/${id}`)}
            className="flex-1 bg-yellow-500 hover:bg-yellow-400 transition-colors duration-300 text-white py-2 rounded-md flex items-center justify-center"
          >
            <FaGift />
          </button>
        </div>
      </div>

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          eliminarObjeto={handleEliminarSorteo}
          id={id}
        />
      )}
    </>
  );
};

export default CardSorteo;
