import React from 'react';

const DiseñosModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0  bg-black bg-opacity-80  flex items-center justify-center z-50"
            onClick={handleBackdropClick}
        >
            <div className="relative max-w-3xl w-full h-[75%] mx-4 bg-neutral-800 p-6 rounded-lg">
                <button
                    className="absolute top-2 right-4 text-white text-3xl font-bold hover:text-red-400 transition"
                    onClick={onClose}
                >
                    &times;
                </button>
                <span className='flex flex-col gap-3 mt-2'>
                    <h1 className='text-2xl' >Selecciona un diseño</h1>
                    <hr className='border border-neutral-500'/>
                </span>
            </div>
        </div>
    );
};

export default DiseñosModal;
