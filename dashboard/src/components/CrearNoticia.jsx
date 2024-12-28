import React from 'react';

const AnadirNoticia = () => {
    const enviar = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario (refrescar la página)
        console.log('Enviando noticia...');
        console.log('Título:', document.getElementById('titulo').value);
        console.log('Descripción:', document.getElementById('descripcion').value);
        console.log('Fecha:', document.getElementById('fecha').value);
        console.log('Imagen:', document.getElementById('imagen').value);
        alert("Enviado...");
        window.location.href = '/Noticias';
    }

    return (    
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Añadir Noticia</h2>
            <form onSubmit={enviar}>
                <label htmlFor="titulo" className="block mb-2">Título:</label>
                <input type="text" id="titulo" name="titulo" className="border border-gray-300 p-2 w-full mb-4" required />

                <label htmlFor="descripcion" className="block mb-2">Descripción:</label>
                <textarea id="descripcion" name="descripcion" className="border border-gray-300 p-2 w-full mb-4" required></textarea>

                <label htmlFor="fecha" className="block mb-2">Fecha:</label>
                <input type="date" id="fecha" name="fecha" className="border border-gray-300 p-2 w-full mb-4" required />

                <label htmlFor="imagen" className="block mb-2">Imagen URL:</label>
                <input type="url" id="imagen" name="imagen" className="border border-gray-300 p-2 w-full mb-4" required />

                <button type="submit" className="bg-blue-950 text-white rounded-lg p-2 hover:bg-blue-700 transition-colors">Enviar</button>
            </form>
        </div>
    );
}

export default AnadirNoticia;
