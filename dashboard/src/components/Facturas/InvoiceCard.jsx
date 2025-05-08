import { FaDownload, FaEye } from "react-icons/fa";
import { useFacturas } from "../../hooks/useFacturas";
import { z } from "zod";

const FacturaSchema = z.object({
  id: z.number(),
  cita: z.number().optional(),
});

const InvoiceCard = (props) => {
  const { id, cita } = FacturaSchema.parse(props);
  const { obtenerFacturaPorId } = useFacturas();

  const handleVerFactura = async () => {
    obtenerFacturaPorId(id);
  };

  const handleDescargarFactura = async () => {
    alert("Descargando factura...");
  };

  return (
    <div className="group relative dark:bg-neutral-900 bg-neutral-500 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 overflow-hidden shadow-lg transition-all duration-500 max-w-sm">
      <h2 className="text-xl font-bold text-neutral-200 tracking-widest text-center group-hover:text-neutral-100">
        Factura #{id} de la cita <a href="/citas" className="text-sky-300 underline">#{cita}</a>
      </h2>

      <div className="flex gap-4 mt-4">
        <button
          type="button"
          aria-label="Ver factura"
          onClick={handleVerFactura}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-blue-400 transition-all duration-300 flex items-center gap-2"
        >
          <FaEye />
          Ver
        </button>
        <button
          type="button"
          aria-label="Descargar factura"
          onClick={handleDescargarFactura}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-green-400 transition-all duration-300 flex items-center gap-2"
        >
          <FaDownload />
          Descargar
        </button>
      </div>
    </div>
  );
};

export default InvoiceCard;