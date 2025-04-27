import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { FaUser } from "react-icons/fa";

const Header = () => {
  const [userName, setUserName] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get('accessToken');

    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          (typeof window !== 'undefined' ? window.atob(base64) : Buffer.from(base64, 'base64').toString('binary'))
            .split('')
            .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
            .join('')
        );
        const decoded = JSON.parse(jsonPayload);
        setUserName(decoded.username || decoded.email || 'Invitado');
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error al decodificar el token", error);
      }
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('accessToken'); 
    setUserName(null); 
    setIsLoggedIn(false); 
    window.location.reload();
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed z-20 flex justify-center items-center w-full mt-5">
      <div className="bg-neutral-800 rounded-xl w-auto h-auto border border-[#222221] shadow-lg shadow-black/50 backdrop-blur-3xl bg-opacity-30"> 
        <ul className="flex flex-wrap place-content-center p-4 text-white text-xs md:text-sm lg:text-sm">
          <li className="hover:-translate-y-1 transition-all duration-200"><a className="hover:bg-neutral-600 rounded-xl hover:font-bold transition-all ease-in-out duration-600 p-2 sm:p-4" href="/">Inicio</a></li>
          <li className="hover:-translate-y-1 transition-all duration-200"><a className="hover:bg-neutral-600 rounded-xl hover:font-bold transition-all ease-in-out duration-600 p-2 sm:p-4" href="/noticiero">Noticiero</a></li>
          <li className="hover:-translate-y-1 transition-all duration-200"><a className="hover:bg-neutral-600 rounded-xl hover:font-bold transition-all ease-in-out duration-600 p-2 sm:p-4" href="/galeria">Galería</a></li>
          <li className="hover:-translate-y-1 transition-all duration-200"><a className="hover:bg-neutral-600 rounded-xl hover:font-bold transition-all ease-in-out duration-600 p-2 sm:p-4" href="/pidetucita">Pide tu cita</a></li>
          <li className="hover:-translate-y-1 transition-all duration-200"><a className="hover:bg-neutral-600 rounded-xl hover:font-bold transition-all ease-in-out duration-600 p-2 sm:p-4" href="/sorteos">Sorteos</a></li>
          <li className="hover:-translate-y-1 transition-all duration-200"><a className="hover:bg-neutral-600 rounded-xl hover:font-bold transition-all ease-in-out duration-600 p-2 sm:p-4" href="/diseños">Diseños</a></li>
        </ul>
      </div>
      <div className="absolute right-0 mr-5 font-base underline transition-all duration-200 rounded-xl w-auto h-auto text-white flex items-center">
        {isLoggedIn ? (
          <div className="relative">
            <button onClick={handleMenuToggle} className="flex items-center focus:outline-none">
              <FaUser className="bg-black size-10 rounded-full p-2" />
            </button>
            <div className={`absolute right-0 mt-2 w-48 bg-neutral-900 shadow-lg ${isMenuOpen ? 'block' : 'hidden'}`}>
              <ul className="text-sm text-white">
                <li className="px-4 py-2 text-neutral-400">Bienvenido, {userName}</li>
                <hr/>
                <li className="hover:bg-neutral-600 px-4 py-2">
                  <a href="/perfil">Ajustes de cuenta</a>
                </li>
                <li className="hover:bg-neutral-600 px-4 py-2">
                  <button onClick={handleLogout} className="w-full text-left">Cerrar sesión</button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <a href="/login">¡Inicia sesión!</a>
        )}
      </div>
    </header>
  );
};

export default Header;
