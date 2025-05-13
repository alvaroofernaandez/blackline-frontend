import { useEffect, useState } from "react";
import { useCitas } from "../../hooks/useCitas";
import { navigate } from "astro/virtual-modules/transitions-router.js";

const EditarCita = ({ id }) => {
  const { obtenerCitaPorId, actualizarCita } = useCitas();
  const [formData, setFormData] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (id) {
      obtenerCitaPorId(id).then((cita) => {
        if (cita) setFormData(cita);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    const success = await actualizarCita(id, formData);
    if (success) navigate("/citas");
    else setCargando(false);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="max-w-[90%] md:max-w-[70%] lg:max-w-[30%] mx-auto mt-20 animate-fade-in">
        <label htmlFor="fecha" className="block mb-2">Fecha:</label>
        <input
          type="date"
          id="fecha"
          value={formData.fecha?.split("T")[0] || ""}
          className="border border-gray-300 text-black rounded-lg p-2 w-full mb-4"
          required
          onChange={handleChange}
        />

        <label htmlFor="hora" className="block mb-2">Hora:</label>
        <input
          type="time"
          id="hora"
          value={formData.hora || ""}
          className="border border-gray-300 text-black rounded-lg p-2 w-full mb-4"
          required
          onChange={handleChange}
        />

        <label htmlFor="estado" className="block mb-2">Estado:</label>
        <select
          id="estado"
          value={formData.estado || ""}
          className="border border-gray-300 text-black rounded-lg p-2 w-full mb-4"
          required
          onChange={handleChange}
        >
          <option value="pendiente">Pendiente</option>
          <option value="confirmada">Confirmada</option>
          <option value="completada">Completada</option>
          <option value="cancelada">Cancelada</option>
        </select>

        <button
          type="submit"
          className="dark:bg-neutral-900 bg-neutral-600 text-white rounded-lg p-2 dark:hover:bg-neutral-950 hover:bg-neutral-500 transition-all w-full"
          disabled={cargando}
        >
          {cargando ? "Cargando..." : "Editar Cita"}
        </button>
      </form>
    </div>
  );
};

export default EditarCita;
