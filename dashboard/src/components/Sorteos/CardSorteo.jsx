const CardSorteo = ({ titulo, descripcion, fecha_inicio, fecha_fin, ganador, premios, participantes }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{titulo}</h2>
            <p className="text-gray-600 mb-4">{descripcion}</p>

            <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>Inicio: <strong>{new Date(fecha_inicio).toLocaleDateString()}</strong></span>
                <span>Fin: <strong>{new Date(fecha_fin).toLocaleDateString()}</strong></span>
            </div>

            <p className="text-gray-700 font-medium mb-4">
                Ganador: <span className="text-blue-500">{ganador || 'Pendiente'}</span>
            </p>

            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Premios</h3>
                <ul className="list-disc list-inside text-gray-700">
                    {premios && premios.length > 0 ? (
                        premios.map((premio, index) => <li key={index}>{premio}</li>)
                    ) : (
                        <li>No hay premios disponibles</li>
                    )}
                </ul>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Participantes</h3>
                <ul className="list-disc list-inside text-gray-700">
                    {participantes && participantes.length > 0 ? (
                        participantes.map((participante, index) => (
                            <li key={index}>{participante.instagram_username}</li>
                        ))
                    ) : (
                        <li>No hay participantes</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default CardSorteo;
