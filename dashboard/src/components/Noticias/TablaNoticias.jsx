import { format } from "date-fns";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { useState } from "react";
import Modal from "../General/Modal";
import { useNoticias } from "../../hooks/useNoticias";

const TablaNoticias = () => {
  const { noticias, loading, eliminarNoticia } = useNoticias();
  const [showModal, setShowModal] = useState(false);
  const [idSeleccionado, setIdSeleccionado] = useState(null);

  const abrirModal = (id) => {
    setIdSeleccionado(id);
    setShowModal(true);
  };

  const formatearFecha = (fecha) =>
    format(new Date(fecha), "dd 'de' MMMM 'de' yyyy");

  if (loading) return <p className="text-center">Cargando noticias...</p>;
  if (noticias.length === 0)
    return <p className="text-red-500 text-center">No hay noticias actualmente</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-white mb-4 text-center">Lista de Noticias</h2>
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
          <tbody className="bg-white divide-y divide-gray-200 ">
            {noticias.map((fila, index) => (
              <tr
                key={fila.id}
                className={`hover:bg-gray-100 transition ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="p-3 text-gray-700">{fila.titulo}</td>
                <td className="p-3 text-gray-600 truncate max-w-xs">{fila.descripcion}</td>
                <td className="p-3 text-gray-600">{formatearFecha(fila.fecha)}</td>
                <td className="p-3">
                  <img
                    src={fila.imagen}
                    alt="Imagen de noticia"
                    className="max-w-full h-auto rounded-lg border"
                    style={{ maxHeight: "80px", objectFit: "contain" }}
                  />
                </td>
                <td className="flex gap-3 justify-center items-center p-8">
                  <button
                    className="bg-neutral-400 size-10 hover:scale-105 transition-all duration-500 text-white rounded-lg justify-items-center"
                    onClick={() => (window.location.href = `/actualizar-noticia/${fila.id}`)}
                  >
                    <AiFillEdit className="text-xl" />
                  </button>
                  <button
                    className="bg-neutral-800 size-10 hover:scale-105 transition-all duration-500 text-white rounded-lg justify-items-center"
                    onClick={() => abrirModal(fila.id)}
                  >
                    <FaRegTrashAlt className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          eliminarObjeto={eliminarNoticia}
          id={idSeleccionado}
        />
      )}
    </div>
  );
};

export default TablaNoticias;
