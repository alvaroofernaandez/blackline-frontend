import { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { z } from 'zod';

const SorteosApuntarseForm = ({ id }) => {
  const [formData, setFormData] = useState({
    instagramUser: '',
    hasMetRequirements: false,
  });
  const [error, setError] = useState('');

  const { token } = useAuthStore();

  const formSchema = z.object({
    instagramUser: z.string().min(1, 'El usuario de Instagram es obligatorio'),
    hasMetRequirements: z.boolean().refine((val) => val, {
      message: 'Debe confirmar que ha cumplido los requerimientos',
    }),
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      formSchema.parse(formData);

      const payload = {
        instagram_username: formData.instagramUser,
        requirements: formData.hasMetRequirements ? 'True' : 'False',
      };

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

      const data = await response.json();
      console.log('Response:', data);
      alert('Formulario enviado con éxito');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        console.error('Error al enviar el formulario:', error);
        alert('Hubo un error al enviar el formulario');
      }
    }
  };

  return (
    <div className="p-4 mt-52">
      <h1 className="text-center font-bold text-5xl mb-10">Apuntarse al sorteo</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-[90%] md:max-w-[70%] lg:max-w-[30%] mx-auto"
      >
        <div className="mb-4">
          <label htmlFor="instagramUser" className="block mb-2">
            Usuario de Instagram:
          </label>
          <input
            type="text"
            id="instagramUser"
            name="instagramUser"
            value={formData.instagramUser}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-lg text-black w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="hasMetRequirements" className="flex items-center">
            <input
              type="checkbox"
              id="hasMetRequirements"
              name="hasMetRequirements"
              checked={formData.hasMetRequirements}
              onChange={handleChange}
              className="mr-2"
            />
            ¿Ha cumplido los requerimientos?
          </label>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="dark:bg-neutral-900 bg-neutral-600 text-white rounded-lg p-2 dark:hover:bg-neutral-950 hover:bg-neutral-500 transition-all w-full"
        >
          Verificar y Enviar
        </button>
      </form>
    </div>
  );
};

export default SorteosApuntarseForm;
