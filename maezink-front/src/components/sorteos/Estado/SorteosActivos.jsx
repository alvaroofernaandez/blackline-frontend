import React, { useEffect, useState } from 'react';
import { useSorteosStore } from '../../../stores/sorteosStore';

const SorteosActivos = () => {
    const { sorteosActivos, fetchSorteos } = useSorteosStore();
    const [tiempos, setTiempos] = useState({});

    useEffect(() => {
        fetchSorteos();
    }, [fetchSorteos]);

    useEffect(() => {
        const interval = setInterval(() => {
            const nuevosTiempos = {};

            sorteosActivos.forEach((sorteo) => {
                const fin = new Date(sorteo.fecha_fin).getTime();
                const ahora = new Date().getTime();
                const diferencia = fin - ahora;

                if (diferencia <= 0) {
                    nuevosTiempos[sorteo.id] = null;
                } else {
                    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
                    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
                    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

                    nuevosTiempos[sorteo.id] = { dias, horas, minutos, segundos };
                }
            });

            setTiempos(nuevosTiempos);
        }, 1000);

        return () => clearInterval(interval);
    }, [sorteosActivos]);

    return (
        <div>
            {sorteosActivos.map((sorteo) => {
                const tiempo = tiempos[sorteo.id];

                return (
                    <div key={sorteo.id} className="max-w-2xl mx-auto mt-28 px-6 py-12 bg-neutral-900 border border-neutral-700 rounded-xl shadow-xl text-white space-y-8">
                        
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight mb-3">{sorteo.titulo}</h1>
                            <p className="text-lg text-neutral-400">{sorteo.descripcion}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-center mb-4">Lista de premios</h2>
                            <ul className="list-disc list-inside text-neutral-300 space-y-2 max-w-xs mx-auto">
                                {sorteo.premios.map((premio, i) => {
                                    const icon = i === 0 ? '🥇 Primer lugar: ' : i === 1 ? '🥈 Segundo lugar: ' : i === 2 ? '🥉 Tercer lugar: ' : '';
                                    return (
                                        <li key={i} className="leading-relaxed">
                                            {icon} {premio}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-center mb-6">Tiempo restante</h2>
                            {tiempo ? (
                                <div className="flex justify-center gap-5 text-center">
                                    {[
                                        { label: 'Días', value: tiempo.dias },
                                        { label: 'Horas', value: tiempo.horas },
                                        { label: 'Min', value: tiempo.minutos },
                                        { label: 'Seg', value: tiempo.segundos },
                                    ].map((t, i) => (
                                        <div key={i}>
                                            <div className="bg-black bg-opacity-30 border border-neutral-600 px-5 py-4 rounded-lg text-2xl font-mono font-bold shadow-inner min-w-[70px]">
                                                {String(t.value).padStart(2, '0')}
                                            </div>
                                            <p className="mt-2 text-sm text-neutral-400">{t.label}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-lg font-thin text-neutral-500">Cargando...</p>
                            )}
                        </div>

                        <div className="text-center pt-4 border-t border-neutral-700">
                            <span className="text-sm text-neutral-400">
                                Número de participantes:
                            </span>
                            <p className="inline-block mt-1 bg-neutral-800 text-white font-medium px-4 py-2 ml-5 rounded-full">
                                {sorteo.participantes.length}
                            </p>
                        </div>

                        <div className='flex justify-center'>
                            <a href={`/apuntarse-sorteo/${sorteo.id}`} className="border p-1 pl-3 pr-3 rounded-xl hover:bg-neutral-700 transition-all duration-300">¡Apúntate!</a>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SorteosActivos;
