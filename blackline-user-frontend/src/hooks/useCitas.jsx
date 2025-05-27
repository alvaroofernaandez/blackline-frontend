import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

export function useDiseñosModal(isOpen) {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    const fetchData = async () => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      if (!token) {
        console.log("Token no encontrado");
        return;
      }
      try {
        const response = await fetch('http://localhost:8000/api/diseños/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Error al obtener los diseños');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [isOpen]);

  const selectDiseño = (id) => setSelectedId(id);

  const selectedDesign = data.find((d) => d.id === selectedId) || null;

  return {
    diseños: data,
    selectedId,
    selectDiseño,
    selectedDesign,
    setSelectedId,
    setData,
  };
}

export function useFormPideCita({ user, token, initialDesign }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: user?.username || '',
    email: user?.email || '',
    design: initialDesign?.id || null,
    date: '',
    time: '',
    notes: '',
  });
  const [tramosHorarios, setTramosHorarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(initialDesign || null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (selectedDesign) {
      setFormData((prev) => ({ ...prev, design: selectedDesign.id }));
    }
  }, [selectedDesign]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const fetchTramosHorarios = useCallback(async (selectedDate) => {
    const res = await fetch(`http://localhost:8000/api/citas_tramo_horario/?fecha=${selectedDate}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Error al obtener tramos horarios');
    const data = await res.json();
    setTramosHorarios(data);
  }, [token]);

  const handleDateChange = useCallback((e) => {
    const dateStr = e.target.value;
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      toast.warning('No se pueden seleccionar fechas anteriores a hoy');
      setFormData((prev) => ({ ...prev, date: '' }));
      return;
    }

    const day = date.getDay();
    if (day === 0 || day === 6) {
      toast.warning('No se pueden seleccionar citas para fines de semana');
      setFormData((prev) => ({ ...prev, date: '' }));
      return;
    }
    handleChange(e);
    fetchTramosHorarios(dateStr);
  }, [handleChange, fetchTramosHorarios]);

  useEffect(() => {
    if (!tramosHorarios || Object.keys(tramosHorarios).length === 0) return;
    const select = document.querySelector('select[name="time"]');
    if (!select) return;
    select.value = '0';
    const opciones = select.querySelectorAll('option');
    opciones.forEach((opcion) => {
      const id = opcion.value;
      if ((tramosHorarios.hasOwnProperty(id) && tramosHorarios[id] === false) || id === '0') {
        opcion.disabled = true;
      } else {
        opcion.disabled = false;
      }
    });
  }, [tramosHorarios]);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const enviarCorreoPersonalizado = useCallback(async ({ correo, asunto, mensaje, nombre }) => {
    try {
      setLoading(true);
      const tokenCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      if (!tokenCookie) throw new Error("Token no encontrado");
      const res = await fetch("http://localhost:8000/api/enviar_correos_personalizados/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenCookie}`,
        },
        body: JSON.stringify({ correo, asunto, mensaje, nombre }),
      });
      if (res.ok) {
        toast.success("Correo personalizado enviado con éxito");
        return true;
      } else {
        toast.error("Error al enviar correo personalizado");
        return false;
      }
    } catch (err) {
      toast.error("Error al enviar correo personalizado: " + err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = useCallback(async (e, navigate) => {
    e.preventDefault();
    const citaPayload = {
      solicitante: user.id,
      design: formData.design,
      fecha: formData.date,
      hora: formData.time,
      descripcion: formData.notes,
    };
    try {
      const res = await fetch('http://localhost:8000/api/citas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(citaPayload),
      });
      if (!res.ok) throw new Error('Error al enviar la cita');
      toast.loading('Cita enviada con éxito. Redireccionando...');
      const correoEnviado = await enviarCorreoPersonalizado({
        correo: formData.email,
        asunto: 'Confirmación de cita',
        mensaje: `Hola ${formData.name}, tu cita ha sido confirmada para el día ${formData.date}. En caso de que no puedas asistir, por favor contáctanos con tiempo. ¡Muchas gracias por confiar en nosotros!`,
        nombre: formData.name,
      });
      if (correoEnviado) {
        setTimeout(() => {
          navigate('/');
        }, 1800);
      }
    } catch (error) {
      console.log('Error al enviar cita:', error);
      toast.error('Error al enviar la cita. Por favor, inténtalo de nuevo.');
    }
  }, [user, formData, token, enviarCorreoPersonalizado]);

  const progressPercentage = (step / 3) * 100;

  return {
    step,
    setStep,
    nextStep,
    prevStep,
    formData,
    setFormData,
    handleChange,
    handleDateChange,
    tramosHorarios,
    setTramosHorarios,
    loading,
    setLoading,
    selectedDesign,
    setSelectedDesign,
    isModalOpen,
    setIsModalOpen,
    handleSubmit,
    progressPercentage,
  };
}