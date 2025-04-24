import React from 'react';

const Noticia = ({ titulo, descripcion, fecha, imagen }) => {
    return (
        <div className="flex flex-col md:flex-row items-center gap-6 border-2 border-white p-6 rounded-2xl bg-black bg-opacity-20 w-full transition duration-500 ease-in-out shadow-xl hover:scale-[1.02] hover:bg-opacity-40 hover:border-gray-400">
            {imagen && (
                <img
                    src={imagen}
                    alt="Imagen de la noticia"
                    className="w-full md:w-48 h-48 object-cover rounded-xl shadow-md"
                />
                )}

            <div className="flex flex-col justify-between text-left w-full">
                <h2 className="text-2xl text-white font-bold mb-2">{titulo}</h2>
                <p className="text-base text-gray-200 mb-4">{descripcion}</p>
                <p className="text-sm text-gray-400 italic">Fecha: {fecha}</p>
            </div>
        </div>
    );
};

export default Noticia;
