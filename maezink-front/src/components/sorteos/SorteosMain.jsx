import { useEffect, useState } from 'react';
import SorteosInactivos from './Estado/SorteosInactivos';
import SorteosActivos from './Estado/SorteosActivos';

const SorteosMain = () => {

    const [sorteosActivos, setSorteosActivos] = useState([]);

    useEffect(() => {
        const fetchSorteos = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/sorteos/');
                const data = await response.json();
                console.log(data);
                const sorteos = data.filter(sorteo => sorteo.estado === 'activo');
                setSorteosActivos(sorteos);
            } catch (error) {
                console.error('Error al obtener los sorteos:', error);
            }
        };

        fetchSorteos();
    }, []);

    return (
        <div className='mt-5'>
        {sorteosActivos.length > 0 ? <SorteosActivos sorteos={sorteosActivos} /> : <SorteosInactivos />}
        </div>
    );
}

export default SorteosMain;
