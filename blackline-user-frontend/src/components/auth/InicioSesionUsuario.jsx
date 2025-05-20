import React, { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { navigate } from 'astro/virtual-modules/transitions-router.js';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('El email no es válido'),
  password: z.string().min(4, 'La contraseña debe tener al menos 6 caracteres'),
});

const InicioSesionUsuario = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const data = {
      email,
      password,
    };

    const validation = schema.safeParse(data);
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al iniciar sesión');
      }

      const result = await response.json();
      login(result.access, true);
      navigate('/');
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
            type="text"
            placeholder="Email"
            className="border border-neutral-400 p-2 mb-4 w-full bg-transparent rounded-md animate-fade-in-down animate-delay-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border border-neutral-400 p-2 mb-4 w-full bg-transparent rounded-md animate-fade-in-down animate-delay-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <span className="text-sm mt-2 animate-fade-in-right animate-delay-500">¿No tienes cuenta?</span>
          <a href="/register" className="text-blue-400 ml-2 text-sm hover:underline animate-fade-in-right animate-delay-500">
            Regístrate aquí
          </a>

          <br />

          <span className="text-sm mt-2 animate-fade-in-right animate-delay-500">¿Has olvidado tu contraseña?</span>
          <a href="/recuperacion" className="text-blue-400 ml-2 text-sm hover:underline animate-fade-in-right animate-delay-500">
            Restablecer aquí
          </a>

          <button
            type="submit"
            className="mt-7 bg-neutral-500 hover:bg-neutral-600 transition-all duration-300 text-white p-2 rounded w-full animate-fade-in-down animate-delay-500"
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </form>
  );
};

export default InicioSesionUsuario;
