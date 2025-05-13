import React, { useState, useEffect } from 'react';
import Noticia from './Noticia';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { z } from 'zod';
import { toast } from 'sonner';

const noticiasPorPagina = 2;

const noticiaSchema = z.object({
    id: z.string(),
    titulo: z.string(),
    descripcion: z.string(),
    fecha: z.string(),
    imagen: z.string().optional(),
});

const Noticiero = () => {
    const [paginaActual, setPaginaActual] = useState(1);
    const [noticias, setNoticias] = useState([]);

    const formatearFecha = (fechaISO) => {
        return format(new Date(fechaISO), "dd/MM/yyyy - HH:mm", { locale: es });
    };

    useEffect(() => {
        const fetchNoticias = async () => {
            try {
            const res = await fetch("http://127.0.0.1:8000/api/noticias", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            });
            const raw = await res.json();
            const validadas = raw.map((n) => noticiaSchema.parse(n));
            if (validadas.length === 0) {
                toast.info("No hay noticias disponibles");
            }
            setNoticias(validadas);
            } catch (err) {
            toast.error("Error al cargar las noticias");
            }
        };
        fetchNoticias();
    }, []);

    const totalPaginas = Math.ceil(noticias.length / noticiasPorPagina);
    const inicio = (paginaActual - 1) * noticiasPorPagina;
    const noticiasPaginadas = noticias.slice(inicio, inicio + noticiasPorPagina);

    return (
        <div className='flex flex-col gap-5 max-w-4xl mx-auto my-32'>
            <h1 className='text-4xl text-white font-bold'>Noticias</h1>
            <hr />
            {noticiasPaginadas.map(noticia => (
                <Noticia key={noticia.id} titulo={noticia.titulo} descripcion={noticia.descripcion} fecha={formatearFecha(noticia.fecha)} imagen={noticia.imagen} />
            ))}

            <div className='flex justify-center gap-4 items-center'>
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
