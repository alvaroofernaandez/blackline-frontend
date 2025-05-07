import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";


const facturaSchema = z.object({
  id: z.number().optional(),
  cliente: z.number().min(1, "El cliente es obligatorio."),
  cita: z.number().min(1, "La cita es obligatoria."),
  fecha_emision: z.string().refine((fecha) => !isNaN(Date.parse(fecha)), {
    message: "La fecha de emisión debe ser válida.",
  }),
  total: z.string().refine((total) => !isNaN(parseFloat(total)), {
    message: "El total debe ser un número válido.",
  }),
});

export const useFacturas = () => {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFacturas = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      if (!token) throw new Error("Token no encontrado");

      const res = await fetch("http://localhost:8000/api/facturas/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const raw = await res.json();
      const validadas = raw.map((factura) => facturaSchema.parse(factura));
      setFacturas(validadas);
    } catch (err) {
      toast.error("Error cargando facturas: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const obtenerFacturaPorId = async (id) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      if (!token) throw new Error("Token no encontrado");

      window.location.href = `http://localhost:8000/api/detalle_facturas/?id=${id}`;
    } catch (err) {
      toast.error("No se pudo redirigir a la factura.");
    }
  };

  const crearFactura = async (factura) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      if (!token) throw new Error("Token no encontrado");

      const validation = facturaSchema.safeParse(factura);
      if (!validation.success) {
        const errorMessages = validation.error.errors.map((err) => err.message);
        errorMessages.forEach((msg) => toast.error(msg));
        return false;
      }

      const res = await fetch("http://localhost:8000/api/facturas/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(validation.data),
      });

      if (res.ok) {
        toast.success("Factura creada con éxito");
        fetchFacturas();
        return true;
      } else {
        toast.error("Error al crear la factura");
        return false;
      }
    } catch (err) {
      toast.error("Error al crear la factura: " + err.message);
      return false;
    }
  };

  useEffect(() => {
    fetchFacturas();
  }, []);

  return {
    facturas,
    loading,
    crearFactura,
    obtenerFacturaPorId,
  };
};