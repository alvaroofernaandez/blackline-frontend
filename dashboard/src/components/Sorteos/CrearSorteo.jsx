import React from "react";
import { toast } from "sonner";

const CrearSorteo = () => {
  const enviar = async (e) => {
    e.preventDefault();

    const sorteo = {
      titulo: document.getElementById("titulo").value.trim(),
      descripcion: document.getElementById("descripcion").value.trim(),
      fecha_inicio: new Date().toISOString().split("T")[0] + " 00:00:00",
      fecha_fin: document.getElementById("fecha_fin").value + " 23:59:00",
      estado: "activo",
      premios: document
      .getElementById("premios")
      .value.split("\n")
      .map((p) => p.trim())
      .filter((p) => p.length > 0),
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
        toast.success("Sorteo creado con éxito.");
        setTimeout(() => {
          window.location.href = "/sorteos";
        }, 2000);
      } else {
        toast.error("Error al crear el sorteo.");
        throw new Error("Error al crear el sorteo.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al crear el sorteo.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold mb-4 text-center w-full">Crear Sorteo</h2>
      <hr />
      <form onSubmit={enviar} className="max-w-[50%] mx-auto mt-20">
        <label htmlFor="titulo" className="block mb-2 ">
          Título:
        </label>
        <input
          type="text"
          id="titulo"
          className="border border-gray-300 p-2 rounded-lg text-black w-full mb-4"
          required
        />

        <label htmlFor="descripcion" className="block mb-2">
          Descripción:
        </label>
        <textarea
          id="descripcion"
          className="border border-gray-300 rounded-lg text-black p-2 w-full mb-4"
          required
        ></textarea>
        
        <label htmlFor="fecha_fin" className="block mb-2">
          Fecha de fin:
        </label>
        <input
          type="date"
          id="fecha_fin"
          className="border border-gray-300 rounded-lg text-black p-2 w-full mb-4"
          required
        />

        <label htmlFor="premios" className="block mb-2">
          Premios (uno por línea):
        </label>
        <textarea
          id="premios"
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
