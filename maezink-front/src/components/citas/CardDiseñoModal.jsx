import { useState } from 'react';

function CardDiseñoModal({ diseño }) {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelection = () => {
    setIsSelected(!isSelected);
  };

  return (
    <button
      className={`relative flex rounded-xl items-center mt-3 ${
        isSelected
          ? 'border scale-105 transition-transform border-white'
          : 'border border-neutral-500'
      }`}
      onClick={handleSelection}
    >
      <div className="relative"></div>
      <img
        src={diseño.image || '/foto.jpeg'}
        alt={`Imagen del diseño ${diseño.nombre || ''}`}
        className="w-52 h-64 rounded-xl object-cover"
      />
      <h4 className="absolute bottom-2 right-2 bg-opacity-75 bg-black text-white px-2 py-1 rounded">
        {diseño.precio ? `${diseño.precio} €` : '(Precio) €'}
      </h4>
      <a
        href="/diseños/"
        className="absolute bottom-2 left-2 bg-opacity-75 bg-black text-white px-2 py-1 rounded font-semibold underline hover:text-neutral-300 transition-colors duration-300"
      >
        Ver detalles
      </a>
    </button>
  );
}

export default CardDiseñoModal;
