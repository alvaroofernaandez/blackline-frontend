import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUsuarios } from "../../hooks/useUsuarios"; 
import { z } from "zod";
import { navigate } from "astro/virtual-modules/transitions-router.js";

const usuarioSchema = z.object({
  username: z.string().min(1, "El nombre de usuario es obligatorio"),
  email: z.string().email("El correo debe ser válido"),
  role: z.string().min(1, "El rol es obligatorio"),
});

const EditarUsuario = ({ id }) => {
  const { obtenerUsuarioPorId, actualizarUsuario } = useUsuarios();

  const [formData, setFormData] = useState({
    id_usuario: id,
    username: "",
    email: "",
    role: "",
  });

  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cargarUsuario = async () => {
      const usuario = await obtenerUsuarioPorId(id);
      if (usuario) {
        setFormData({
          id_usuario: usuario.id,
          username: usuario.username || "",
          email: usuario.email || "",
          role: usuario.role || "",
        });
      }
    };
    if (id) cargarUsuario();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    const validation = usuarioSchema.safeParse(formData);
    if (!validation.success) {
      validation.error.errors.forEach((err) => toast.error(err.message));
      setCargando(false);
      return;
    }

    const success = await actualizarUsuario(id, validation.data);
    if (success) {
      setTimeout(() => {
        navigate("/usuarios");
      }, 500);
    } else {
      setCargando(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="max-w-[90%] md:max-w-[70%] lg:max-w-[30%] mx-auto mt-20">
        <label htmlFor="username" className="block mb-2">
          Nombre de Usuario:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="border border-gray-300 text-black rounded-lg p-2 w-full mb-4"
          required
        />

        <label htmlFor="email" className="block mb-2">
          Correo:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 text-black rounded-lg p-2 w-full mb-4"
          required
        />

        <label htmlFor="role" className="block mb-2">
          Rol:
        </label>
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border border-gray-300 text-black rounded-lg p-2 w-full mb-4"
          required
        />

        <button
          type="submit"
          className="dark:bg-neutral-900 bg-neutral-600 text-white rounded-lg p-2 dark:hover:bg-neutral-950 hover:bg-neutral-500 transition-all w-full"
          disabled={cargando}
        >
          {cargando ? "Cargando..." : "Actualizar"}
        </button>
      </form>
    </div>
  );
};

export default EditarUsuario;