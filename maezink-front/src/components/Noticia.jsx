import React from 'react';

const Noticia = ({ titulo, descripcion, fecha }) => {
    return (
        <div className="border-2 border-white p-8 rounded-xl bg-black bg-opacity-20 w-full transition duration-500 ease-in-out shadow-xl hover:scale-105 hover:bg-opacity-40 hover:border-gray-400">
            <h2 className="text-2xl text-white font-semibold">{titulo}</h2>
            <p className="text-lg text-gray-200 mb-4">{descripcion}</p>
            <p className="text-md text-gray-200">Fecha: {fecha}</p>
        </div>
    );
}

export default Noticia;
