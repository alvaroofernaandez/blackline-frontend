import { navigate } from 'astro/virtual-modules/transitions-router.js';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z
  .object({
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

const NuevaPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);

  // Obtener el token de la query param
  const getTokenFromQuery = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('token');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const validation = schema.safeParse(formData);
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    const token = getTokenFromQuery();
    if (!token) {
      setError('Token no encontrado en la URL');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/modificar_contrasena/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nueva_contrasena: formData.password, token }),
      });

      if (!response.ok) {
        throw new Error('Error al cambiar la contraseña');
      }

      toast.loading('Contraseña cambiada con éxito. Redirigiendo...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-96 p-8 text-white">
          <div className="flex justify-center">
            <img
              src="/favicon.svg"
              alt="Logo"
              className="w-64 animate-blurred-fade-in animate-delay-200"
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

          {error && <p className="text-red-500 text-sm">{error}</p>}

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
