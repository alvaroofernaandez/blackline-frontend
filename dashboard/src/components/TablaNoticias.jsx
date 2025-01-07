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

    const formatearFecha = (fecha) => {
        const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(fecha).toLocaleDateString('es-ES', opciones);
    };

    const eliminarNoticia = async (id) => {
        try {
            const respuesta = await fetch(`http://127.0.0.1:8000/noticias/${id}/`, {
                method: 'DELETE'
            });
            if (respuesta.ok) {
                console.log('Noticia eliminada:', id);
                alert("Noticia eliminada con éxito.");
                setData(data.filter(noticia => noticia.id !== id));
            } else {
                console.error('Error al eliminar la noticia:', await respuesta.text());
                alert("Error al eliminar la noticia.");
            }
        } catch (e) {
            console.error('Error al eliminar la noticia:', e);
            alert("Error al eliminar la noticia.");
        }
    }

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
                        <td className="border border-gray-300 p-2">{formatearFecha(fila.fecha)}</td>
                        <td className="border border-gray-300 p-2">
                            <img src={fila.imagen} className="w-24" alt="Imagen de noticia"/>
                        </td>
                        <td>
                            <button className="bg-blue-950 text-white rounded-lg p-2 hover:bg-blue-700 transition-colors" onClick={() => eliminarNoticia(fila.id)}>Editar</button>
                            <button className="bg-red-500 text-white rounded-lg p-2 ml-2 hover:bg-red-400 transition-colors" onClick={() => eliminarNoticia(fila.id)}>Borrar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TablaNoticias;
