import { useState } from 'react';
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useAuthStore } from '../../stores/authStore'; // Adjust the path if necessary
import { navigate } from 'astro/virtual-modules/transitions-router.js';

const Header = () => {
  const { isLoggedIn, user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed z-20 flex justify-between md:justify-center items-center w-full mt-5 px-4">
      <div className="bg-neutral-800 rounded-xl w-auto h-auto border border-[#222221] shadow-lg shadow-black/50 backdrop-blur-3xl bg-opacity-30">
        <button
          className="text-white text-2xl md:hidden p-2"
          onClick={handleMobileMenuToggle}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <ul
          className={`${
            isMobileMenuOpen ? 'block' : 'hidden'
          } md:flex flex-col md:flex-row place-content-center p-4 text-white text-lg md:text-sm lg:text-sm`}
        >
          <li className="hover:-translate-y-1 transition-all duration-200">
            <a
              className="hover:bg-neutral-600 rounded-xl hover:font-bold transition-all ease-in-out duration-600 p-2 sm:p-4"
              href="/"
            >
              Inicio
            </a>
          </li>
          <li className="hover:-translate-y-1 transition-all duration-200">
            <a
              className="hover:bg-neutral-600 rounded-xl hover:font-bold transition-all ease-in-out duration-600 p-2 sm:p-4"
              href="/noticiero"
            >
              Noticiero
            </a>
          </li>
          <li className="hover:-translate-y-1 transition-all duration-200">
            <a
              className="hover:bg-neutral-600 rounded-xl hover:font-bold transition-all ease-in-out duration-600 p-2 sm:p-4"
              href="/pidetucita"
            >
              Pide tu cita
            </a>
          </li>
          <li className="hover:-translate-y-1 transition-all duration-200">
            <a
              className="hover:bg-neutral-600 rounded-xl hover:font-bold transition-all ease-in-out duration-600 p-2 sm:p-4"
              href="/sorteos"
            >
              Sorteos
            </a>
          </li>
          <li className="hover:-translate-y-1 transition-all duration-200">
            <a
              className="hover:bg-neutral-600 rounded-xl hover:font-bold transition-all ease-in-out duration-600 p-2 sm:p-4"
              href="/diseños"
            >
              Diseños
            </a>
          </li>
        </ul>
      </div>
      <div className="absolute top-0 right-0 mr-5 md:mt-2 font-base underline transition-all duration-200 rounded-xl w-auto h-auto text-white flex items-center">
        {isLoggedIn ? (
          <div className="relative">
            <button onClick={handleMenuToggle} className="flex items-center focus:outline-none">
              <img
                src={useAuthStore.getState().getAvatarUrl()}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
            </button>
            <div className={`absolute right-0 mt-2 w-48 bg-neutral-900 shadow-lg ${isMenuOpen ? 'block' : 'hidden'}`}>
              <ul className="text-sm text-white">
                <li className="px-4 py-2 text-neutral-400">Bienvenid@, {user?.username || user?.email || 'Invitado'}</li>
                <hr/>
                <li className="hover:bg-neutral-600 px-4 py-2">
                  <button onClick={() => navigate("/perfil")} className='w-full text-left'>Ajustes de cuenta</button>
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
