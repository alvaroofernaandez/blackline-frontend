import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const noticiaSchema = z.object({
  id: z.string().optional(),
  titulo: z.string().min(1, "El título es obligatorio"),
  descripcion: z.string().min(1, "La descripción es obligatoria"),
  fecha: z.string().refine((fecha) => !isNaN(Date.parse(fecha)), {
    message: "La fecha debe ser válida",
  }),
  imagen: z.string().url("La URL de la imagen debe ser válida").optional(),
});

export const useNoticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNoticias = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      if (!token) throw new Error("Token no encontrado");

      const res = await fetch("http://localhost:8000/api/noticias", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const raw = await res.json();
      const validadas = raw.map((n) => noticiaSchema.parse(n));
      setNoticias(validadas);
    } catch (err) {
      toast.error("Error cargando noticias: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const obtenerNoticiaPorId = async (id) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      if (!token) throw new Error("Token no encontrado");

      const respuesta = await fetch(`http://127.0.0.1:8000/api/noticias_por_id/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (respuesta.ok) {
        const datos = await respuesta.json();
        return datos;
      } else {
        throw new Error("Error al cargar la noticia.");
      }
    } catch (error) {
      toast.error("No se pudo cargar la noticia.");
      console.error(error);
      return null;
    }
  };

  const crearNoticia = async (noticia) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      if (!token) throw new Error("Token no encontrado");

      const validation = noticiaSchema.safeParse(noticia);
      if (!validation.success) {
        const errorMessages = validation.error.errors.map((err) => err.message);
        errorMessages.forEach((msg) => toast.error(msg));
        return false;
      }

      const res = await fetch("http://localhost:8000/api/noticias/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(validation.data),
      });

      if (res.ok) {
        toast.success("Noticia creada con éxito");
        fetchNoticias(); 
        return true;
      } else {
        toast.error("Error al crear la noticia");
        return false;
      }
    } catch (err) {
      toast.error("Error al crear la noticia: " + err.message);
      console.error(err);
      return false;
    }
  };

  const actualizarNoticia = async (id, noticia) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      if (!token) throw new Error("Token no encontrado");

      const validation = noticiaSchema.safeParse(noticia);
      if (!validation.success) {
        const errorMessages = validation.error.errors.map((err) => err.message);
        errorMessages.forEach((msg) => toast.error(msg));
        return false;
      }

      const res = await fetch(`http://localhost:8000/api/noticias/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(validation.data),
      });

      if (res.ok) {
        toast.success("Noticia actualizada con éxito");
        fetchNoticias(); // Refrescar la lista de noticias
        return true;
      } else {
        toast.error("Error al actualizar la noticia");
        return false;
      }
    } catch (err) {
      toast.error("Error al actualizar la noticia: " + err.message);
      console.error(err);
      return false;
    }
  };

  const eliminarNoticia = async (id) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];

      const res = await fetch(`${"http://localhost:8000/api/noticias"}/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        toast.success("Noticia eliminada con éxito");
        setNoticias((prev) => prev.filter((n) => n.id !== id));
        return true;
      } else {
        toast.error("Error al eliminar la noticia");
        return false;
      }
    } catch {
      toast.error("Error al eliminar la noticia");
      return false;
    }
  };

  useEffect(() => {
    fetchNoticias();
  }, []);

  return { noticias, loading, crearNoticia, actualizarNoticia, eliminarNoticia, obtenerNoticiaPorId };
};

