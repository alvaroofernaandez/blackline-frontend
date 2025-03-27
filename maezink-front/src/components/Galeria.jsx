import React, { useState } from 'react';
import ImagenModal from './ImagenModal';

const Galeria = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="grid columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 ">
        {images.map((file, index) => (
          <img
            key={index}
            src={`/galeria/${file}`}
            alt={`Tatuaje ${index + 1}`}
            className="w-full rounded-xl shadow-2xl break-inside-avoid object-cover hover:scale-105 transition-all duration-300 cursor-pointer"
            loading="lazy"
            onClick={() => setSelectedImage(`/galeria/${file}`)}
          />
        ))}
      </div>

      <ImagenModal
        isOpen={!!selectedImage}
        imageSrc={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
};

export default Galeria;
