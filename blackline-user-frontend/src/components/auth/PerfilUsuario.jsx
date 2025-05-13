import { useState } from 'react';
import { navigate } from 'astro/virtual-modules/transitions-router.js';
import { useAuthStore } from '../../stores/authStore';
import { FiLogOut } from "react-icons/fi";
import { toast } from 'sonner';

const PerfilUsuario = () => {
  const { user, isLoggedIn, logout } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newInstagramUsername, setNewInstagramUsername] = useState('');

  if (!isLoggedIn || !user) {
    return (
      <div className="flex justify-center items-center h-screen bg-neutral-900">
        <p className="text-white text-lg">Cargando datos del usuario...</p>
      </div>
    );
  }

  const changeEmailPreference = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/modificar_recibir_correos/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: user.id, 
          can_receive_emails: !user.can_receive_emails 
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update email preference');
      } else {
        const data = await response.json();
        toast.success(`Preferencia de correo actualizada a ${data.can_receive_emails ? 'Recibir' : 'No recibir'}`);
        setTimeout(() => {
          navigate('/perfil');
        }, 1300);
      }
    } catch (error) {
      toast.error('Error al actualizar la preferencia de correo: ' + error.message);
    }
  };

  const handleInstagramChange = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/modificar_nombre_instagram/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: user.id, 
          instagram_username: newInstagramUsername 
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update Instagram username');
      } else {
        toast.success('Nombre de Instagram actualizado correctamente');
        setIsModalOpen(false);
        setTimeout(() => {
          navigate('/perfil');
        }, 1300);
      }
    } catch (error) {
      toast.error('Error al actualizar el nombre de Instagram: ' + error.message);
    }
  };

  function handleChangeEmailPreference() {
    changeEmailPreference();
  }

  return (
    <div className="text-white px-8 pt-24">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="mb-6 mt-16">
          <img
            src={`https://ui-avatars.com/api/?name=${user.username || 'U'}&background=4b5563&color=fff&size=128`}
            alt="Avatar de usuario"
            className="w-32 h-32 rounded-full shadow-lg"
          />
        </div>

        <div className="w-full flex justify-between items-center mb-12 border-b border-neutral-700 pb-4">
          <h1 className="text-4xl font-bold">Perfil de Usuario</h1>
          <button
            onClick={logout}
            className="bg-red-900 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200 text-sm flex items-center gap-2"
          >
            <FiLogOut />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-md w-full mb-20">
          <div>
            <p className="mb-2 text-neutral-400">Nombre de usuario</p>
            <p className="font-semibold">{user.username || 'No disponible'}</p>
          </div>
          <div>
            <p className="mb-2 text-neutral-400">Email</p>
            <p className="font-semibold">{user.email || 'No disponible'}</p>
          </div>
          <div>
            <p className="mb-2 text-neutral-400">Rol</p>
            <p className="font-semibold">{user.role || 'No disponible'}</p>
          </div>
          <div>
            <p className="mb-2 text-neutral-400">Usuario de Instagram</p>
            <p className="font-semibold">{user.instagram_username || 'No disponible'}</p>
          </div>
          <div>
            <p className="mb-2 text-neutral-400">Puede recibir correos</p>
            <p className="font-semibold">{user.can_receive_emails ? 'Sí' : 'No'}</p>
          </div>
        </div>

        <div className='flex gap-5'>
          {user.can_receive_emails ? 
          <button onClick={handleChangeEmailPreference} className='bg-neutral-500 p-2 hover:bg-neutral-600 transition-colors duration-200 rounded-lg'>No quiero recibir correos</button>
          :
          <button onClick={handleChangeEmailPreference} className='bg-neutral-500 p-2 hover:bg-neutral-600 transition-colors duration-200 rounded-lg'>Quiero recibir correos</button>
          }

          <button 
            onClick={() => setIsModalOpen(true)} 
            className='bg-neutral-500 p-2 hover:bg-neutral-600 transition-colors duration-200 rounded-lg'>
            Cambiar nombre de instagram
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <div className="bg-neutral-900 border border-neutral-600/30 p-6 rounded-lg shadow-lg w-96 animate-zoom-in">
            <h2 className="text-xl font-bold mb-4">Cambiar nombre de Instagram</h2>
            <input
              type="text"
              value={newInstagramUsername}
              onChange={(e) => setNewInstagramUsername(e.target.value)}
              placeholder="Nuevo nombre de Instagram"
              className="w-full p-2 mb-4 rounded-lg bg-neutral-700 text-white"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-neutral-700 hover:bg-neutral-800 transition-colors duration-300 text-white px-4 py-2 rounded-lg">
                Cancelar
              </button>
              <button 
                onClick={handleInstagramChange} 
                className="bg-neutral-500 hover:bg-neutral-600 transition-colors duration-300 text-white px-4 py-2 rounded-lg">
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerfilUsuario;
