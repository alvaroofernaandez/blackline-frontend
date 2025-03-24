import React, { useState } from "react";
import Alert from "./Alert";

const AnadirNoticia = () => {
  const [alerta, setAlerta] = useState(null);

  const enviar = async (e) => {
    e.preventDefault();
    const noticia = {
      titulo: document.getElementById("titulo").value,
      descripcion: document.getElementById("descripcion").value,
      imagen: document.getElementById("imagen").value,
    };
    try {
      const respuesta = await fetch("http://127.0.0.1:8000/noticias/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noticia),
      });
      if (respuesta.ok) {
        setAlerta({ type: "success", message: "Noticia enviada con éxito." });
        setTimeout(() => {
          window.location.href = "/Noticias";
        }, 2000);
      } else {
        throw new Error("Error al enviar la noticia.");
      }
    } catch (error) {
      console.error("Error al enviar la noticia:", error);
      setAlerta({ type: "error", message: "Error al enviar la noticia." });
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
      <h2 className="text-2xl font-bold mb-4">Añadir Noticia</h2>
      <form onSubmit={enviar}>
        <label htmlFor="titulo" className="block mb-2">
          Título:
        </label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          className="border border-gray-300 p-2 w-full mb-4"
          required
        />

        <label htmlFor="descripcion" className="block mb-2">
          Descripción:
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
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
          className="border border-gray-300 p-2 w-full mb-4"
          required
        />

        <label htmlFor="imagen" className="block mb-2">
          Imagen URL:
        </label>
        <input
          id="imagen"
          name="imagen"
          className="border border-gray-300 p-2 w-full mb-4"
        />

        <button
          type="submit"
          className="bg-blue-950 text-white rounded-lg p-2 hover:bg-blue-700 transition-colors"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default AnadirNoticia;
