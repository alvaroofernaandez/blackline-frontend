import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const DiseñoSchema = z.object({
  titulo: z.string().min(1, "El título es obligatorio."),
  descripcion: z.string().min(1, "La descripción es obligatoria."),
  precio: z.string().optional(),
  image: z.string().optional(),
  alto: z.number().min(1, "El alto debe ser un número positivo."),
  ancho: z.number().min(1, "El ancho debe ser un número positivo."),
});

const EditarDiseño = ({ id }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    image: "",
    alto: "",
    ancho: "",
  });

  const obtenerDiseño = async () => {
    try {
      const respuesta = await fetch(`http://localhost:8000/api/diseños/${id}/`);
      const datos = await respuesta.json();

      if (respuesta.ok && datos && typeof datos === "object") {
        setFormData({
          titulo: datos[0].titulo || "",
          descripcion: datos[0].descripcion || "",
          precio: datos[0].precio || "",
          image: datos[0].image || "",
          alto: datos[0].alto?.toString() || "",
          ancho: datos[0].ancho?.toString() || "",
        });
      } else {
        throw new Error("Respuesta no válida del servidor");
      }
    } catch (error) {
      console.error("Error al obtener el diseño:", error);
      toast.error("Error al cargar el diseño.");
    }
  };

  useEffect(() => {
    obtenerDiseño();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const diseño = {
      titulo: formData.titulo.trim(),
      descripcion: formData.descripcion.trim(),
      precio: formData.precio.trim(),
      image: formData.image.trim(),
      alto: parseInt(formData.alto, 10),
      ancho: parseInt(formData.ancho, 10),
    };

    try {
      DiseñoSchema.parse(diseño);

      const respuesta = await fetch(`http://localhost:8000/api/diseño_por_id/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(diseño),
      });

      if (respuesta.ok) {
        toast.success("Diseño editado con éxito.");
        setTimeout(() => {
          window.location.href = "/diseños";
        }, 1000);
      } else {
        const errorData = await respuesta.json();
        toast.error(
          "Error al editar el diseño: " +
            (errorData.non_field_errors
              ? errorData.non_field_errors.join(", ")
              : "Error desconocido.")
        );
        throw new Error("Error al editar el diseño.");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => toast.error(err.message));
      } else {
        console.error("Error:", error);
      }
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
          name="titulo"
          value={formData.titulo}
          className="border border-gray-300 text-black rounded-lg p-2 w-full mb-4"
          required
          onChange={handleChange}
        />

        <label htmlFor="descripcion" className="block mb-2">
          Descripción:
        </label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          className="border border-gray-300 text-black rounded-lg p-2 w-full mb-4"
          required
          onChange={handleChange}
        ></textarea>

        <label htmlFor="precio" className="block mb-2">
          Precio:
        </label>
        <input
          type="text"
          name="precio"
          value={formData.precio}
          className="border border-gray-300 text-black rounded-lg p-2 w-full mb-4"
          onChange={handleChange}
        />

        <label htmlFor="image" className="block mb-2">
          URL de la imagen:
        </label>
        <input
          type="text"
          name="image"
          value={formData.image}
          className="border border-gray-300 text-black rounded-lg p-2 w-full mb-4"
          onChange={handleChange}
        />

        <label htmlFor="alto" className="block mb-2">
          Alto (cm):
        </label>
        <input
          type="number"
          name="alto"
          value={formData.alto}
          className="border border-gray-300 text-black rounded-lg p-2 w-full mb-4"
          required
          onChange={handleChange}
        />

        <label htmlFor="ancho" className="block mb-2">
          Ancho (cm):
        </label>
        <input
          type="number"
          name="ancho"
          value={formData.ancho}
          className="border border-gray-300 text-black rounded-lg p-2 w-full mb-4"
          required
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-neutral-900 text-white rounded-lg p-2 hover:bg-neutral-800 w-full mt-10 transition-all"
        >
          Editar Diseño
        </button>
      </form>
    </div>
  );
};

export default EditarDiseño;
