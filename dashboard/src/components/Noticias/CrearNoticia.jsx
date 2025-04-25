import { navigate } from "astro/virtual-modules/transitions-router.js";
import { toast } from "sonner";
import { z } from "zod";
import { format } from "date-fns";

const noticiaSchema = z.object({
  titulo: z.string().min(1, "El título es obligatorio."),
  descripcion: z.string().min(1, "La descripción es obligatoria."),
  imagen: z.string().url("La URL de la imagen no es válida.").optional(),
});

const AnadirNoticia = () => {
  const enviar = async (e) => {
    e.preventDefault();
    const noticia = {
      titulo: document.getElementById("titulo").value,
      descripcion: document.getElementById("descripcion").value,
      imagen: document.getElementById("imagen").value,
      fecha: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    };

    const validation = noticiaSchema.safeParse(noticia);

    if (!validation.success) {
      const errorMessages = validation.error.errors.map((err) => err.message);
      errorMessages.forEach((msg) => toast.error(msg));
      return;
    }

    try {
      const respuesta = await fetch("http://127.0.0.1:8000/api/noticias/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validation.data),
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
    <div className="p-4">
      <h2 className="text-4xl font-bold mb-4 text-center">Añadir Noticia</h2>
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
