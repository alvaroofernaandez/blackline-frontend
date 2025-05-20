import { useState } from 'react';
import { z } from 'zod';
import { useAuthStore } from '../stores/authStore';
import { navigate } from 'astro/virtual-modules/transitions-router.js';
import { toast } from 'sonner';

const formSchema = z.object({
  instagramUser: z.string().min(1, 'El usuario de Instagram es obligatorio'),
  hasMetRequirements: z.boolean().refine((val) => val, {
    message: 'Debe confirmar que ha cumplido los requerimientos',
  }),
});

export function useSorteosApuntarse({ id }) {
  const [formData, setFormData] = useState({
    instagramUser: '',
    hasMetRequirements: false,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { token, user } = useAuthStore();
  const instagramUsernameFromToken = user?.instagram_username || '';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        instagram_username: instagramUsernameFromToken || formData.instagramUser,
        requirements: formData.hasMetRequirements ? 'True' : 'False',
      };

      formSchema.parse({
        instagramUser: payload.instagram_username,
        hasMetRequirements: formData.hasMetRequirements,
      });

      if (!instagramUsernameFromToken) {
        const patchResponse = await fetch(
          `http://127.0.0.1:8000/api/modificar_nombre_instagram/`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              id: user.id,
              instagram_username: formData.instagramUser,
            }),
          }
        );

        if (!patchResponse.ok) {
          throw new Error('Error al actualizar el nombre de Instagram');
        }
      }

      const response = await fetch(
        `http://127.0.0.1:8000/api/participantes_por_sorteo/${id}/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      toast.loading('¡Apuntado al sorteo! Redirigiendo...');
      setTimeout(() => {
        navigate('/sorteos');
      }, 1800);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        setError('Hubo un error al enviar el formulario');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    error,
    setError,
    isLoading,
    handleChange,
    handleSubmit,
    instagramUsernameFromToken,
  };
}