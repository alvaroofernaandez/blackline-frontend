import { useSorteos } from "../../hooks/useSorteos";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { format, isAfter, parseISO } from "date-fns";

const CrearSorteo = () => {
  const { crearSorteo } = useSorteos();

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fecha_fin: "",
    premios: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const enviar = async (e) => {
    e.preventDefault();

    const sorteo = {
      titulo: formData.titulo.trim(),
      descripcion: formData.descripcion.trim(),
      fecha_inicio: format(new Date(), "yyyy-MM-dd") + " 00:00:00",
      fecha_fin: formData.fecha_fin + " 23:59:00",
      estado: "activo",
      premios: formData.premios
        .split("\n")
        .map((p) => p.trim())
        .filter((p) => p.length > 0),
    };

    const sorteoSchema = z.object({
      titulo: z.string().min(1, "El título es obligatorio."),
      descripcion: z.string().min(1, "La descripción es obligatoria."),
      fecha_inicio: z.string(),
      fecha_fin: z.string().refine(
        (fecha_fin) => isAfter(parseISO(fecha_fin), new Date()),
        { message: "La fecha de fin debe ser posterior a la fecha actual." }
      ),
      estado: z.string(),
      premios: z.array(z.string()),
    });

    try {
      sorteoSchema.parse(sorteo); 
      const exito = await crearSorteo(sorteo);
      if (exito) {
        setFormData({ titulo: "", descripcion: "", fecha_fin: "", premios: "" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => toast.error(err.message));
      } else {
        toast.error("Error al crear el sorteo.");
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={enviar} className="max-w-[50%] mx-auto mt-20">
        <label htmlFor="titulo" className="block mb-2">
          Título:
        </label>
        <input
          type="text"
          id="titulo"
          value={formData.titulo}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-lg text-black w-full mb-4"
          required
        />

        <label htmlFor="descripcion" className="block mb-2">
          Descripción:
        </label>
        <textarea
          id="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg text-black p-2 w-full mb-4"
          required
        ></textarea>

        <label htmlFor="fecha_fin" className="block mb-2">
          Fecha de fin:
        </label>
        <input
          type="date"
          id="fecha_fin"
          value={formData.fecha_fin}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg text-black p-2 w-full mb-4"
          required
        />

        <label htmlFor="premios" className="block mb-2">
          Premios (uno por línea):
        </label>
        <textarea
          id="premios"
          value={formData.premios}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg text-black p-2 w-full mb-4"
        ></textarea>

        <button
          type="submit"
          className="bg-neutral-900 text-white rounded-lg p-2 hover:bg-neutral-800 transition-all w-full"
        >
          Crear Sorteo
        </button>
      </form>
    </div>
  );
};

export default CrearSorteo;
