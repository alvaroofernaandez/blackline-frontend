import { useState } from "react";
import { format } from "date-fns";
import { navigate } from "astro/virtual-modules/transitions-router.js";
import { useNoticias } from "../../hooks/useNoticias"; 

const AnadirNoticia = () => {
  const { crearNoticia } = useNoticias();
  const [cargando, setCargando] = useState(false);

  const enviar = async (e) => {
    e.preventDefault();
    setCargando(true);

    const noticia = {
      titulo: e.target.titulo.value,
      descripcion: e.target.descripcion.value,
      imagen: e.target.imagen.value,
      fecha: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    };

    const exito = await crearNoticia(noticia);
    if (exito) {
      setTimeout(() => navigate("/noticias"), 1000);
    } else {
      setCargando(false); 
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={enviar} className="max-w-[90%] md:max-w-[70%] lg:max-w-[30%] mx-auto mt-20 animate-fade-in">
        <label htmlFor="titulo" className="block mb-2">
          Título:
        </label>
        <input
          type="text"
          id="titulo"
          placeholder="Escribe el título..."
          name="titulo"
          className="border border-gray-300 rounded-lg text-black p-2 w-full mb-4"
          required
        />

        <label htmlFor="descripcion" className="block mb-2">
          Descripción:
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          placeholder="Escribe la descripción..."
          className="border border-gray-300 rounded-lg text-black p-2 w-full mb-4"
          required
        ></textarea>

        <label htmlFor="imagen" className="block mb-2">
          Imagen URL:
        </label>
        <input
          type="text"
          id="imagen"
          placeholder="Escribe la URL de la imagen..."
          name="imagen"
          className="border border-gray-300 rounded-lg text-black p-2 w-full mb-4"
        />

        <button
          type="submit"
          aria-label="Enviar noticia"
          className="dark:bg-neutral-900 bg-neutral-600 text-white rounded-lg p-2 dark:hover:bg-neutral-950 hover:bg-neutral-500 transition-all mt-10 w-full"
          disabled={cargando}
        >
          {cargando ? "Cargando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
};

export default AnadirNoticia;
