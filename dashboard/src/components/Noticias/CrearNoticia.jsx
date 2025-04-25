import { navigate } from "astro/virtual-modules/transitions-router.js";
import { toast } from "sonner";

const AnadirNoticia = () => {
  const enviar = async (e) => {
    e.preventDefault();
    const noticia = {
      titulo: document.getElementById("titulo").value,
      descripcion: document.getElementById("descripcion").value,
      imagen: document.getElementById("imagen").value,
      fecha: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
    try {
      const respuesta = await fetch("http://127.0.0.1:8000/api/noticias/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noticia),
      });
      if (respuesta.ok) {
        toast.success("Noticia enviada con éxito.");
        setTimeout(() => {
          navigate("/noticias");
        }, 1000);
      } else {
        toast.error("Error al enviar la noticia.");
        throw new Error("Error al enviar la noticia.");
      }
    } catch (error) {
      console.error("Error al enviar la noticia:", error);
    }
  };

  return (
  <div class="p-4">
    <h2 class="text-4xl font-bold mb-4 text-center">Añadir Noticia</h2>
    <hr />
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

      <label htmlFor="imagen" className="block mb-2 ">
        Imagen URL:
      </label>
      <input
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
