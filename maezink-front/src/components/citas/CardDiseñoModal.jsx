
function CardDiseñoModal() {
  return (
    <div className="relative flex items-center mt-3">
      <div className="relative"></div>
      <img src="/foto.jpeg" alt="Imagen de diseño" className="w-52 h-64 rounded-xl object-cover border border-neutral-500" />
      <h4 className="absolute bottom-2 right-2 bg-opacity-75 px-2 py-1 rounded">(Precio) €</h4>
      <a href="/diseños" className="absolute bottom-2 left-2 bg-opacity-75 px-2 py-1 rounded font-semibold underline hover:text-neutral-300 transition-colors duration-300">Ver detalles</a>
    </div>
  )
}

export default CardDiseñoModal