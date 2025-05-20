import { useEffect } from 'react';
import SorteosInactivos from './Estado/SorteosInactivos';
import SorteosActivos from './Estado/SorteosActivos';
import { useSorteosStore } from '../../stores/sorteosStore';

const SorteosMain = () => {
const { sorteosActivos, fetchSorteos } = useSorteosStore();

useEffect(() => {
    fetchSorteos();
}, [fetchSorteos]);

return (
    <div className="mt-5 animate-fade-in-down">
    {sorteosActivos.length > 0 ? (
        <SorteosActivos sorteos={sorteosActivos} />
    ) : (
        <SorteosInactivos />
    )}
    </div>
);
};

export default SorteosMain;
