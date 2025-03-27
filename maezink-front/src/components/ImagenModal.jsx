import React from 'react';

const ImagenModal = ({ isOpen, imageSrc, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-xl flex items-center justify-center z-50">
      <div className="relative max-w-3xl w-full mx-4">
        <button
          className="absolute top-2 right-2 text-white text-3xl font-bold hover:text-red-400 transition"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={imageSrc}
          alt="Imagen ampliada"
          className="rounded-xl mx-auto max-h-[90vh] object-contain shadow-2xl"
        />
      </div>
    </div>
  );
};

export default ImagenModal;
