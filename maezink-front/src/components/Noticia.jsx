import React from 'react';

const Noticia = () => {
    return (
        <div className="border-2 border-white p-8 rounded-xl bg-black bg-opacity-20 w-full transition duration-500 ease-in-out shadow-xl hover:scale-105 hover:bg-opacity-40 hover:border-gray-400">
            <h2 className="text-2xl text-white font-semibold">Título de la Noticia</h2>
            <p className="text-lg text-gray-200 mb-4">Descripción breve de la noticia, manteniendo un diseño limpio y minimalista.</p>
            <p className="text-md text-gray-200">Fecha: 2023-12-01</p>
        </div>
    );
}

export default Noticia;
