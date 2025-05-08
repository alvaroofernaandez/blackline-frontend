import React, { useState } from 'react';
import Cookies from 'js-cookie'; 
import { navigate } from 'astro/virtual-modules/transitions-router.js';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('El email no es válido'),
  username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string(),
  recibirNotificaciones: z.boolean(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

const RegistroUsuario = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    recibirNotificaciones: false,
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      schema.parse(formData);

      const response = await fetch('http://localhost:8000/api/usuarios/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password,
          can_receive_emails: formData.recibirNotificaciones,
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const data = await response.json();
      console.log('Usuario registrado:', data);

      const tokenResponse = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!tokenResponse.ok) {
        throw new Error('Error al obtener el token');
      }

      const tokenData = await tokenResponse.json();
      console.log('Token:', tokenData);

      Cookies.set('accessToken', tokenData.access, { expires: 1 });

      setSuccessMessage('Usuario registrado con éxito');
      navigate('/');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        console.error('Error al registrar usuario:', error);
        setError(error.message);
      }
    }
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