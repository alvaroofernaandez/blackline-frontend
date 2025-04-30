import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import Modal from "../General/Modal";
import { useUsuarios } from "../../hooks/useUsuarios";
import { navigate } from "astro/virtual-modules/transitions-router.js";

const TablaUsuarios = () => {
  const { usuarios, loading, eliminarUsuario } = useUsuarios();
  const [showModal, setShowModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const abrirModal = (id) => {
    setUsuarioSeleccionado(id);
    setShowModal(true);
  };

  const handleEliminarUsuario = async (id) => {
    const success = await eliminarUsuario(id);
    if (success) {
      setShowModal(false);
    }
  };

  if (loading) return <p className="text-center">Cargando usuarios...</p>;
  if (usuarios.length === 0)
    return <p className="text-red-500 text-center">No hay usuarios actualmente, añade un usuario</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-white mb-4 text-center">Lista de Usuarios</h2>
      <div className="max-h-[700px] overflow-y-auto rounded-xl">
        <table className="w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="dark:bg-neutral-950 bg-neutral-500 text-white sticky top-0 z-10">
            <tr>
              <th className="p-3 text-left">Nombre de Usuario</th>
              <th className="p-3 text-left">Correo</th>
              <th className="p-3 text-left">Rol</th>
              <th className="p-3 text-left">Instagram</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 ">
            {usuarios.map((fila, index) => (
              <tr
                key={fila.id}
                className={`hover:bg-gray-100 transition ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="p-3 text-gray-700">{fila.username}</td>
                <td className="p-3 text-gray-600">{fila.email}</td>
                <td className="p-3 text-gray-600">{fila.role}</td>
                <td className="p-3 text-gray-600">{fila.instagram_username || "N/A"}</td>
                <td className="flex gap-3 justify-center items-center p-8">
                  <button
                    className="bg-neutral-400 size-10 justify-items-center hover:scale-105 transition-all duration-500 text-white rounded-lg"
                    onClick={() => navigate(`/actualizar-usuario/${fila.id}`)}
                  >
                    <AiFillEdit className="text-xl" />
                  </button>
                  <button
                    className="dark:bg-neutral-800 bg-neutral-600 size-10 justify-items-center hover:scale-105 transition-all duration-500 text-white rounded-lg"
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
          eliminarObjeto={handleEliminarUsuario}
          id={usuarioSeleccionado}
        />
      )}
    </div>
  );
};

export default TablaUsuarios;
