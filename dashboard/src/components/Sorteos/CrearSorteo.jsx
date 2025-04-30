import React from "react";
import { toast } from "sonner";
import { z } from "zod";
import { format, parseISO, isAfter } from "date-fns";

const CrearSorteo = () => {
  const sorteoSchema = z.object({
    titulo: z.string().min(1, "El título es obligatorio."),
    descripcion: z.string().min(1, "La descripción es obligatoria."),
    fecha_inicio: z.string(),
    fecha_fin: z.string().refine(
      (fecha_fin) => isAfter(parseISO(fecha_fin), new Date()),
      { message: "La fecha de fin debe ser posterior a la fecha actual." }
    ),
    estado: z.string(),
    premios: z.array(z.string()),
  });

  const enviar = async (e) => {
    e.preventDefault();

    const sorteo = {
      titulo: document.getElementById("titulo").value.trim(),
      descripcion: document.getElementById("descripcion").value.trim(),
      fecha_inicio: format(new Date(), "yyyy-MM-dd") + " 00:00:00",
      fecha_fin: document.getElementById("fecha_fin").value + " 23:59:00",
      estado: "activo",
      premios: document
        .getElementById("premios")
        .value.split("\n")
        .map((p) => p.trim())
        .filter((p) => p.length > 0),
    };

    try {
      sorteoSchema.parse(sorteo);

      const respuesta = await fetch("http://127.0.0.1:8000/api/sorteos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie
            .split("; ")
            .find((row) => row.startsWith("accessToken="))
            ?.split("=")[1]}`,
        },
        body: JSON.stringify(sorteo),
      });

      if (respuesta.ok) {
        toast.success("Sorteo creado con éxito.");
        setTimeout(() => {
          window.location.href = "/sorteos";
        }, 1000);
      } else {
        const errorData = await respuesta.json();
        toast.error(
          "Error al crear el sorteo: " +
            (errorData.non_field_errors
              ? errorData.non_field_errors.join(", ")
              : "Error desconocido.")
        );
        throw new Error("Error al crear el sorteo.");
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
