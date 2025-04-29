import React, { useState } from 'react';
import Cookies from 'js-cookie'; 
import { navigate } from 'astro/virtual-modules/transitions-router.js';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('El email no es válido'),
  password: z.string().min(2, 'La contraseña debe tener al menos 6 caracteres'),
});

const InicioSesionUsuario = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

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
      console.log('Token:', result);

      Cookies.set('accessToken', result.access, { expires: 1 }); 

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
              className="w-40"
            />
          </div>
          <input
            type="text"
            placeholder="Email"
            className="border border-neutral-400 p-2 mb-4 w-full bg-transparent rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border border-neutral-400 p-2 mb-4 w-full bg-transparent rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="mt-7 bg-neutral-500 hover:bg-neutral-600 transition-all duration-300 text-white p-2 rounded w-full"
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </form>
  );
};

export default InicioSesionUsuario;