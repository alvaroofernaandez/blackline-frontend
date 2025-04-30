import { useState, useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";

const usuarioSchema = z.object({
  username: z.string().min(1, "El nombre de usuario es obligatorio"),
  email: z.string().email("El correo debe ser válido"),
  role: z.string().min(1, "El rol es obligatorio"),
});

const EditarUsuario = ({ id }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const respuesta = await fetch(`http://127.0.0.1:8000/api/usuarios/${id}/`);
        if (respuesta.ok) {
          const datos = await respuesta.json();
          setFormData(datos[0]);
        } else {
          throw new Error("Error al cargar el usuario.");
        }
      } catch (error) {
        console.error(error);
        toast.error("No se pudo cargar el usuario.");
      }
    };

    if (id) obtenerUsuario();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const actualizarUsuario = async (e) => {
    e.preventDefault();
    try {
      usuarioSchema.parse(formData);
      const respuesta = await fetch(`http://127.0.0.1:8000/api/usuarios/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (respuesta.ok) {
        toast.success("Usuario actualizado con éxito.");
        setTimeout(() => {
          window.location.href = "/usuarios";
        }, 500);
      } else {
        console.error("Error al actualizar el usuario:", respuesta.statusText);
        throw new Error("Error al actualizar el usuario.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error al actualizar el usuario.");
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={actualizarUsuario} className="max-w-[50%] mx-auto mt-20">
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
          className="bg-neutral-900 text-white rounded-lg p-2 hover:bg-neutral-800 w-full mt-10 transition-all"
        >
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default EditarUsuario;
