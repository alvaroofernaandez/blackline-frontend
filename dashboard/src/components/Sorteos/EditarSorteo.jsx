import React, { useEffect, useState } from "react";

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

  const obtenerSorteo = async () => {
    try {
      const respuesta = await fetch(
        `http://localhost:8000/api/sorteo_por_id/${id}/`
      );
      if (respuesta.ok) {
        const datos = await respuesta.json();
        setFormData(datos);
      } else {
        throw new Error("Error al cargar el sorteo.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerSorteo();
  }, [id]);

  const [alerta, setAlerta] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "premios" ? value.split("\n") : value,
    }));
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
      <h2 className="text-2xl font-bold mb-4">Editar Sorteo</h2>
      <form>
        <label htmlFor="titulo" className="block mb-2">
          Título:
        </label>
        <input
          type="text"
          value={formData.titulo}
          id="titulo"
          className="border border-gray-300 p-2 w-full mb-4"
          required
          onChange={handleChange}
        />

        <label htmlFor="descripcion" className="block mb-2">
          Descripción:
        </label>
        <textarea
          id="descripcion"
          value={formData.descripcion}
          className="border border-gray-300 p-2 w-full mb-4"
          required
          onChange={handleChange}
        ></textarea>

        <label htmlFor="fecha_inicio" className="block mb-2">
          Fecha de inicio:
        </label>
        <input
          type="date"
          id="fecha_inicio"
          value={formData.fecha_inicio.split("T")[0]}
          className="border border-gray-300 p-2 w-full mb-4"
          required
          onChange={handleChange}
        />

        <label htmlFor="fecha_fin" className="block mb-2">
          Fecha de fin:
        </label>
        <input
          type="date"
          id="fecha_fin"
          value={formData.fecha_fin.split("T")[0]}
          className="border border-gray-300 p-2 w-full mb-4"
          required
          onChange={handleChange}
        />

        {/**
                <label htmlFor="estado" className="block mb-2">
                    Estado:
                </label>
                <select
                    id="estado"
                    value={formData.estado}
                    className="border border-gray-300 p-2 w-full mb-4"
                    onChange={handleChange}
                >
                    <option value=""></option>
                    <option value="finalizado">finalizado</option>
                </select>



                <label htmlFor="ganador" className="block mb-2">
                    Ganador (usuario de Instagram):
                </label>
                <input
                    type="text"
                    id="ganador"
                    value={formData.ganador}
                    className="border border-gray-300 p-2 w-full mb-4"
                    onChange={handleChange}
                />
*/}

        <label htmlFor="premios" className="block mb-2">
          Premios (uno por línea):
        </label>
        <textarea
          id="premios"
          value={formData.premios.join("\n")}
          className="border border-gray-300 p-2 w-full mb-4"
          onChange={handleChange}
        ></textarea>

        {/*
        <label htmlFor="participante" className="block mb-2">
          Participante (usuario de Instagram):
        </label>
        <input
          type="text"
          id="participante"
          value={formData.participantes
            .map((p) => p.instagram_username)
            .join(", ")}
          className="border border-gray-300 p-2 w-full mb-4"
          readOnly
        />
    */}

        <button
          type="submit"
          className="bg-blue-950 text-white rounded-lg p-2 hover:bg-blue-700 transition-colors"
        >
          Editar Sorteo
        </button>
      </form>
    </div>
  );
};

export default EditarSorteo;
