import { useState } from "react";
import { FaNewspaper, FaUsers, FaPaintBrush, FaCalendarAlt } from "react-icons/fa";
import { IoIosGift } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { GrDocumentPdf } from "react-icons/gr";
import { GoHome } from "react-icons/go";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMenu, setCurrentMenu] = useState("main");

    const goBack = () => setCurrentMenu("main");

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button
                type="button"
                aria-label="Toggle sidebar"
                className="lg:hidden fixed top-5 left-4 z-50 bg-neutral-900 text-white p-2 rounded-md"
                onClick={toggleSidebar}
            >
                {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </button>

            <nav
                className={`fixed lg:static top-0 left-0 h-full bg-gradient-to-b from-neutral-600 via-neutral-700 to-neutral-800 dark:bg-neutral-900 dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] border-r border-neutral-700 text-white w-64 min-h-screen flex flex-col py-8 transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 transition-transform duration-300 z-40`}
                
            >
                <div className="text-2xl font-bold text-center mb-10 tracking-wide">
                    <a href="/">
                        <img src="/favicon.svg" alt="Logo" className="w-40 mx-auto animate-blurred-fade-in" loading="lazy" />
                    </a>
                </div>

                <hr className="dark:border-neutral-700 border-neutral-500 mb-6" />

                <ul className="animate-fade-in-up">
                    <li>
                        <a
                            href="/"
                            className="flex items-center gap-3 p-3 pl-10 hover:bg-neutral-600 dark:hover:bg-neutral-700 transition-all duration-200 font-normal text-md"
                        >
                            <GoHome className="size-4" />
                            Inicio
                        </a>
                    </li>
                </ul>

                <hr className="dark:border-neutral-700 border-neutral-500 mb-6 mt-6" />
                {currentMenu == "main" ? (
                    <ul className="flex flex-col gap-2 animate-fade-in-up">
                        <li>
                            <a
                                href="/noticias"
                                className="flex items-center gap-3 p-3 pl-10 hover:bg-neutral-600 dark:hover:bg-neutral-700 transition-all duration-200 font-normal text-md"
                            >
                                <FaNewspaper className="size-4" />
                                Noticias
                            </a>
                        </li>
                        <li>
                            <a
                                href="/sorteos"
                                className="flex items-center gap-3 p-3 pl-10 hover:bg-neutral-600 dark:hover:bg-neutral-700 transition-all duration-200 font-normal text-md"
                            >
                                <IoIosGift className="size-4" />
                                Sorteos
                            </a>
                        </li>
                        <li>
                            <a
                                href="/diseños"
                                className="flex items-center gap-3 p-3 pl-10 hover:bg-neutral-600 dark:hover:bg-neutral-700 transition-all duration-200 font-normal text-md"
                            >
                                <FaPaintBrush className="size-4" />
                                Diseños
                            </a>
                        </li>
                        <li>
                            <a
                                href="/usuarios"
                                className="flex items-center gap-3 p-3 pl-10 hover:bg-neutral-600 dark:hover:bg-neutral-700 transition-all duration-200 font-normal text-md"
                            >
                                <FaUsers className="size-4" />
                                Usuarios
                            </a>
                        </li>
                        <li>
                            <button
                                type="button"
                                aria-label="Correo"
                                onClick={() => setCurrentMenu("mail")}
                                className="flex items-center gap-3 p-3 pl-10 hover:bg-neutral-600 dark:hover:bg-neutral-700 transition-all duration-200 font-normal text-md w-full"
                            >
                                <MdOutlineEmail className="size-4" />
                                Correo
                            </button>
                        </li>
                        <li>
                            <a
                                href="/citas"
                                className="flex items-center gap-3 p-3 pl-10 hover:bg-neutral-600 dark:hover:bg-neutral-700 transition-all duration-200 font-normal text-md"
                            >
                                <FaCalendarAlt className="size-4" />
                                Citas
                            </a>
                        </li>
                        <li>
                            <a
                                href="/facturas"
                                className="flex items-center gap-3 p-3 pl-10 hover:bg-neutral-600 dark:hover:bg-neutral-700 transition-all duration-200 font-normal text-md"
                            >
                                <GrDocumentPdf className="size-4" />
                                Facturas
                            </a>
                        </li>
                    </ul>
                )
                :
                currentMenu == "mail" ? (
                    <ul className="flex flex-col gap-2">
                        <li>
                            <button
                                type="button"
                                aria-label="Volver"
                                onClick={goBack}
                                className="flex items-center gap-3 p-3 pl-10 hover:bg-neutral-600 dark:hover:bg-neutral-700 transition-all duration-200 font-normal text-md w-full"
                            >
                                <FaArrowLeftLong className="size-4" />
                                Volver
                            </button>
                        </li>
                        <li>
                            <a
                            href="/correo-individual"
                            className="flex items-center gap-3 p-3 pl-10 hover:bg-neutral-600 dark:hover:bg-neutral-700 transition-all duration-200 font-normal text-md"
                            >
                                <FaUser className="size-4" />
                                Usuario individual
                            </a>
                        </li>
                        <li>
                            <a
                            href="/correo-masivo"
                            className="flex items-center gap-3 p-3 pl-10 hover:bg-neutral-600 dark:hover:bg-neutral-700 transition-all duration-200 font-normal text-md"
                            >
                                <FaUsers className="size-4" />
                                Todos los usuarios
                            </a>
                        </li>
                    </ul>
                ):null}

                <div className="mt-auto font-thin pt-6 text-xs text-neutral-400 text-center border-t dark:border-neutral-700 border-neutral-500">
                    TATTOO STUDIO © 2025
                </div>
            </nav>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
};

export default Sidebar;
