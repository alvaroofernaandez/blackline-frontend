import React from 'react';
import { useEffect, useState } from 'react';
import SorteosInactivos from './Estado/SorteosInactivos';


const SorteosMain = () => {

    const [sorteosActivos, setSorteosActivos] = useState([]);

    useEffect( () => {
        const fetchSorteos = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/sorteos/');
                const data = await response.json();
                const sorteosActivos = data.filter(sorteo => sorteo.estado === 'activo');
                setSorteosActivos(sorteosActivos);
            }catch (error) {
                console.error('Error al obtener los sorteos:', error);
            }
        }



    } )

    return (
        <div>
        {sorteosActivos.length > 0 ? <h2>Hola</h2> : <SorteosInactivos />}
        </div>
    );
}

export default SorteosMain;
