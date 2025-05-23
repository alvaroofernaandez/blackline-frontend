import Noticia from './Noticia';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useNoticias } from '../../hooks/useNoticias';

const Noticiero = () => {
    const {
        noticiasPaginadas,
        paginaActual,
        totalPaginas,
        cargando,
        irPaginaAnterior,
        irPaginaSiguiente,
    } = useNoticias();

    const formatearFecha = (fechaISO) => {
        return format(new Date(fechaISO), "dd/MM/yyyy - HH:mm", { locale: es });
    };

    return (
        <div className='flex flex-col gap-5 max-w-4xl mx-auto my-32 justify-center'>
            <h1 className='text-4xl text-white font-bold text-center lg:text-start'>Noticias</h1>
            <hr/>
            {cargando ? (
                <span className="text-white">Cargando...</span>
            ) : (
                noticiasPaginadas.map(noticia => (
                    <Noticia
                        key={noticia.id}
                        titulo={noticia.titulo}
                        descripcion={noticia.descripcion}
                        fecha={formatearFecha(noticia.fecha)}
                        imagen={noticia.imagen}
                    />
                ))
            )}

            <div className='flex justify-center gap-4 items-center'>
                <button
                    className="px-4 py-2 text-white rounded border enabled:border-white disabled:bg-gray-400 disabled:border-gray-800"
                    onClick={irPaginaAnterior}
                    disabled={paginaActual === 1}
                >
                    Anterior
                </button>
                <span className='text-white'>{paginaActual} / {totalPaginas}</span>
                <button
                    className="px-4 py-2 text-white rounded border enabled:border-white disabled:bg-gray-400 disabled:border-gray-800"
                    onClick={irPaginaSiguiente}
                    disabled={paginaActual === totalPaginas || totalPaginas === 0}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default Noticiero;
