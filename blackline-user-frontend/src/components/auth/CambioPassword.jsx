import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const NuevaPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [localError, setLocalError] = useState(null);

  const { changePassword, error } = useAuth();

  const getTokenFromQuery = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('token');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    const token = getTokenFromQuery();
    if (!token) {
      setLocalError('Token no encontrado en la URL');
      return;
    }
    await changePassword(formData, token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-96 p-8 text-white">
          <div className="flex justify-center">
            <img
              src="/logo.avif"
              alt="Logo"
              className="w-64 animate-blurred-fade-in animate-delay-200"
              loading='lazy'
            />
          </div>
          <input
            type="password"
            name="password"
            placeholder="Nueva contraseña"
            className="border border-neutral-400 p-2 mb-4 w-full bg-transparent rounded-md animate-fade-in-down animate-delay-500"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Repite la nueva contraseña"
            className="border border-neutral-400 p-2 mb-4 w-full bg-transparent rounded-md animate-fade-in-down animate-delay-700"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {(localError || error) && (
            <p className="text-red-500 text-sm">{localError || error}</p>
          )}

          <button
            type="submit"
            className="mt-7 bg-neutral-500 hover:bg-neutral-600 transition-all duration-300 text-white p-2 rounded w-full animate-fade-in-down animate-delay-800"
          >
            Cambiar contraseña
          </button>
        </div>
      </div>
    </form>
  );
};

export default NuevaPassword;
