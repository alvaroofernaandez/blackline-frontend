const SorteosInactivos = () => {
    return (
        <div className="max-w-2xl mx-auto py-24 px-4 text-center">
            <h1 className="text-3xl font-bold text-gray-100 mb-2">No hay sorteos disponibles</h1>
            <p className="text-neutral-500 text-lg">
                En este momento no hay sorteos activos. Te avisaremos cuando se publiquen nuevas oportunidades para participar.
            </p>
            <img 
                alt='Gato' 
                src="/gato.avif" 
                className="w-full max-w-xs mx-auto animate-slide-in-top duration-200" 
                loading="lazy"
            />
        </div>
    );
};

export default SorteosInactivos;
