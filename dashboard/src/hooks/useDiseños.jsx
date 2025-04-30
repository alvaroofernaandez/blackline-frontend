import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const diseñoSchema = z.object({
  id: z.number().optional(),
  titulo: z.string().min(1, "El título es obligatorio."),
  descripcion: z.string().min(1, "La descripción es obligatoria."),
  precio: z.string().optional(),
  image: z.string().optional(),
  alto: z.number().min(1, "El alto debe ser un número positivo."),
  ancho: z.number().min(1, "El ancho debe ser un número positivo."),
});

export const useDiseños = () => {
  const [diseños, setDiseños] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDiseños = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      if (!token) throw new Error("Token no encontrado");

      const res = await fetch("http://127.0.0.1:8000/api/diseños/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const raw = await res.json();
      const validados = raw.map((diseño) => diseñoSchema.parse(diseño));
      setDiseños(validados);
    } catch (err) {
      toast.error("Error cargando diseños: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const obtenerDiseñoPorId = async (id) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      if (!token) throw new Error("Token no encontrado");

      const res = await fetch(`http://127.0.0.1:8000/api/diseños/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const datos = await res.json();
        return diseñoSchema.parse(datos[0]);
      } else {
        throw new Error("Error al cargar el diseño.");
      }
    } catch (err) {
      toast.error("No se pudo cargar el diseño.");
      console.error(err);
      return null;
    }
  };

  const crearDiseño = async (diseño) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      if (!token) throw new Error("Token no encontrado");

      const validation = diseñoSchema.safeParse(diseño);
      if (!validation.success) {
        const errorMessages = validation.error.errors.map((err) => err.message);
        errorMessages.forEach((msg) => toast.error(msg));
        return false;
      }

      const res = await fetch("http://127.0.0.1:8000/api/diseños/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(validation.data),
      });

      if (res.ok) {
        toast.success("Diseño creado con éxito");
        fetchDiseños();
        return true;
      } else {
        toast.error("Error al crear el diseño");
        return false;
      }
    } catch (err) {
      toast.error("Error al crear el diseño: " + err.message);
      console.error(err);
      return false;
    }
  };

  const actualizarDiseño = async (id, diseño) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      if (!token) throw new Error("Token no encontrado");

      const validation = diseñoSchema.safeParse(diseño);
      if (!validation.success) {
        const errorMessages = validation.error.errors.map((err) => err.message);
        errorMessages.forEach((msg) => toast.error(msg));
        return false;
      }

      const res = await fetch(`http://127.0.0.1:8000/api/diseño_por_id/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(validation.data),
      });

      if (res.ok) {
        toast.success("Diseño actualizado con éxito");
        fetchDiseños();
        return true;
      } else {
        toast.error("Error al actualizar el diseño");
        return false;
      }
    } catch (err) {
      toast.error("Error al actualizar el diseño: " + err.message);
      console.error(err);
      return false;
    }
  };

  const eliminarDiseño = async (id) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      if (!token) throw new Error("Token no encontrado");

      const res = await fetch(`http://127.0.0.1:8000/api/diseño_por_id/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        toast.success("Diseño eliminado con éxito");
        setDiseños((prev) => prev.filter((diseño) => diseño.id !== id));
        return true;
      } else {
        toast.error("Error al eliminar el diseño");
        return false;
      }
    } catch (err) {
      toast.error("Error al eliminar el diseño");
      console.error(err);
      return false;
    }
  };

  useEffect(() => {
    fetchDiseños();
  }, []);

  return {
    diseños,
    loading,
    crearDiseño,
    actualizarDiseño,
    eliminarDiseño,
    obtenerDiseñoPorId,
  };
};