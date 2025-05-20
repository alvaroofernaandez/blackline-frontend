import React, { useEffect, useState } from 'react';
import CardDiseñoModal from './CardDiseñoModal';
import { se } from 'date-fns/locale';

const DiseñosModal = ({ isOpen, onClose }) => {
    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);


    useEffect(() => {
        if (isOpen) {
        const fetchData = async () => {
            const token = document.cookie
                .split("; ")
                .find((row) => row.startsWith("accessToken="))
                ?.split("=")[1];
            if (!token) {
                console.error("Token no encontrado");
                return;
            }
            try {
                const response = await fetch('http://localhost:8000/api/diseños/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Error al obtener los diseños');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        }
    }, [isOpen]);

    useEffect(() => {
        console.log('Selected ID:', selectedId);
    }, [selectedId]);

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
                    onClick={() => {
                        const selectedDesign = null;
                        onClose(selectedDesign);
                    }}
                    aria-label="Close modal"
                >
                    &times;
                </button>
                <div className="flex flex-col gap-4 mt-4">
                    <h1 className="text-2xl font-semibold text-white">Selecciona un diseño</h1>
                    <hr className="border border-neutral-600" />
                    <div className="flex flex-wrap gap-4 items-center justify-center h-[35rem] md:h-[45rem] lg:h-[35rem] overflow-y-auto p-2">
                        {data.map((diseño) => (
                        <CardDiseñoModal
                            key={diseño.id}
                            diseño={diseño}
                            isSelected={selectedId === diseño.id}
                            onSelect={() => setSelectedId(diseño.id)}
                        />
                        ))}

                    </div>
                </div>
                <button
                    className="block px-4 py-2 mt-4 mx-auto text-white bg-neutral-700 border border-neutral-500 rounded-md hover:bg-neutral-600 hover:scale-105 transition-all duration-300"
                    onClick={() => {
                        const selectedDesign = data.find((d) => d.id === selectedId);
                        onClose(selectedDesign);
                    }}
                    disabled={!selectedId}
                >
                    Seleccionar
                </button>
            </div>
        </div>
    );
};

export default DiseñosModal;
