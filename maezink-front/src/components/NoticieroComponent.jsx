import React, { useState } from 'react';
import Noticia from './Noticia';

const noticiasPorPagina = 3; // Número de noticias por página

const Noticiero = () => {
    const [paginaActual, setPaginaActual] = useState(1);
    const noticias = [
        { id: 1, titulo: "Título 1", descripcion: "Descripción 1", fecha: "Fecha 1" },
        { id: 2, titulo: "Título 2", descripcion: "Descripción 2", fecha: "Fecha 2" },
        { id: 3, titulo: "Título 3", descripcion: "Descripción 3", fecha: "Fecha 3" },
        { id: 4, titulo: "Título 4", descripcion: "Descripción 4", fecha: "Fecha 4" }
    ];

    const totalPaginas = Math.ceil(noticias.length / noticiasPorPagina);
    const inicio = (paginaActual - 1) * noticiasPorPagina;
    const noticiasPaginadas = noticias.slice(inicio, inicio + noticiasPorPagina);

    return (
        <div className='flex flex-col gap-12 max-w-4xl mx-auto my-32'>
            <h1 className='text-4xl text-white font-bold'>Noticias</h1>
            <hr />
            {noticiasPaginadas.map(noticia => (
                <Noticia key={noticia.id} titulo={noticia.titulo} descripcion={noticia.descripcion} fecha={noticia.fecha} />
            ))}
            
            <div className='flex justify-center gap-4'>
                <button
                    className="px-4 py-2 text-white rounded border enabled:border-white disabled:bg-gray-400 disabled:border-gray-800"
                    onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))}
                    disabled={paginaActual === 1}
                >
                    Anterior
                </button>
                <span className='text-white'>{paginaActual} / {totalPaginas}</span>
                <button
                    className="px-4 py-2 text-white rounded border enabled:border-white disabled:bg-gray-400 disabled:border-gray-800"
                    onClick={() => setPaginaActual(prev => Math.min(prev + 1, totalPaginas))}
                    disabled={paginaActual === totalPaginas}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default Noticiero;