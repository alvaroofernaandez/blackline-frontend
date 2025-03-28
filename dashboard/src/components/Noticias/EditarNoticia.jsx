import React, { useState, useEffect } from "react";
import Alert from "../Alert";

const ActualizarNoticia = ({ id }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    imagen: "",
    fecha: "",
  });
  const [alerta, setAlerta] = useState(null);

  useEffect(() => {
    const obtenerNoticia = async () => {
      try {
        const respuesta = await fetch(`http://127.0.0.1:8000/api/noticias/${id}/`);
        if (respuesta.ok) {
          const datos = await respuesta.json();
          setFormData(datos);
        } else {
          throw new Error("Error al cargar la noticia.");
        }
      } catch (error) {
        console.error(error);
        setAlerta({ type: "error", message: "No se pudo cargar la noticia." });
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
      const respuesta = await fetch(`http://127.0.0.1:8000/api/noticias/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (respuesta.ok) {
        setAlerta({
          type: "success",
          message: "Noticia actualizada con éxito.",
        });
        setTimeout(() => {
          window.location.href = "/Noticias";
        }, 2000);
      } else {
        throw new Error("Error al actualizar la noticia.");
      }
    } catch (error) {
      console.error(error);
      setAlerta({ type: "error", message: "Error al actualizar la noticia." });
    }
  };

  return (
    <div className="p-4">
      {alerta && (
        <Alert
          type={alerta.type}
          message={alerta.message}
          onClose={() => setAlerta(null)}
        />
      )}
      <h2 className="text-2xl font-bold mb-4">Actualizar Noticia</h2>
      <form onSubmit={actualizar}>
        <label htmlFor="titulo" className="block mb-2">
          Título:
        </label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full mb-4"
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
          className="border border-gray-300 p-2 w-full mb-4"
          required
        ></textarea>

        <label htmlFor="fecha" className="block mb-2">
          Fecha:
        </label>
        <input
          type="date"
          id="fecha"
          name="fecha"
          value={formData.fecha.split("T")[0]}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full mb-4"
          required
        />

        <label htmlFor="imagen" className="block mb-2">
          Imagen URL:
        </label>
        <input
          id="imagen"
          name="imagen"
          value={formData.imagen}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full mb-4"
        />

        <button
          type="submit"
          className="bg-blue-950 text-white rounded-lg p-2 hover:bg-blue-700 transition-colors"
        >
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default ActualizarNoticia;
