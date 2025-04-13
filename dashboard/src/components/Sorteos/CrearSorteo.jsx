import React, { useState } from "react";
import Alert from "../Alert";

const CrearSorteo = () => {
  const [alerta, setAlerta] = useState(null);

  const enviar = async (e) => {
    e.preventDefault();

    const sorteo = {
      titulo: document.getElementById("titulo").value.trim(),
      descripcion: document.getElementById("descripcion").value.trim(),
      fecha_inicio: document.getElementById("fecha_inicio").value + " 00:00:00",
      fecha_fin: document.getElementById("fecha_fin").value + " 23:59:00",
      estado: document.getElementById("estado").value.trim(),
      ganador: document.getElementById("ganador").value.trim() || null,
      premios: document
        .getElementById("premios")
        .value.split("\n")
        .map((p) => p.trim())
        .filter((p) => p.length > 0),
      participantes: document.getElementById("participante").value.trim()
        ? [
            {
              instagram_username: document
                .getElementById("participante")
                .value.trim(),
            },
          ]
        : [],
    };

    try {
      const respuesta = await fetch("http://127.0.0.1:8000/api/sorteos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sorteo),
      });

      if (respuesta.ok) {
        setAlerta({ type: "success", message: "Sorteo creado con éxito." });
        // setTimeout(() => {
        //   window.location.href = "/Noticias";
        // }, 2000);
      } else {
        throw new Error("Error al crear el sorteo.");
      }
    } catch (error) {
      console.error("Error:", error);
      setAlerta({ type: "error", message: "Error al crear el sorteo." });
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
      <h2 className="text-2xl font-bold mb-4">Crear Sorteo</h2>
      <form onSubmit={enviar}>
        <label htmlFor="titulo" className="block mb-2">
          Título:
        </label>
        <input
          type="text"
          id="titulo"
          className="border border-gray-300 p-2 w-full mb-4"
          required
        />

        <label htmlFor="descripcion" className="block mb-2">
          Descripción:
        </label>
        <textarea
          id="descripcion"
          className="border border-gray-300 p-2 w-full mb-4"
          required
        ></textarea>

        <label htmlFor="fecha_inicio" className="block mb-2">
          Fecha de inicio:
        </label>
        <input
          type="date"
          id="fecha_inicio"
          className="border border-gray-300 p-2 w-full mb-4"
          required
        />

        <label htmlFor="fecha_fin" className="block mb-2">
          Fecha de fin:
        </label>
        <input
          type="date"
          id="fecha_fin"
          className="border border-gray-300 p-2 w-full mb-4"
          required
        />

        <label htmlFor="estado" className="block mb-2">
          Estado:
        </label>
        <select id="estado" className="border border-gray-300 p-2 w-full mb-4">
          <option value=""></option>
          <option value="finalizado">finalizado</option>
        </select>

        <label htmlFor="ganador" className="block mb-2">
          Ganador (usuario de Instagram):
        </label>
        <input
          type="text"
          id="ganador"
          className="border border-gray-300 p-2 w-full mb-4"
        />

        <label htmlFor="premios" className="block mb-2">
          Premios (uno por línea):
        </label>
        <textarea
          id="premios"
          className="border border-gray-300 p-2 w-full mb-4"
        ></textarea>

        <label htmlFor="participante" className="block mb-2">
          Participante (usuario de Instagram):
        </label>
        <input
          type="text"
          id="participante"
          className="border border-gray-300 p-2 w-full mb-4"
        />

        <button
          type="submit"
          className="bg-blue-950 text-white rounded-lg p-2 hover:bg-blue-700 transition-colors"
        >
          Crear Sorteo
        </button>
      </form>
    </div>
  );
};

export default CrearSorteo;
