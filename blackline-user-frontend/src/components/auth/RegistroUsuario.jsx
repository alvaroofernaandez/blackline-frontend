import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth'; 

const RegistroUsuario = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    recibirNotificaciones: false,
  });

  const { error, setError, successMessage, setSuccessMessage, register } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setError(null);
    setSuccessMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(formData);
  };

  return (
    <form onSubmit={handleSubmit} className='animate-delay-400 animate-fade-in-right'>
      <div className="flex items-center justify-center">
        <div className="w-96 p-8 text-white">
          <h1 className="titleMarta2 text-2xl text-center m-6">Registro de usuario</h1>
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="border border-neutral-400 p-2 mb-4 w-full bg-transparent rounded-md"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            className="border border-neutral-400 p-2 mb-4 w-full bg-transparent rounded-md"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="border border-neutral-400 p-2 mb-4 w-full bg-transparent rounded-md"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Repite la contraseña"
            className="border border-neutral-400 p-2 mb-4 w-full bg-transparent rounded-md"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              name="recibirNotificaciones"
              className="border border-neutral-400 p-2 bg-transparent rounded-md"
              checked={formData.recibirNotificaciones}
              onChange={handleChange}
            />
            <span className="ml-2 text-neutral-400 text-sm">Quiero recibir notificaciones por correo</span>
          </label>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

          <span className="text-sm mt-2">¿No tienes cuenta?</span>
          <a href="/login" className="text-blue-400 ml-2 text-sm hover:underline">Inicia sesión</a>

          <button
            type="submit"
            className="mt-7 bg-neutral-500 hover:bg-neutral-600 transition-all duration-300 text-white p-2 rounded w-full"
          >
            Registrarse
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegistroUsuario;
