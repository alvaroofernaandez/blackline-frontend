import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { z } from "zod";
import Modal from "../General/Modal";

const usuarioSchema = z.object({
  id: z.number(),
  username: z.string().min(1, "El nombre de usuario es obligatorio"),
  email: z.string().email("El correo debe ser válido"),
  role: z.string().min(1, "El rol es obligatorio"),
  instagram_username: z.string().nullable(),
});

const TablaUsuarios = () => {
  const [data, setData] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/usuarios/");
        const usuarios = await response.json();
        const validData = usuarios.map((usuario) => usuarioSchema.parse(usuario));
        setData(validData);
      } catch (error) {
        toast.error("Error al cargar los datos: " + error.message);
        console.error("Error:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerUsuarios();
  }, []);

  const eliminarUsuario = async (id) => {
    try {
      const respuesta = await fetch(
        `http://127.0.0.1:8000/api/usuarios/${id}/`,
        {
          method: "DELETE",
        }
      );
      if (respuesta.ok) {
        toast.success("Usuario eliminado con éxito.");
        setData(data.filter((usuario) => usuario.id !== id));
        setShowModal(false);
      } else {
        toast.error("Error al eliminar el usuario.");
      }
    } catch (e) {
      toast.error("Error al eliminar el usuario.");
    }
  };

  const abrirModal = (id) => {
    setUsuarioSeleccionado(id);
    setShowModal(true);
  };

  if (cargando) return <p className="text-center">Cargando usuarios...</p>;
  if (data.length === 0)
    return <p className="text-red-500 text-center">No hay usuarios actualmente, añade un usuario</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-white mb-4 text-center">Lista de Usuarios</h2>
      <div className="max-h-[700px] overflow-y-auto rounded-xl">
        <table className="w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-neutral-800 text-white sticky top-0 z-10">
            <tr>
              <th className="p-3 text-left">Nombre de Usuario</th>
              <th className="p-3 text-left">Correo</th>
              <th className="p-3 text-left">Rol</th>
              <th className="p-3 text-left">Instagram</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 ">
            {data.map((fila, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 transition ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="p-3 text-gray-700">{fila.username}</td>
                <td className="p-3 text-gray-600">{fila.email}</td>
                <td className="p-3 text-gray-600">{fila.role}</td>
                <td className="p-3 text-gray-600">{fila.instagram_username || "N/A"}</td>
                <td className="flex gap-3 justify-center items-center p-8">
                  <button
                    className="bg-neutral-400 size-10 justify-items-center hover:scale-105 transition-all duration-500 text-white rounded-lg"
                    onClick={() => (window.location.href = `/actualizar-usuario/${fila.id}`)}
                  >
                    <AiFillEdit className="text-xl" />
                  </button>
                  <button
                    className="bg-neutral-800 size-10 justify-items-center hover:scale-105 transition-all duration-500 text-white rounded-lg"
                    onClick={() => abrirModal(fila.id)}
                  >
                    <FaRegTrashAlt className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          eliminarObjeto={eliminarUsuario}
          id={usuarioSeleccionado}
        />
      )}
    </div>
  );
};

export default TablaUsuarios;
