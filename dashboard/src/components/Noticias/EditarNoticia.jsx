import { useState, useEffect } from "react";
import { toast } from "sonner";

const ActualizarNoticia = ({ id }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    imagen: "",
    fecha: "",
  });

  const formatearFecha = (fecha) => {
    if (fecha.includes("T")) return fecha;
    return `${fecha}T00:00:00`;
  };

  useEffect(() => {
    const obtenerNoticia = async () => {
      try {
        const respuesta = await fetch(`http://127.0.0.1:8000/api/noticias_por_id/${id}/`);
        if (respuesta.ok) {
          const datos = await respuesta.json();
          setFormData(datos);
        } else {
          throw new Error("Error al cargar la noticia.");
        }
      } catch (error) {
        console.error(error);
        toast.error("No se pudo cargar la noticia.");
      }
    };

    if (id) obtenerNoticia();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const actualizar = async (e) => {
    e.preventDefault();
    try {
      formData.fecha = formatearFecha(formData.fecha);
      const respuesta = await fetch(`http://127.0.0.1:8000/api/noticias/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (respuesta.ok) {
        toast.success("Noticia actualizada con éxito.");
        setTimeout(() => {
          window.location.href = "/noticias";
        }, 500);
      } else {
        console.error("Error al actualizar la noticia:", respuesta.statusText);
        console.log("Datos enviados:", formData);
        throw new Error("Error al actualizar la noticia.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar la noticia.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-4xl text-center font-bold mb-4">Actualizar Noticia</h2>
      <hr />
      <form onSubmit={actualizar} className="max-w-[50%] mx-auto mt-20">
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
          className="bg-neutral-900 text-white rounded-lg p-2 hover:bg-neutral-800 w-full mt-10 transition-all"
        >
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default ActualizarNoticia;
