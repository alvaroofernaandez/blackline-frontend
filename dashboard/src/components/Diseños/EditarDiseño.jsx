import { useEffect, useState } from "react";
import { useDiseños } from "../../hooks/useDiseños";
import { navigate } from "astro/virtual-modules/transitions-router.js";

const EditarDiseño = ({ id }) => {
  const { obtenerDiseñoPorId, actualizarDiseño } = useDiseños();
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    image: "",
    alto: "",
    ancho: "",
  });

  const obtenerDiseño = async () => {
    const diseño = await obtenerDiseñoPorId(id);
    if (diseño) {
      setFormData({
        titulo: diseño.titulo || "",
        descripcion: diseño.descripcion || "",
        precio: diseño.precio || "",
        image: diseño.image || "",
        alto: diseño.alto?.toString() || "",
        ancho: diseño.ancho?.toString() || "",
      });
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

    const success = await actualizarDiseño(id, diseño);
    if (success) {
      setTimeout(() => {
        navigate("/diseños");
      }, 1000);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="max-w-[30%] mx-auto mt-10">
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
          className="dark:bg-neutral-900 bg-neutral-600 text-white rounded-lg p-2 dark:hover:bg-neutral-950 hover:bg-neutral-500 transition-all w-full mt-10"
        >
          Editar Diseño
        </button>
      </form>
    </div>
  );
};

export default EditarDiseño;
