import { useState } from "react";
import { toast } from "sonner";
import { useNoticias } from "../../hooks/useNoticias";

const ActualizarNoticia = ({ id }) => {
  const { actualizarNoticia, obtenerNoticiaPorId } = useNoticias();
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    imagen: "",
    fecha: "",
  });

  // Cargar la noticia antes de renderizar el componente
  if (id && !formData.titulo) {
    obtenerNoticiaPorId(id).then((noticia) => {
      if (noticia) {
        setFormData(noticia);
      }
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const actualizar = async (e) => {
    e.preventDefault();
    const exito = await actualizarNoticia(id, formData);
    if (exito) {
      setTimeout(() => {
        window.location.href = "/noticias";
      }, 500);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={actualizar} className="max-w-[30%] mx-auto mt-20">
        <label htmlFor="titulo" className="block mb-2">
          Título:
        </label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          className="border border-gray-300 text-black rounded-lg p-2 w-full mb-4"
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
          className="border border-gray-300 text-black rounded-lg p-2 w-full mb-4"
          required
        ></textarea>

        <label htmlFor="imagen" className="block mb-2">
          Imagen URL:
        </label>
        <input
          id="imagen"
          name="imagen"
          value={formData.imagen}
          onChange={handleChange}
          className="border border-gray-300 text-black rounded-lg p-2 w-full mb-4"
        />

        <button
          type="submit"
          className="dark:bg-neutral-900 bg-neutral-600 text-white rounded-lg p-2 dark:hover:bg-neutral-950 hover:bg-neutral-500 w-full mt-10 transition-all"
        >
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default ActualizarNoticia;
