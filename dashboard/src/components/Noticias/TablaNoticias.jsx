import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { z } from "zod";
import { format } from "date-fns";
import Modal from "../General/Modal";

const noticiaSchema = z.object({
  id: z.string(),
  titulo: z.string().min(1, "El título es obligatorio"),
  descripcion: z.string().min(1, "La descripción es obligatoria"),
  fecha: z.string().refine((fecha) => !isNaN(Date.parse(fecha)), {
    message: "La fecha debe ser válida",
  }),
  imagen: z.string().url("La URL de la imagen debe ser válida"),
});

const TablaNoticias = () => {
  const [data, setData] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState(null);

  useEffect(() => {
    const obtenerNoticias = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("accessToken="))
          ?.split("=")[1];
        if (!token) {
          throw new Error("Token no encontrado en las cookies");
        }
        const response = await fetch("http://127.0.0.1:8000/api/noticias", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const noticias = await response.json();
        const validData = noticias.map((noticia) => noticiaSchema.parse(noticia));
        setData(validData);
      } catch (error) {
        toast.error("Error al cargar los datos: " + error.message);
        console.error("Error:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerNoticias();
  }, []);
  
  const formatearFecha = (fecha) => {
    return format(new Date(fecha), "dd 'de' MMMM 'de' yyyy");
  };

  const eliminarNoticia = async (id) => {
    try {
      const respuesta = await fetch(
        `http://127.0.0.1:8000/api/noticias/${id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie
              .split("; ")
              .find((row) => row.startsWith("accessToken="))
              ?.split("=")[1]}`,
          },
        }
      );
      if (respuesta.ok) {
        toast.success("Noticia eliminada con éxito.");
        setData(data.filter((noticia) => noticia.id !== id));
        setShowModal(false);
      } else {
        toast.error("Error al eliminar la noticia.");
      }
    } catch (e) {
      toast.error("Error al eliminar la noticia.");
    }
  };

  const abrirModal = (id) => {
    setNoticiaSeleccionada(id);
    setShowModal(true);
  };

  if (cargando) return <p className="text-center">Cargando noticias...</p>;
  if (data.length === 0)
    return <p className="text-red-500 text-center">No hay noticias actualmente, añade una noticia</p>;

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
            {data.map((fila, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 transition ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="p-3 text-gray-700">{fila.titulo}</td>
                <td className="p-3 text-gray-600 truncate max-w-xs">{fila.descripcion}</td>
                <td className="p-3 text-gray-600">{formatearFecha(fila.fecha)}</td>
                <td className="p-3">
                  <img
                    src={fila.imagen}
                    className="max-w-full h-auto rounded-lg border"
                    style={{ maxHeight: "80px", objectFit: "contain" }}
                    alt="Imagen de noticia"
                  />
                </td>
                <td className="flex gap-3 justify-center items-center p-8">
                  <button
                    className="bg-neutral-400 size-10 justify-items-center hover:scale-105 transition-all duration-500 text-white rounded-lg"
                    onClick={() => (window.location.href = `/actualizar-noticia/${fila.id}`)}
                  >
                    <AiFillEdit className="text-xl" />
                  </button>
                  <button
                    className="bg-neutral-800 size-10 justify-items-center hover:scale-105 transition-all duration-500 text-white rounded-lg"
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
          id={noticiaSeleccionada}
        />
      )}
    </div>
  );
};

export default TablaNoticias;
