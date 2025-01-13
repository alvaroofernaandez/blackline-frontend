import {useEffect, useState} from 'react';
import CardSorteo from './CardSorteo';

const TablaSorteos = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/sorteos/")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setData(data)
        })
        .catch(error => console.error('Error:', error));

    }, []);
    

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Sorteos</h2>
            <div className="w-full border border-gray-300">
                    {data.map((fila, index) => (
                        <div key={index}>
                            <CardSorteo 
                                titulo={fila.titulo} 
                                descripcion={fila.descripcion} 
                                fecha_inicio={fila.fecha_inicio} 
                                fecha_fin={fila.fecha_fin} 
                                ganador={fila.ganador} 
                                premios={Array.isArray(fila.premios) ? fila.premios : []} 
                                participantes={fila.participantes || []} 
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default TablaSorteos;
