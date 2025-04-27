import { useState } from "react";
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

const CrearDiseño = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    image: "",
    alto: "",
    ancho: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const enviar = async (e) => {
    e.preventDefault();

    const diseño = {
      titulo: formData.titulo.trim(),
      descripcion: formData.descripcion.trim(),
      precio: formData.precio.trim(),
      image: formData.image.trim(),
      alto: parseFloat(formData.alto),
      ancho: parseFloat(formData.ancho),
    };

    try {
      DiseñoSchema.parse(diseño);

      const respuesta = await fetch("http://127.0.0.1:8000/api/diseños/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(diseño),
      });

      if (respuesta.ok) {
        toast.success("Diseño creado con éxito.");
        setTimeout(() => {
          window.location.href = "/diseños";
        }, 1000);
      } else {
        const errorData = await respuesta.json();
        toast.error(
          "Error al crear el diseño: " +
            (errorData.non_field_errors
              ? errorData.non_field_errors.join(", ")
              : "Error desconocido.")
        );
        throw new Error("Error al crear el diseño.");
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
      <h2 className="text-4xl font-bold mb-4 text-center w-full">Crear Diseño</h2>
      <hr />
      <form onSubmit={enviar} className="max-w-[50%] mx-auto mt-20">
        <label htmlFor="titulo" className="block mb-2">
          Título:
        </label>
        <input
          type="text"
          id="titulo"
          name="titulo"
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
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg text-black p-2 w-full mb-4"
          required
        ></textarea>

        <label htmlFor="precio" className="block mb-2">
          Precio:
        </label>
        <input
          type="text"
          id="precio"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg text-black p-2 w-full mb-4"
        />

        <label htmlFor="image" className="block mb-2">
          URL de la imagen:
        </label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg text-black p-2 w-full mb-4"
        />

        <label htmlFor="alto" className="block mb-2">
          Alto (cm):
        </label>
        <input
          type="number"
          id="alto"
          name="alto"
          value={formData.alto}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg text-black p-2 w-full mb-4"
          required
        />

        <label htmlFor="ancho" className="block mb-2">
          Ancho (cm):
        </label>
        <input
          type="number"
          id="ancho"
          name="ancho"
          value={formData.ancho}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg text-black p-2 w-full mb-4"
          required
        />

        <button
          type="submit"
          className="bg-neutral-900 text-white rounded-lg p-2 hover:bg-neutral-800 transition-all w-full"
        >
          Crear Diseño
        </button>
      </form>
    </div>
  );
};

export default CrearDiseño;
