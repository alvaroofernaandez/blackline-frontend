import React, { useEffect, useState } from 'react';

const TablaNoticias = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/noticias")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setData(data)})
        .catch(error => console.error('Error:', error));
    }, []);

    return (
        <table className="w-full border-collapse border border-gray-300">
            <thead>
                <tr>
                    <th className="border border-gray-300 p-2">Título</th>
                    <th className="border border-gray-300 p-2">Descripción</th>
                    <th className="border border-gray-300 p-2">Fecha</th>
                    <th className="border border-gray-300 p-2">Imagen</th>
                </tr>
            </thead>
            <tbody>
                {data.map((fila, index) => (
                    <tr key={index}>
                        <td className="border border-gray-300 p-2">{fila.titulo}</td>
                        <td className="border border-gray-300 p-2">{fila.descripcion}</td>
                        <td className="border border-gray-300 p-2">{fila.fecha}</td>
                        <td className="border border-gray-300 p-2">
                            <img src={fila.imagen} className="w-24" alt="Imagen de noticia"/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TablaNoticias;
