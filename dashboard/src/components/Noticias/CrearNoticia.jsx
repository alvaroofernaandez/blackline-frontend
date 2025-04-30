import { format } from "date-fns";
import { navigate } from "astro/virtual-modules/transitions-router.js";
import { useNoticias } from "../../hooks/useNoticias"; 

const AnadirNoticia = () => {
  const { crearNoticia } = useNoticias();

  const enviar = async (e) => {
    e.preventDefault();

    const noticia = {
      titulo: e.target.titulo.value,
      descripcion: e.target.descripcion.value,
      imagen: e.target.imagen.value,
      fecha: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    };

    const exito = await crearNoticia(noticia);
    if (exito) {
      setTimeout(() => navigate("/noticias"), 1000);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={enviar} className="max-w-[50%] mx-auto mt-20">
        <label htmlFor="titulo" className="block mb-2">
          Título:
        </label>
        <input
          type="text"
          id="titulo"
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
          className="border border-gray-300 rounded-lg text-black p-2 w-full mb-4"
          required
        ></textarea>

        <label htmlFor="imagen" className="block mb-2">
          Imagen URL:
        </label>
        <input
          type="text"
          id="imagen"
          name="imagen"
          className="border border-gray-300 rounded-lg text-black p-2 w-full mb-4"
        />

        <button
          type="submit"
          className="bg-neutral-900 text-white rounded-lg p-2 hover:bg-neutral-800 transition-all mt-10 w-full"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default AnadirNoticia;
