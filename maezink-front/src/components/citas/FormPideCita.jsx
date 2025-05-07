import { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useCitasStore } from '../../stores/citasStore';
import { navigate } from 'astro/virtual-modules/transitions-router.js';
import { toast } from 'sonner';

const FormPideCita = () => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const design = useCitasStore((state) => state.selectedDesign);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: user?.username || '',
    email: user?.email || '',
    date: '',
    time: '',
    notes: '',
  });

  const [tramosHorarios, setTramosHorarios] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchTramosHorarios = async (e) => {
    const selectedDate = e.target.value;
    console.log(selectedDate); 
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
  };

  const handleDateChange = (e) => {
    const dateStr = e.target.value;
    const date = new Date(dateStr);
    const day = date.getDay(); 
  
    if (day === 0 || day === 6) {
      toast.warning('No se pueden seleccionar citas para fines de semana');
      setFormData({ ...formData, date: '' }); 
      return;
    }
  
    handleChange(e);
    fetchTramosHorarios(e);
  };

  useEffect(() => {
    if (!tramosHorarios || Object.keys(tramosHorarios).length === 0) return;
    const select = document.querySelector('select[name="time"]');
    select.value = '0'; 
    const Opciones = document.querySelectorAll('select[name="time"] option');
    Opciones.forEach((opcion) => {
      const id = opcion.value;
      if (tramosHorarios.hasOwnProperty(id) && tramosHorarios[id] === false || id == 0) {
        opcion.disabled = true;
      } else {
        opcion.disabled = false;
      }
    });
  }, [tramosHorarios]);
  

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const citaPayload = {
      solicitante: user.id,
      design: design?.id ?? null,
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
      setTimeout(() => {
        navigate('/');
      }, 1800);
    } catch (error) {
      console.error('Error al enviar cita:', error);
      alert('Hubo un error al enviar la cita');
    }
  };

  const progressPercentage = (step / 3) * 100;

  return (
    <div className="flex items-center justify-center text-white">
      <div className="w-full bg-neutral-900 mt-10 p-8 rounded-xl shadow-lg max-w-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Pide tu cita</h2>
        <div className="w-full bg-neutral-700 rounded-full h-2 mb-6">
          <div
            className="bg-neutral-300 h-2 rounded-full transition-all"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        {design && (
          <div className="mb-6 text-sm text-neutral-400">
            <p>Diseño seleccionado: <strong>{design.title}</strong></p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Información Personal</h3>
              <div className="space-y-4">
                <label className="block">
                  <span className="block text-sm font-medium text-neutral-400">Nombre:</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled
                    className="w-full mt-1 p-2 bg-neutral-700 border border-neutral-600 rounded-md"
                  />
                </label>
                <label className="block">
                  <span className="block text-sm font-medium text-neutral-400">Email:</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled
                    className="w-full mt-1 p-2 bg-neutral-700 border border-neutral-600 rounded-md"
                  />
                </label>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-neutral-600 hover:bg-neutral-500 rounded-md transition"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Fecha y Hora</h3>
              <div className="space-y-4">
                <label className="block">
                  <span className="block text-sm font-medium text-neutral-400">Fecha:</span>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={(event) => {
                      handleDateChange(event);
                      
                    }}
                    required
                    className="w-full mt-1 p-2 bg-neutral-700 border border-neutral-600 rounded-md"
                  />
                </label>
                <label className="block">
                  <span className="block text-sm font-medium text-neutral-400">Hora:</span>
                  <select className='w-full mt-1 p-2 bg-neutral-700 border border-neutral-600 rounded-md' 
                  name="time"  
                  value={formData.time} 
                  onChange={()=>{
                      handleChange(event);;
                    }} required>
                    <option value="0" disabled >Selecciona una hora</option>
                    <option value="1">09:00-11:00</option>
                    <option value="2">11:00-13:00</option>
                    <option value="3">15:00-17:00</option>
                    <option value="4">17:00-19:00</option>
                  </select>
                </label>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 bg-neutral-600 hover:bg-neutral-500 rounded-md transition"
                >
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-neutral-600 hover:bg-neutral-500 rounded-md transition"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Notas Adicionales</h3>
              <label className="block">
                <span className="block text-sm font-medium text-neutral-400">Notas:</span>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 bg-neutral-700 border border-neutral-600 rounded-md"
                />
              </label>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 bg-neutral-600 hover:bg-neutral-500 rounded-md transition"
                >
                  Anterior
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-md transition"
                >
                  Enviar cita
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FormPideCita;
