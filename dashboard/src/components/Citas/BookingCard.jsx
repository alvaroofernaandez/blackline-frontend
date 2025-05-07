import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { GrDocumentPdf } from "react-icons/gr";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Modal from "../General/Modal";
import { useCitas } from "../../hooks/useCitas";
import { useFacturas } from "../../hooks/useFacturas";
import { navigate } from "astro/virtual-modules/transitions-router.js";

const BookingCard = ({ id, design, fecha, hora, estado, descripcion, solicitante }) => {
  const { eliminarCita, obtenerNombreSolicitante, obtenerRangoHora } = useCitas();
  const { crearFactura } = useFacturas(); 
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

  const handleCrearFactura = async () => {
    const factura = {
      cliente: solicitante,
      cita: id,
      fecha_emision: new Date().toISOString(),
      total: "0.00", 
    };

    const success = await crearFactura(factura);
    if (success) {
      navigate("/facturas");
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
            Hora: <span className="text-gray-200">{obtenerRangoHora(hora)}</span>
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
              {design ? `Diseño #${design}` : "No asignado"}
            </span>
          </p>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            type="button"
            aria-label="Editar cita"
            onClick={() => navigate(`/actualizar-cita/${id}`)}
            className="flex-1 bg-neutral-500 hover:bg-neutral-400 transition-colors duration-300 text-white py-2 rounded-md flex items-center justify-center"
          >
            <AiFillEdit />
          </button>
          <button
            type="button"
            aria-label="Realizar factura"
            onClick={handleCrearFactura} 
            className="flex-1 bg-red-500 hover:bg-red-600 transition-colors duration-300 text-white py-2 rounded-md flex items-center justify-center"
          >
            <GrDocumentPdf />
          </button>
          <button
            type="button"
            aria-label="Eliminar cita"
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
