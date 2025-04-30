import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { parseISO, formatISO } from "date-fns";

const sorteoSchema = z.object({
  titulo: z.string().min(1, "El título es obligatorio."),
  descripcion: z.string().min(1, "La descripción es obligatoria."),
  fecha_fin: z.string().refine((fecha) => !isNaN(Date.parse(fecha)), {
    message: "Fecha inválida.",
  }),
  estado: z.string().optional(),
});

const EditarSorteo = ({ id }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fecha_fin: "",
    estado: "",
    ganador: "",
    premios: [],
    participantes: [],
  });

  const formatearFecha = (fecha) => {
    return formatISO(parseISO(fecha));
  };

  const obtenerSorteo = async () => {
    try {
      const respuesta = await fetch(
        `http://localhost:8000/api/sorteo_por_id/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${document.cookie
              .split("; ")
              .find((row) => row.startsWith("accessToken="))
              ?.split("=")[1]}`,
          },
        }
      );

      const datos = await respuesta.json();

      if (respuesta.ok && datos && typeof datos === "object") {
        setFormData({
          ...datos,
          premios: Array.isArray(datos.premios) ? datos.premios : [],
        });
      } else {
        throw new Error("Respuesta no válida del servidor");
      }
    } catch (error) {
      console.error("Error al obtener el sorteo:", error);
      toast.error("Error al cargar el sorteo.");
    }
  };

  useEffect(() => {
    if (id) obtenerSorteo();
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "premios" ? value.split("\n") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToValidate = {
        ...formData,
        fecha_fin: formatearFecha(formData.fecha_fin),
      };

      sorteoSchema.parse(dataToValidate);

      const respuesta = await fetch(
        `http://localhost:8000/api/sorteos/${id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie
              .split("; ")
              .find((row) => row.startsWith("accessToken="))
              ?.split("=")[1]}`,
          },
          body: JSON.stringify(dataToValidate),
        }
      );

      if (respuesta.ok) {
        toast.success("Sorteo editado con éxito.");
        setTimeout(() => {
          window.location.href = "/sorteos";
        }, 1000);
      } else {
        throw new Error("Error al editar el sorteo.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error al editar el sorteo.");
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="max-w-[50%] mx-auto mt-10">
        <label htmlFor="titulo" className="block mb-2">
          Título:
        </label>
        <input
          type="text"
          value={formData.titulo}
          id="titulo"
          className="border border-gray-300 text-black rounded-lg p-2 w-full mb-4"
          required
          onChange={handleChange}
        />

        <label htmlFor="descripcion" className="block mb-2">
          Descripción:
        </label>
        <textarea
          id="descripcion"
          value={formData.descripcion}
          className="border border-gray-300 text-black rounded-lg p-2 w-full mb-4"
          required
          onChange={handleChange}
        ></textarea>

        <label htmlFor="fecha_fin" className="block mb-2">
          Fecha de fin:
        </label>
        <input
          type="date"
          id="fecha_fin"
          value={formData.fecha_fin ? formData.fecha_fin.split("T")[0] : ""}
          className="border border-gray-300 text-black rounded-lg p-2 w-full mb-4"
          required
          onChange={handleChange}
        />

        <label htmlFor="premios" className="block mb-2">
          Premios (uno por línea):
        </label>
        <textarea
          id="premios"
          value={formData.premios.join("\n")}
          className="border border-gray-300 text-black rounded-lg p-2 w-full mb-4"
          onChange={handleChange}
        ></textarea>

        <button
          type="submit"
          className="bg-neutral-900 text-white rounded-lg p-2 hover:bg-neutral-800 w-full mt-10 transition-all"
        >
          Editar Sorteo
        </button>
      </form>
    </div>
  );
};

export default EditarSorteo;
