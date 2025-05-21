import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth'; 
import { useAuthStore } from '../../stores/authStore';

const InicioSesionUsuario = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, setError } = useAuth(); 
  const loginStore = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    await login(email, password, loginStore); 
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
              loading="lazy"
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
