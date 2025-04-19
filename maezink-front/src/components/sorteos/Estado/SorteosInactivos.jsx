import React from 'react';

const SorteosInactivos = () => {
    return (
        <div className="max-w-2xl mx-auto py-24 px-4 text-center">
            <h1 className="text-3xl font-semibold text-gray-100 mb-4">No hay sorteos disponibles</h1>
            <p className="text-neutral-600 text-lg">
                En este momento no hay sorteos activos. Te avisaremos cuando se publiquen nuevas oportunidades para participar.
            </p>
            <img 
                alt='Gato' 
                src="/gato.png" 
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto" 
            />
        </div>
    );
};

export default SorteosInactivos;
