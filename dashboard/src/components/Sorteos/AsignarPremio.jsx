import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useSorteos } from "../../hooks/useSorteos";

const premioSchema = z.object({
  premio: z.string().min(1, "El premio es obligatorio."),
});

const AsignarPremio = ({ id }) => {
  const [formData, setFormData] = useState({
    premio: "",
  });

  const { asignarPremio } = useSorteos();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      premioSchema.parse(formData);
      const success = await asignarPremio(id, formData.premio);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error al asignar el premio.");
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="max-w-[50%] mx-auto mt-10">
        <label htmlFor="premio" className="block mb-2">
          Premio:
        </label>
        <input
          type="text"
          id="premio"
          value={formData.premio}
          className="border border-gray-300 text-black rounded-lg p-2 w-full mb-4"
          required
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-neutral-900 text-white rounded-lg p-2 hover:bg-neutral-800 w-full mt-10 transition-all"
        >
          Asignar Premio
        </button>
      </form>
    </div>
  );
};

export default AsignarPremio;
