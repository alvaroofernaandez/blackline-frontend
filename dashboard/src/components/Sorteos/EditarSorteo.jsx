import React, { useEffect, useState } from "react";
import Alert from "../Alert"; // Asegurate que la ruta sea correcta

const EditarSorteo = ({ id }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fecha_inicio: "",
    fecha_fin: "",
    estado: "",
    ganador: "",
    premios: [],
    participantes: [],
  });

  const [alerta, setAlerta] = useState(null);

  const obtenerSorteo = async () => {
    try {
      const respuesta = await fetch(
        `http://localhost:8000/api/sorteo_por_id/${id}/`
      );

      const datos = await respuesta.json();
      console.log("Datos recibidos:", datos); // 👈 Ver qué estás recibiendo

      if (respuesta.ok && datos && typeof datos === "object") {
        setFormData({
          ...datos,
          premios: Array.isArray(datos.premios) ? datos.premios : [],
        });
      } else {
        throw new Error("Respuesta no válida del servidor");
      }
    } catch (error) {
      console.error("Error al obtener el sorteo:", error);
      setAlerta({ type: "error", message: "Error al cargar el sorteo." });
    }
  };

  useEffect(() => {
    obtenerSorteo();
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "premios" ? value.split("\n") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch(
        `http://localhost:8000/api/sorteos/${id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (respuesta.ok) {
        setAlerta({ type: "success", message: "Sorteo editado con éxito." });
        setTimeout(() => {
          window.location.href = "/Sorteos";
        }, 2000);
      } else {
        throw new Error("Error al editar el sorteo.");
      }
    } catch (error) {
      console.error(error);
      setAlerta({ type: "error", message: "Error al editar el sorteo." });
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
      <h2 className="text-4xl text-center font-bold mb-4">Editar Sorteo</h2>
      <hr />
      <form onSubmit={handleSubmit} className="max-w-[50%] mx-auto mt-10">
        <label htmlFor="titulo" className="block mb-2">
          Título:
        </label>
        <input
          type="text"
          value={formData.titulo}
          id="titulo"
          className="border border-gray-300  text-black rounded-lg p-2 w-full mb-4"
          required
          onChange={handleChange}
        />

        <label htmlFor="descripcion" className="block mb-2">
          Descripción:
        </label>
        <textarea
          id="descripcion"
          value={formData.descripcion}
          className="border border-gray-300 text-black rounded-lg p-2 w-full mb-4"
          required
          onChange={handleChange}
        ></textarea>

        <label htmlFor="fecha_inicio" className="block mb-2">
          Fecha de inicio:
        </label>
        <input
          type="date"
          id="fecha_inicio"
          value={
            formData.fecha_inicio ? formData.fecha_inicio.split("T")[0] : ""
          }
          className="border border-gray-300 text-black rounded-lg p-2 w-full mb-4"
          required
          onChange={handleChange}
        />

        <label htmlFor="fecha_fin" className="block mb-2">
          Fecha de fin:
        </label>
        <input
          type="date"
          id="fecha_fin"
          value={formData.fecha_fin ? formData.fecha_fin.split("T")[0] : ""}
          className="border border-gray-300 text-black rounded-lg p-2 w-full mb-4"
          required
          onChange={handleChange}
        />

        <label htmlFor="premios" className="block mb-2">
          Premios (uno por línea):
        </label>
        <textarea
          id="premios"
          value={formData.premios.join("\n")}
          className="border border-gray-300 text-black rounded-lg p-2 w-full mb-4"
          onChange={handleChange}
        ></textarea>

        <button
          type="submit"
          className="bg-neutral-900 text-white rounded-lg p-2 hover:bg-neutral-800 w-full mt-10 transition-all"
        >
          Editar Sorteo
        </button>
      </form>
    </div>
  );
};

export default EditarSorteo;
