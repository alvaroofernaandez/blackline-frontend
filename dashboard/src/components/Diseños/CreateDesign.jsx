import { useState } from "react";
import { useDiseños } from "../../hooks/useDiseños";
import { useCorreos } from "../../hooks/useCorreos"; 
import { navigate } from "astro/virtual-modules/transitions-router.js";

const CrearDiseño = () => {
  const { crearDiseño } = useDiseños();
  const { enviarCorreosMasivos } = useCorreos(); 
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    image: "",
    alto: "",
    ancho: "",
    duracion: "2",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const enviar = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const diseño = {
      titulo: formData.titulo.trim(),
      descripcion: formData.descripcion.trim(),
      precio: formData.precio.trim(),
      image: formData.image.trim(),
      alto: parseFloat(formData.alto),
      ancho: parseFloat(formData.ancho),
      duracion: formData.duracion ? parseFloat(formData.duracion) : 0,
    };

    const success = await crearDiseño(diseño);
    if (success) {
      // Enviar correos masivos
      await enviarCorreosMasivos({
        asunto: "¡Nuevos diseños disponibles!",
        mensaje: `Se ha añadido un nuevo diseño: ${diseño.titulo}. Visita nuestra página para más detalles.`,
        nombre: "Equipo de Diseños",
      });

      setTimeout(() => {
        navigate("/diseños");
      }, 1000);
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={enviar} className="max-w-[90%] md:max-w-[70%] lg:max-w-[30%] mx-auto mt-20 animate-fade-in">
        <label htmlFor="titulo" className="block mb-2">
          Título:
        </label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          placeholder="Escribe el título aquí..."
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
          placeholder="Escribe la descripción aquí..."
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
          placeholder="Escribe el precio aquí..."
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
          placeholder="Escribe la URL de la imagen aquí..."
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
          placeholder="Escribe el alto aquí..."
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
          placeholder="Escribe el ancho aquí..."
          value={formData.ancho}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg text-black p-2 w-full mb-4"
          required
        />

        <button
          type="submit"
          className="dark:bg-neutral-900 bg-neutral-600 text-white rounded-lg p-2 dark:hover:bg-neutral-950 hover:bg-neutral-500 transition-all w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Cargando..." : "Crear Diseño"}
        </button>
      </form>
    </div>
  );
};

export default CrearDiseño;
