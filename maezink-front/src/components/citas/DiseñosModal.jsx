import React, { useEffect, useState } from 'react';
import CardDiseñoModal from './CardDiseñoModal';

const DiseñosModal = ({ isOpen, onClose }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (isOpen) {
            fetch('http://127.0.0.1:8000/api/diseños')
                .then((response) => response.json())
                .then((data) => {
                    setData(data);
                    console.log(data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={handleBackdropClick}
        >
            <div className="relative max-w-3xl w-full h-[78%] mx-4 bg-gradient-to-tl from-neutral-800 via-neutral-900 to-neutral-950 p-6 rounded-lg shadow-lg">
                <button
                    className="absolute top-2 right-4 text-white text-3xl font-bold hover:text-red-400 transition-transform transform hover:scale-110"
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    &times;
                </button>
                <div className="flex flex-col gap-4 mt-4">
                    <h1 className="text-2xl font-semibold text-white">Selecciona un diseño</h1>
                    <hr className="border border-neutral-600" />
                    <div className="flex flex-wrap gap-4 items-center justify-center h-[35rem] md:h-[45rem] lg:h-[35rem] overflow-y-auto p-2">
                        {data.length > 0 ? (
                            data.map((diseño, index) => (
                                <CardDiseñoModal key={index} diseño={diseño} />
                            ))
                        ) : (
                            <p className="text-neutral-400">No hay diseños disponibles.</p>
                        )}
                    </div>
                </div>
                <button
                    className="block px-4 py-2 mt-4 mx-auto text-white bg-neutral-700 border border-neutral-500 rounded-md hover:bg-neutral-600 hover:scale-105 transition-all duration-300"
                    onClick={() => console.log('Seleccionar button clicked')}
                >
                    Seleccionar
                </button>
            </div>
        </div>
    );
};

export default DiseñosModal;
