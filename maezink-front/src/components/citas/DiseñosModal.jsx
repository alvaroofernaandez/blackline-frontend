import React from 'react';
import CardDiseñoModal from './CardDiseñoModal';

const DiseñosModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0  bg-black/70 flex items-center justify-center z-50"
            onClick={handleBackdropClick}
        >
            <div className="relative max-w-3xl w-full h-[78%] mx-4 bg-gradient-to-tl border border-neutral-800 from-neutral-800 via-neutral-900 to-neutral-950 p-6 rounded-lg">
                <button
                    className="absolute top-2 right-4 text-white text-3xl font-bold hover:text-red-400 transition"
                    onClick={onClose}
                >
                    &times;
                </button>
                <span className='flex flex-col gap-3 mt-2'>
                    <h1 className='text-2xl' >Selecciona un diseño</h1>
                    <hr className='border border-neutral-500'/>

                    <div className='flex columns-3 gap-4 items-center justify-center h-[35rem] md:h-[45rem] lg:h-[35rem] flex-wrap mt-10 overflow-y-scroll'>
                        <CardDiseñoModal />
                        <CardDiseñoModal />
                        <CardDiseñoModal />
                        <CardDiseñoModal />
                        <CardDiseñoModal />
                        <CardDiseñoModal />
                        <CardDiseñoModal />
                        <CardDiseñoModal />
                        <CardDiseñoModal />
                        <CardDiseñoModal />
                        <CardDiseñoModal />
                        <CardDiseñoModal />
                        
                    </div>
                </span>
            </div>
        </div>
    );
};

export default DiseñosModal;
