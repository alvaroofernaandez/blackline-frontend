import React from 'react';
import Noticia from './Noticia';

const Noticiero = () => {
    return (
        <div className='flex flex-col gap-12 max-w-4xl mx-auto my-32'>
        <h1 className='text-4xl text-white font-bold'>Noticias</h1>
        <hr></hr>
            <Noticia client="load" />
            <Noticia client="load"/>
            <Noticia />
            <Noticia />
            <Noticia />
        </div>
    );
}

export default Noticiero;
