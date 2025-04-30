import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import Modal from "../General/Modal";
import { z } from "zod";
import { useDiseños } from "../../hooks/useDiseños";
import { navigate } from "astro/virtual-modules/transitions-router.js";

const DiseñoSchema = z.object({
  id: z.number(),
  image: z.string().optional(),
  titulo: z.string(),
  descripcion: z.string(),
  precio: z.string().optional(),
  alto: z.number(),
  ancho: z.number(),
});

const CardDiseño = (props) => {
  const {
    id,
    image,
    titulo,
    descripcion,
    precio,
    alto,
    ancho,
  } = DiseñoSchema.parse(props);

  const [showModal, setShowModal] = useState(false);
  const { eliminarDiseño } = useDiseños();

  const handleEliminarDiseño = async (id) => {
    const success = await eliminarDiseño(id);
    if (success) {
      setShowModal(false);
      setTimeout(() => { navigate("/diseños"); }, 200);
    }
  };

  return (
    <div className="group relative dark:bg-neutral-900 bg-neutral-500 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 overflow-hidden shadow-lg transition-all duration-500 cursor-pointer after:absolute after:inset-0 after:-z-10 after:rounded-2xl after:-translate-y-full after:transition-transform after:duration-500 hover:after:translate-y-0">
      <img
        src={image}
        alt={titulo}
        className="w-40 h-40 object-contain rounded-full bg-[#abd373] p-2 transition-all duration-500 group-hover:-translate-y-2"
      />
      
      <h2 className="text-xl font-bold text-neutral-200 tracking-widest text-center group-hover:text-neutral-100">
        {titulo} ({alto} x {ancho} cm)
      </h2>

      <p className="text-neutral-300 text-sm text-center font-medium px-2 group-hover:text-neutral-200 transition-colors">
        {descripcion}
      </p>

      <div className="flex flex-row justify-between items-center w-full mt-4 ">
        <p className="text-[#abd373] font-semibold">
          {precio} €
        </p>
        
        <div className="flex gap-2">
          <button
            onClick={() => (navigate(`/actualizar-diseño/${id}`))}
            className="bg-[#abd373] text-gray-900 font-bold py-2 px-4 rounded-lg text-sm hover:bg-[#92b950] transition-all duration-300"
          >
            <AiFillEdit className="size-5" />
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-neutral-600 dark:bg-neutral-800 text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-neutral-700 dark:hover:bg-neutral-700 transition-all duration-300"
          >
            <FaRegTrashAlt className="size-5" />
          </button>
        </div>
      </div>

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          eliminarObjeto={handleEliminarDiseño}
          id={id}
        />
      )}
    </div>
  );
};

export default CardDiseño;
