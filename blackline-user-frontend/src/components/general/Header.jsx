import { useState } from 'react';
import { useAuthStore } from '../../stores/authStore'; 
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
    <header className="fixed z-20 flex justify-between md:justify-center items-center w-full">
      <div className="bg-neutral-900 flex items-center md:justify-center gap-3 border-b border-b-neutral-600 w-screen h-24 backdrop-blur bg-opacity-30">
        <button
          className="text-white text-2xl md:hidden ml-2 p-2"
          onClick={handleMobileMenuToggle}
        >
          {isMobileMenuOpen 
          ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-x-icon lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
          : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu-icon lucide-menu"><path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/></svg>
          }
        </button>
        <ul
          className={`${
            isMobileMenuOpen ? 'block' : 'hidden'
          } justify-items-center md:flex justify-center items-center p-4 gap-5 md:gap-2 text-white md:static absolute top-24 left-0 w-full bg-neutral-800/80 animate-slide-in-top md:backdrop-blur-none md:bg-transparent`}
        >
          <li>
            <a href="/">          
              <img src="/favicon.svg" alt="logo" className='size-20 hover:scale-105 transition-transform duration-500 cursor-pointer md:mr-5' />
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-2 p-4 md:p-2 lg:p-4 hover:bg-neutral-700/50 rounded-2xl border hover:border-neutral-600/50 text-base md:text-xs lg:text-sm border-transparent transition-all duration-300"
              href="/"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house-icon lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              Inicio
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-2 p-4 md:p-2 lg:p-4 hover:bg-neutral-700/50 rounded-2xl border hover:border-neutral-600/50 text-base md:text-xs lg:text-sm border-transparent transition-all duration-300"
              href="/noticiero"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-newspaper-icon lucide-newspaper"><path d="M15 18h-5"/><path d="M18 14h-8"/><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2"/><rect width="8" height="4" x="10" y="6" rx="1"/></svg>
              Noticiero
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-2 p-4 md:p-2 lg:p-4 hover:bg-neutral-700/50 rounded-2xl border hover:border-neutral-600/50 text-base md:text-xs lg:text-sm border-transparent transition-all duration-300"
              href="/pidetucita"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-plus-icon lucide-calendar-plus"><path d="M16 19h6"/><path d="M16 2v4"/><path d="M19 16v6"/><path d="M21 12.598V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5"/><path d="M3 10h18"/><path d="M8 2v4"/></svg>
              Pide tu cita
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-2 p-4 md:p-2 lg:p-4 hover:bg-neutral-700/50 rounded-2xl border hover:border-neutral-600/50 text-base md:text-xs lg:text-sm border-transparent transition-all duration-300"
              href="/sorteos"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gift-icon lucide-gift"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>
              Sorteos
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-2 p-4 md:p-2 lg:p-4 hover:bg-neutral-700/50 rounded-2xl border hover:border-neutral-600/50 text-base md:text-xs lg:text-sm border-transparent transition-all duration-300"
              href="/diseños"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-images-icon lucide-images"><path d="M18 22H4a2 2 0 0 1-2-2V6"/><path d="m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18"/><circle cx="12" cy="8" r="2"/><rect width="16" height="16" x="6" y="2" rx="2"/></svg>
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
                loading='lazy'
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
