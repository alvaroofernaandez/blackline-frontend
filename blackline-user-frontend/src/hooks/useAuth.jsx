import { useState } from 'react';
import Cookies from 'js-cookie';
import { navigate } from 'astro/virtual-modules/transitions-router.js';
import { toast } from 'sonner';
import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('El email no es válido'),
  username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string(),
  recibirNotificaciones: z.boolean(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

export const loginSchema = z.object({
  email: z.string().email('El email no es válido'),
  password: z.string().min(4, 'La contraseña debe tener al menos 6 caracteres'),
});

export const recoverySchema = z.object({
  correo: z.string().email('El email no es válido'),
});

export const passwordSchema = z.object({
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});


export function useAuth() {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const register = async (formData) => {
    setError(null);
    setSuccessMessage(null);
    try {
      registerSchema.parse(formData);

      const response = await fetch('http://localhost:8000/api/usuarios/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password,
          can_receive_emails: formData.recibirNotificaciones,
        }),
      });

      if (!response.ok) throw new Error('Error en la solicitud');

      await response.json();

      const tokenResponse = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!tokenResponse.ok) throw new Error('Error al obtener el token');
      const tokenData = await tokenResponse.json();
      Cookies.set('accessToken', tokenData.access, { expires: 1 });

      setSuccessMessage('Usuario registrado con éxito');
      navigate('/');
    } catch (err) {
      if (err instanceof z.ZodError) setError(err.errors[0].message);
      else setError(err.message);
    }
  };

  const login = async (email, password, loginStoreFn) => {
    setError(null);
    const data = { email, password };
    const validation = loginSchema.safeParse(data);
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Error al iniciar sesión');
      const result = await response.json();
      if (loginStoreFn) loginStoreFn(result.access, true);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const sendRecoveryEmail = async (correo) => {
    setError(null);
    const data = { correo };
    const validation = recoverySchema.safeParse(data);
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/api/change_password/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Error al enviar correo de recuperación');
      toast.success('Correo de recuperación enviado con éxito. Revisa tu bandeja de entrada.');
    } catch (err) {
      setError(err.message);
    }
  };

  const changePassword = async (formData, token) => {
    setError(null);
    const validation = passwordSchema.safeParse(formData);
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }
    if (!token) {
      setError('Token no encontrado en la URL');
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/api/modificar_contrasena/', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nueva_contrasena: formData.password, token }),
      });
      if (!response.ok) throw new Error('Error al cambiar la contraseña');
      toast.loading('Contraseña cambiada con éxito. Redirigiendo...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  const changeEmailPreference = async (user) => {
    try {
      const response = await fetch('http://localhost:8000/api/modificar_recibir_correos/', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id, can_receive_emails: !user.can_receive_emails }),
      });
      if (!response.ok) throw new Error('Failed to update email preference');
      toast.success("Preferencia de correo actualizada");
      setTimeout(() => navigate('/perfil'), 1300);
    } catch (err) {
      toast.error('Error al actualizar la preferencia de correo: ' + err.message);
    }
  };

  const changeInstagramUsername = async (user, newInstagramUsername, closeModal) => {
    try {
      const response = await fetch('http://localhost:8000/api/modificar_nombre_instagram/', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id, instagram_username: newInstagramUsername }),
      });
      if (!response.ok) throw new Error('Failed to update Instagram username');
      toast.success('Nombre de Instagram actualizado correctamente');
      if (closeModal) closeModal();
      setTimeout(() => navigate('/perfil'), 1300);
    } catch (err) {
      toast.error('Error al actualizar el nombre de Instagram: ' + err.message);
    }
  };

  return {
    error,
    setError,
    successMessage,
    setSuccessMessage,
    register,
    login,
    sendRecoveryEmail,
    changePassword,
    changeEmailPreference,
    changeInstagramUsername,
  };
}