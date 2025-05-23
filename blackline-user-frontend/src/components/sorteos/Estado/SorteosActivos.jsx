import { useEffect, useState } from 'react';
import { useSorteosStore } from '../../../stores/sorteosStore';
import Button from '../../general/Button';
import { navigate } from 'astro/virtual-modules/transitions-router.js';

const SorteosActivos = () => {
    const { sorteosActivos, fetchSorteos } = useSorteosStore();

    useEffect(() => {
        fetchSorteos();
    }, [fetchSorteos]);

    return (
        <div>
            {sorteosActivos.map((sorteo) => (
                <div
                    key={sorteo.id}
                    className="max-w-sm md:max-w-2xl mx-auto mt-28 px-6 py-12 bg-neutral-900 border border-neutral-700 rounded-xl shadow-xl text-white space-y-8"
                >
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight mb-3">{sorteo.titulo}</h1>
                        <p className="text-lg text-neutral-400">{sorteo.descripcion}</p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-center mb-4">Lista de premios</h2>
                        <ul className="list-disc list-inside text-neutral-300 space-y-2 max-w-xs mx-auto">
                            {sorteo.premios.map((premio, i) => {
                                const icon =
                                    i === 0
                                        ? '🥇 Primer lugar: '
                                        : i === 1
                                        ? '🥈 Segundo lugar: '
                                        : i === 2
                                        ? '🥉 Tercer lugar: '
                                        : '';
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
                        <Countdown timestamp={new Date(sorteo.fecha_fin).getTime()} />
                    </div>

                    <div className="text-center pt-4 border-t border-neutral-700">
                        <span className="text-sm text-neutral-400">Número de participantes:</span>
                        <p className="inline-block mt-1 bg-neutral-800 text-white font-medium px-4 py-2 ml-5 rounded-full">
                            {sorteo.participantes.length}
                        </p>
                    </div>

                    <div className="flex justify-center">
                        {sorteo.usuarioActualParticipando ? (
                            <p className="text-green-500 font-semibold">¡Ya estás participando!</p>
                        ) : (
                            <Button
                                label="¡Apúntate!"
                                onClick={() => navigate(`/apuntarse-sorteo/${sorteo.id}`)}
                                type="button"
                                className="mt-4"
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

const Countdown = ({ timestamp }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(timestamp));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft(timestamp));
        }, 1000);

        return () => clearInterval(interval);
    }, [timestamp]);

    if (!timeLeft) {
        return <p className="text-center text-lg font-thin text-neutral-500">Finalizado</p>;
    }

    return (
        <section
            className="flex flex-col items-center justify-center gap-2 py-2"
            aria-label="cuenta atrás entradas"
        >
            <div
                className="flex select-none flex-row items-center justify-center gap-1 text-[var(--color-white)]"
                role="timer"
            >
                {[
                    { label: 'DÍAS', value: timeLeft.dias },
                    { label: 'HORAS', value: timeLeft.horas },
                    { label: 'MINUTOS', value: timeLeft.minutos },
                    { label: 'SEGUNDOS', value: timeLeft.segundos },
                ].map((t, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div className="bg-black bg-opacity-30 border border-neutral-600 px-5 py-4 rounded-lg text-2xl font-mono font-bold shadow-inner min-w-[70px]">
                            {String(t.value).padStart(2, '0')}
                        </div>
                        <p className="mt-2 text-sm text-neutral-400">{t.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

const calculateTimeLeft = (timestamp) => {
    const now = new Date().getTime();
    const difference = timestamp - now;

    if (difference <= 0) return null;

    const dias = Math.floor(difference / (1000 * 60 * 60 * 24));
    const horas = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((difference % (1000 * 60)) / 1000);

    return { dias, horas, minutos, segundos };
};

export default SorteosActivos;
