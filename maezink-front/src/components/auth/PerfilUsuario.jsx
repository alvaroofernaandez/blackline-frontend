import { useAuthStore } from '../../stores/authStore';
import { FiLogOut } from "react-icons/fi";

const PerfilUsuario = () => {
  const { user, isLoggedIn, logout } = useAuthStore();

  if (!isLoggedIn || !user) {
    return (
      <div className="flex justify-center items-center h-screen bg-neutral-900">
        <p className="text-white text-lg">Cargando datos del usuario...</p>
      </div>
    );
  }

  return (
    <div className="text-white px-8 py-24">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="mb-6 mt-20">
          <img
            src={`https://ui-avatars.com/api/?name=${user.username || 'U'}&background=4b5563&color=fff&size=128`}
            alt="Avatar de usuario"
            className="w-32 h-32 rounded-full shadow-lg"
          />
        </div>

        <div className="w-full flex justify-between items-center mb-12 border-b border-neutral-700 pb-4">
          <h1 className="text-4xl font-bold">Perfil de Usuario</h1>
          <button
            onnClick={logout}
            className="bg-red-900 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200 text-sm"
          >
            <FiLogOut className="inline" />
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
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;
