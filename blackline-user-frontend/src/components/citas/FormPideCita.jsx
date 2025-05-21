import { useAuthStore } from "../../stores/authStore";
import { useCitasStore } from "../../stores/citasStore";
import { navigate } from "astro/virtual-modules/transitions-router.js";
import DiseñosModal from "./DiseñosModal";
import { useFormPideCita } from "../../hooks/useCitas";

const FormPideCita = () => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const design = useCitasStore((state) => state.selectedDesign);

  const {
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
  } = useFormPideCita({ user, token, initialDesign: design });

  return (
    <div className="flex items-center justify-center text-white">
      <div className="w-full bg-neutral-900 mt-10 p-8 rounded-xl shadow-lg animate-fade-in animate-delay-200">
        <h2 className="text-3xl font-bold text-center mb-6">Pide tu cita</h2>
        <div className="w-full bg-neutral-700 rounded-full h-2 mb-6">
          <div
            className="bg-neutral-300 h-2 rounded-full transition-all"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        {design && (
          <div className="mb-6 text-sm text-neutral-400">
            <p>
              Diseño seleccionado: <strong>{design.title}</strong>
            </p>
          </div>
        )}
        <form onSubmit={(e) => handleSubmit(e, navigate)} className="space-y-6">
          {step === 1 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Información Personal
              </h3>
              <div className="space-y-4">
                <label className="block">
                  <span className="block text-sm font-medium text-neutral-400">
                    Nombre:
                  </span>
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
                  <span className="block text-sm font-medium text-neutral-400">
                    Email:
                  </span>
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
                <label className="block">
                  <span className="block text-sm font-medium text-neutral-400">
                    Diseño:
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="w-full mt-1 p-2 bg-neutral-700 border border-neutral-600 rounded-md flex items-center gap-2"
                    name="design"
                    value={selectedDesign?.id || ""}
                  >
                    {selectedDesign != null ? (
                      <>
                        <img
                          src={selectedDesign.image || "/foto.avif"}
                          alt="Diseño seleccionado"
                          width="40"
                          height="40"
                          className="w-10 h-10 rounded"
                          loading="lazy"
                        />
                        <span>
                          {selectedDesign.titulo || "Diseño seleccionado"}
                        </span>
                      </>
                    ) : (
                      "Añadir Diseño"
                    )}
                  </button>
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
                  <span className="block text-sm font-medium text-neutral-400">
                    Fecha:
                  </span>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleDateChange}
                    required
                    className="w-full mt-1 p-2 bg-neutral-700 border border-neutral-600 rounded-md"
                  />
                </label>
                <label className="block">
                  <span className="block text-sm font-medium text-neutral-400">
                    Hora:
                  </span>
                  <select
                    className="w-full mt-1 p-2 bg-neutral-700 border border-neutral-600 rounded-md"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  >
                    <option value="0" disabled>
                      Selecciona una hora
                    </option>
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
                <span className="block text-sm font-medium text-neutral-400">
                  Notas:
                </span>
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
                  disabled={loading}
                >
                  Enviar cita
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
      <DiseñosModal
        isOpen={isModalOpen}
        onClose={(design) => {
          if (design) setSelectedDesign(design);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default FormPideCita;
