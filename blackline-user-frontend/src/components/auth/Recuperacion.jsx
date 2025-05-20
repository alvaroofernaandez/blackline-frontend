import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const RecuperacionForm = () => {
  const [correo, setCorreo] = useState('');
  const { error, setError, sendRecoveryEmail } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    await sendRecoveryEmail(correo);
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
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="mt-7 bg-neutral-500 hover:bg-neutral-600 transition-all duration-300 text-white p-2 rounded w-full animate-fade-in-down animate-delay-500"
          >
            Enviar correo de recuperación
          </button>
        </div>
      </div>
    </form>
  );
};

export default RecuperacionForm;
