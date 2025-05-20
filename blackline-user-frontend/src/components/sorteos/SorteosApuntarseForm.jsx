import { useSorteosApuntarse } from '../../hooks/useSorteos';
import Button from '../general/Button';

const SorteosApuntarseForm = ({ id }) => {
  const {
    formData,
    error,
    isLoading,
    handleChange,
    handleSubmit,
    instagramUsernameFromToken,
  } = useSorteosApuntarse({ id });

  return (
    <div className="p-4 mt-52">
      <h1 className="text-center font-bold text-5xl mb-10">Apuntarse al sorteo</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-[90%] md:max-w-[70%] lg:max-w-[30%] mx-auto"
      >
        <div className="mb-4">
          {instagramUsernameFromToken ? (
            <p className="text-white">
              Tu nombre de Instagram es <strong>{instagramUsernameFromToken}</strong><br /> Pulsa en participar para apuntarte al sorteo.
            </p>
          ) : (
            <>
              <label htmlFor="instagramUser" className="block mb-2">
                Usuario de Instagram:
              </label>
              <input
                type="text"
                id="instagramUser"
                name="instagramUser"
                value={formData.instagramUser}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-lg text-black w-full"
                required
              />
            </>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="hasMetRequirements" className="flex items-center">
            <input
              type="checkbox"
              id="hasMetRequirements"
              name="hasMetRequirements"
              checked={formData.hasMetRequirements}
              onChange={handleChange}
              className="mr-2"
            />
            ¿Ha cumplido los requerimientos?
          </label>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Button
          label={isLoading ? 'Cargando...' : '¡Apuntarse!'}
          type="submit"
          disabled={isLoading}
          className="w-full"
        />
      </form>
    </div>
  );
};

export default SorteosApuntarseForm;
