import { navigate } from "astro/virtual-modules/transitions-router.js";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const sorteoSchema = z.object({
  id: z.string(),
  titulo: z.string().min(1, "El título es obligatorio."),
  descripcion: z.string().min(1, "La descripción es obligatoria."),
  fecha_inicio: z.string(),
  fecha_fin: z.string().refine((fecha) => !isNaN(Date.parse(fecha)), {
    message: "La fecha debe ser válida.",
  }),
  estado: z.string(),
  ganador: z.string().nullable(),
  premios: z.array(z.string()).optional(),
  participantes: z.array(z.any()).optional(),
});

export const useSorteos = () => {
  const [sorteos, setSorteos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSorteos = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      if (!token) throw new Error("Token no encontrado");

      const res = await fetch("http://127.0.0.1:8000/api/sorteos/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const raw = await res.json();
      const validados = raw.map((sorteo) => sorteoSchema.parse(sorteo));
      setSorteos(validados);
    } catch (err) {
      toast.error("Error cargando sorteos: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const obtenerSorteoPorId = async (id) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      if (!token) throw new Error("Token no encontrado");

      const res = await fetch(`http://127.0.0.1:8000/api/sorteo_por_id/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const datos = await res.json();
        return sorteoSchema.parse(datos);
      } else {
        throw new Error("Error al cargar el sorteo.");
      }
    } catch (err) {
      toast.error("No se pudo cargar el sorteo.");
      console.error(err);
      return null;
    }
  };

  const crearSorteo = async (nuevoSorteo) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      if (!token) throw new Error("Token no encontrado");
  
      if (!nuevoSorteo.titulo || !nuevoSorteo.descripcion) {
        toast.error("Título y descripción son obligatorios.");
        return false;
      }
  
      const response = await fetch("http://127.0.0.1:8000/api/sorteos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nuevoSorteo),
      });
  
      if (response.ok) {
        toast.success("Sorteo creado con éxito.");
        fetchSorteos();
        setTimeout(() => {
          navigate("/sorteos");
        }, 1000);
        return true;
      } else {
        const errorData = await response.json();
        toast.error(
          "Error al crear el sorteo: " +
            (errorData.non_field_errors
              ? errorData.non_field_errors.join(", ")
              : "Error desconocido.")
        );
        return false;
      }
    } catch (err) {
      toast.error("Error al crear el sorteo: " + err.message);
      console.error(err);
      return false;
    }
  };  

  const actualizarSorteo = async (id, sorteo) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      if (!token) throw new Error("Token no encontrado");

      const validation = sorteoSchema.safeParse(sorteo);
      if (!validation.success) {
        const errorMessages = validation.error.errors.map((err) => err.message);
        errorMessages.forEach((msg) => toast.error(msg));
        return false;
      }

      const res = await fetch(`http://127.0.0.1:8000/api/sorteos/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(validation.data),
      });

      if (res.ok) {
        toast.success("Sorteo actualizado con éxito");
        fetchSorteos();
        return true;
      } else {
        toast.error("Error al actualizar el sorteo");
        return false;
      }
    } catch (err) {
      toast.error("Error al actualizar el sorteo: " + err.message);
      console.error(err);
      return false;
    }
  };

  const eliminarSorteo = async (id) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      if (!token) throw new Error("Token no encontrado");

      const res = await fetch(`http://127.0.0.1:8000/api/sorteos/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        toast.success("Sorteo eliminado con éxito");
        setSorteos((prev) => prev.filter((sorteo) => sorteo.id !== id));
        return true;
      } else {
        toast.error("Error al eliminar el sorteo");
        return false;
      }
    } catch (err) {
      toast.error("Error al eliminar el sorteo");
      console.error(err);
      return false;
    }
  };

  const asignarPremio = async (id, premio) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      if (!token) throw new Error("Token no encontrado");

      const res = await fetch(
        `http://127.0.0.1:8000/api/sorteos_asignar_premio/${id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ premio }),
        }
      );

      if (res.ok) {
        toast.success("Premio asignado con éxito");
        setTimeout(() => {
          navigate("/sorteos");
        }, 1000);
        fetchSorteos();
        return true;
      } else {
        toast.error("Error al asignar el premio");
        return false;
      }
    } catch (err) {
      toast.error("Error al asignar el premio: " + err.message);
      console.error(err);
      return false;
    }
  };

  useEffect(() => {
    fetchSorteos();
  }, []);

  return {
    sorteos,
    loading,
    crearSorteo,
    actualizarSorteo,
    eliminarSorteo,
    obtenerSorteoPorId,
    asignarPremio,
  };
};