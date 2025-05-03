import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { z } from "zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Modal from "../General/Modal";
import { useCitas } from "../../hooks/useCitas";
import { navigate } from "astro/virtual-modules/transitions-router.js";

const CitaSchema = z.object({
  id: z.number(),
  diseño: z.number().optional(),
  fecha: z.string(),
  hora: z.string(),
  estado: z.string(),
  descripcion: z.string(),
  fecha_creacion: z.string().optional(),
  solicitante: z.number(),
});

const BookingCard = (props) => {
  const { id, diseño, fecha, hora, estado, descripcion, solicitante } =
    CitaSchema.parse(props);

  const { eliminarCita, obtenerNombreSolicitante } = useCitas();
  const [showModal, setShowModal] = useState(false);

  const formatDate = (fecha) =>
    format(new Date(fecha), "dd/MM/yyyy", { locale: es });

  const handleEliminarCita = async (id) => {
    const success = await eliminarCita(id);
    if (success) {
      setShowModal(false);
      setTimeout(() => {
        navigate("/citas");
      }, 200);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-neutral-600 to-neutral-500 dark:from-neutral-900 dark:to-neutral-800 hover:-translate-y-1 shadow-lg transition-transform duration-300 text-white rounded-lg p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Cita #{id}</h2>
        <p className="text-sm text-gray-400">{descripcion}</p>
        <div className="text-sm text-gray-400">
          <p>
            Fecha:{" "}
            <span className="text-gray-200">{formatDate(fecha)}</span>
          </p>
          <p>
            Hora: <span className="text-gray-200">{hora}</span>
          </p>
          <p>
            Estado:{" "}
            <span className="text-green-400 font-extrabold">{estado}</span>
          </p>
          <p>
            Solicitante:{" "}
            <span className="text-gray-200">
              {obtenerNombreSolicitante(solicitante)}
            </span>
          </p>
          <p>
            Diseño:{" "}
            <span className="text-gray-200">
              {diseño ? `Diseño #${diseño}` : "No asignado"}
            </span>
          </p>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => navigate(`/actualizar-cita/${id}`)}
            className="flex-1 bg-neutral-500 hover:bg-neutral-400 transition-colors duration-300 text-white py-2 rounded-md flex items-center justify-center"
          >
            <AiFillEdit />
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex-1 bg-neutral-700 hover:bg-neutral-600 transition-colors duration-300 text-white py-2 rounded-md flex items-center justify-center"
          >
            <FaRegTrashAlt />
          </button>
        </div>
      </div>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          eliminarObjeto={handleEliminarCita}
          id={id}
          fullScreen={true} 
        />
      )}
    </>
  );
};

export default BookingCard;