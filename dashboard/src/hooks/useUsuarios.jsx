import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const usuarioSchema = z.object({
  id: z.number().optional(),
  username: z.string().min(1, "El nombre de usuario es obligatorio"),
  email: z.string().email("El correo debe ser válido"),
  role: z.string().min(1, "El rol es obligatorio"),
  instagram_username: z.string().nullable().optional(),
  can_receive_emails: z.boolean().optional(),
});

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsuarios = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      if (!token) throw new Error("Token no encontrado");

      const res = await fetch("http://127.0.0.1:8000/api/usuarios/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const raw = await res.json();
      const validados = raw.map((usuario) => usuarioSchema.parse(usuario));
      setUsuarios(validados);
    } catch (err) {
      toast.error("Error cargando usuarios: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const obtenerUsuarioPorId = async (id) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      if (!token) throw new Error("Token no encontrado");

      const res = await fetch(`http://127.0.0.1:8000/api/usuarios/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const datos = await res.json();
        return usuarioSchema.parse(datos[0]);
      } else {
        throw new Error("Error al cargar el usuario.");
      }
    } catch (err) {
      toast.error("No se pudo cargar el usuario.");
      return null;
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      if (!token) throw new Error("Token no encontrado");

      const res = await fetch(`http://127.0.0.1:8000/api/usuarios/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        toast.success("Usuario eliminado con éxito");
        setUsuarios((prev) => prev.filter((usuario) => usuario.id !== id));
        return true;
      } else {
        toast.error("Error al eliminar el usuario");
        return false;
      }
    } catch (err) {
      toast.error("Error al eliminar el usuario");
      return false;
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return {
    usuarios,
    loading,
    eliminarUsuario,
    obtenerUsuarioPorId,
  };
};