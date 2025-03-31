import React, { useState } from 'react';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        '/galeria/WhatsApp Image 2025-03-25 at 20.34.38.jpeg',
        '/galeria/WhatsApp Image 2025-03-25 at 20.45.20.jpeg',
        '/galeria/WhatsApp Image 2025-03-25 at 20.45.21.jpeg',
        '/galeria/WhatsApp Image 2025-03-25 at 20.46.26 (4).jpeg',
        '/galeria/WhatsApp Image 2025-03-25 at 20.46.27 (1).jpeg',
        '/galeria/WhatsApp Image 2025-03-25 at 20.48.39.jpeg',
        '/galeria/WhatsApp Image 2025-03-25 at 20.46.26 (5).jpeg',
        '/galeria/WhatsApp Image 2025-03-25 at 20.48.41.jpeg',
    ];

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); 
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="w-full max-w-screen-lg mx-auto py-24 px-6 bg-neutral-800 text-white">
            <div className="relative">
                <img
                    src={images[currentIndex]}
                    alt="Diseño de Tatuaje"
                    className=" max-h-[500px] h-auto rounded-lg mx-auto transition-all duration-300 shadow-2xl"
                />
                
                <button
                    alt="Diseño de Tatuaje"
                    onClick={prevImage}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2  text-white p-4 rounded-full  hover:scale-110 transition duration-150">
                    <img src="/svg/circle-arrow-left.svg" alt="flecha izquierda" className="w-10 h-10"/>
                </button>
                <button
                    onClick={nextImage}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2  text-white p-4  shover:scale-110 transition duration-150"
                >
                    <img src="/svg/circle-arrow-right.svg" alt="flecha izquierda" className="w-10 h-10"/>
                </button>
            </div>
        </div>
    );
};

export default Carousel;
