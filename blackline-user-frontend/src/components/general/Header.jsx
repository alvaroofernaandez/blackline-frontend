import { useState } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuthStore } from '../../stores/authStore'; 
import { navigate } from 'astro/virtual-modules/transitions-router.js';

import { GoHome } from "react-icons/go";
import { LuNewspaper } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsGift } from "react-icons/bs";
import { HiOutlinePaintBrush } from "react-icons/hi2";


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
    <header className="fixed z-20 flex justify-between md:justify-center items-center w-full">
      <div className="bg-neutral-900 flex items-center md:justify-center gap-3 border-b border-b-neutral-600 w-screen h-24 backdrop-blur bg-opacity-30">
        <button
          className="text-white text-2xl md:hidden ml-2 p-2"
          onClick={handleMobileMenuToggle}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <ul
          className={`${
            isMobileMenuOpen ? 'block' : 'hidden'
          } justify-items-center md:flex justify-center items-center p-4 gap-5 md:gap-2 text-white md:static absolute top-24 left-0 w-full bg-neutral-800/80 animate-slide-in-top md:backdrop-blur-none md:bg-transparent`}
        >
        <a href="/">          
          <img src="/favicon.svg" alt="logo" className='size-20 hover:scale-105 transition-transform duration-500 cursor-pointer md:mr-5' />
        </a>
          <li>
            <a
              className="flex items-center gap-2 p-4 md:p-2 lg:p-4 hover:bg-neutral-700/50 rounded-2xl border hover:border-neutral-600/50 text-base md:text-xs lg:text-sm border-transparent transition-all duration-300"
              href="/"
            >
              <GoHome className="inline-block size-5" />
              Inicio
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-2 p-4 md:p-2 lg:p-4 hover:bg-neutral-700/50 rounded-2xl border hover:border-neutral-600/50 text-base md:text-xs lg:text-sm border-transparent transition-all duration-300"
              href="/noticiero"
            >
              <LuNewspaper className="inline-block size-5" />
              Noticiero
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-2 p-4 md:p-2 lg:p-4 hover:bg-neutral-700/50 rounded-2xl border hover:border-neutral-600/50 text-base md:text-xs lg:text-sm border-transparent transition-all duration-300"
              href="/pidetucita"
            >
              <FaRegCalendarAlt className="inline-block size-5" />
              Pide tu cita
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-2 p-4 md:p-2 lg:p-4 hover:bg-neutral-700/50 rounded-2xl border hover:border-neutral-600/50 text-base md:text-xs lg:text-sm border-transparent transition-all duration-300"
              href="/sorteos"
            >
              <BsGift className="inline-block size-5" />
              Sorteos
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-2 p-4 md:p-2 lg:p-4 hover:bg-neutral-700/50 rounded-2xl border hover:border-neutral-600/50 text-base md:text-xs lg:text-sm border-transparent transition-all duration-300"
              href="/diseños"
            >
              <HiOutlinePaintBrush className="inline-block size-5" />
              Diseños
            </a>
          </li>
        </ul>
      </div>
      <div className="absolute top-0 right-0 mr-5 mt-7 font-baserounded-xl w-auto h-auto text-white flex items-center">
        {isLoggedIn ? (
          <div className="relative">
            <button onClick={handleMenuToggle} className="flex items-center focus:outline-none">
              <img
                src={useAuthStore.getState().getAvatarUrl()}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
            </button>
            <div className={`absolute right-0 mt-2 w-48 bg-neutral-900 bg-opacity-30 border border-neutral-700 backdrop-blur shadow-lg ${isMenuOpen ? 'block' : 'hidden'}`}>
              <ul className="text-sm text-white">
                <li className="px-4 py-2 text-neutral-400">Bienvenid@, {user?.username || user?.email || 'Invitado'}</li>
                <hr/>
                <li className="hover:bg-neutral-600 items-center px-4 py-2">
                  <button onClick={() => navigate("/perfil")} className='w-full text-left'>Ajustes de cuenta</button>
                </li>
                <li className="hover:bg-neutral-600 items-center px-4 py-2">
                  <button onClick={handleLogout} className="w-full text-left">Cerrar sesión</button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <a className="p-2 hover:bg-neutral-700/50 rounded-xl border hover:border-neutral-600/50 text-base md:text-xs lg:text-sm border-transparent transition-all duration-300 animate-fade-in-down md:mt-1 lg:mt-0" href="/login">¡Inicia sesión!</a>
        )}
      </div>
    </header>
  );
};

export default Header;
