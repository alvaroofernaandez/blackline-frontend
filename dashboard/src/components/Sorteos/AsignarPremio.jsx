import { navigate } from "astro/virtual-modules/transitions-router.js";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const premioSchema = z.object({
  premio: z.string().min(1, "El premio es obligatorio."),
});

const AsignarPremio = ({ id }) => {
  const [formData, setFormData] = useState({
    premio: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const asignarPremio = async (e) => {
    e.preventDefault();

    try {
      premioSchema.parse(formData);

      const respuesta = await fetch(
        `http://127.0.0.1:8000/api/sorteos_asignar_premio/${id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie
              .split("; ")
              .find((row) => row.startsWith("accessToken="))
              ?.split("=")[1]}`,
          },
          body: JSON.stringify({ premio: formData.premio }),
        }
      );

      if (respuesta.ok) {
        toast.success("Premio asignado con éxito.");
        setFormData({ premio: "" });
        setTimeout(() => {
          navigate("/sorteos");
        }, 1000); 
      } else {
        throw new Error("Error al asignar el premio.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error al asignar el premio.");
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={asignarPremio} className="max-w-[50%] mx-auto mt-10">
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
