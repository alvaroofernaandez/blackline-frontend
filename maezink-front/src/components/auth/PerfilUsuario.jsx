import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// filepath: /home/alvaro-fernandez/Documentos/Proyectos/front-tfg/maezink-front/src/components/auth/PerfilUsuario.jsx

const PerfilUsuario = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = Cookies.get('accessToken');

    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          (typeof window !== 'undefined' ? window.atob(base64) : Buffer.from(base64, 'base64').toString('binary'))
            .split('')
            .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
            .join('')
        );
        const decoded = JSON.parse(jsonPayload);
        setUserData(decoded);
      } catch (error) {
        console.error("Error al decodificar el token", error);
      }
    }
  }, []);

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white text-lg">Cargando datos del usuario...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-80 mb-60  bg-neutral-800 text-white">
      <div className="bg-neutral-900 p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4">Perfil de Usuario</h1>
        <p><strong>Nombre de usuario:</strong> {userData.username || 'No disponible'}</p>
        <p><strong>Email:</strong> {userData.email || 'No disponible'}</p>
        <p><strong>Rol:</strong> {userData.role || 'No disponible'}</p>
        {/* Agrega más campos según los datos disponibles en el token */}
      </div>
    </div>
  );
};

export default PerfilUsuario;