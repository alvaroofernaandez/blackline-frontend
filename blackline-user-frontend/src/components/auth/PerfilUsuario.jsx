import { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useAuth } from '../../hooks/useAuth';

const PerfilUsuario = () => {
  const { user, isLoggedIn, logout } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newInstagramUsername, setNewInstagramUsername] = useState('');
  const { changeEmailPreference, changeInstagramUsername } = useAuth();

  if (!isLoggedIn || !user) {
    return (
      <div className="flex justify-center items-center h-screen bg-neutral-900">
        <p className="text-white text-lg">Cargando datos del usuario...</p>
      </div>
    );
  }

  const handleChangeEmailPreference = () => {
    changeEmailPreference(user);
  };

  const handleInstagramChange = () => {
    changeInstagramUsername(user, newInstagramUsername, () => setIsModalOpen(false));
  };

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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out-icon lucide-log-out"><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/></svg>
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
