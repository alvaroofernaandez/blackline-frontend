import React, { useState, useEffect } from 'react';
import Noticia from './Noticia';

const noticiasPorPagina = 3; // Número de noticias por página

const Noticiero = () => {
    const [paginaActual, setPaginaActual] = useState(1);
    const [noticias, setNoticias] = useState([]);

    const formatearFecha = (fechaISO) => {
        const fecha = new Date(fechaISO);
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const anio = fecha.getFullYear();
        const horas = fecha.getHours().toString().padStart(2, '0');
        const minutos = fecha.getMinutes().toString().padStart(2, '0');
    
        return `${dia}/${mes}/${anio} - ${horas}:${minutos}`;
    };
    


    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/noticias');
                const data = await response.json();
                setNoticias(data);
            } catch (error) {
                console.error('Error al obtener las noticias:', error);
            }
        };
        fetchNoticias();
    }, []);
    

    const totalPaginas = Math.ceil(noticias.length / noticiasPorPagina);
    const inicio = (paginaActual - 1) * noticiasPorPagina;
    const noticiasPaginadas = noticias.slice(inicio, inicio + noticiasPorPagina);

    return (
        <div className='flex flex-col gap-12 max-w-4xl mx-auto my-32'>
            <h1 className='text-4xl text-white font-bold'>Noticias</h1>
            <hr />
            {noticiasPaginadas.map(noticia => (
                <Noticia key={noticia.id} titulo={noticia.titulo} descripcion={noticia.descripcion}  fecha={formatearFecha(noticia.fecha)} />
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