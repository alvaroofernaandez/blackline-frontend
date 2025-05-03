import { useEffect, useState } from "react";
import { navigate } from "astro/virtual-modules/transitions-router.js";
import HomeLoginButton from "../General/HomeLoginButton";
import { useCitas } from "../../hooks/useCitas";

const Home = () => {
  const [sorteos, setSorteos] = useState([]);
  const [noticias, setNoticias] = useState([]);
  const { citas, loading, obtenerNombreSolicitante } = useCitas();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("accessToken="))
          ?.split("=")[1];
        if (!token) {
          throw new Error("Token no encontrado en las cookies");
        }

        const authHeader = {
          Authorization: `Bearer ${token}`,
        };

        const [sorteosRes, noticiasRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/sorteos/", { headers: authHeader }),
          fetch("http://127.0.0.1:8000/api/noticias/", { headers: authHeader }),
        ]);

        if (!sorteosRes.ok || !noticiasRes.ok) {
          throw new Error("Error al cargar los datos");
        }

        const [sorteosData, noticiasData] = await Promise.all([
          sorteosRes.json(),
          noticiasRes.json(),
        ]);

        setSorteos(sorteosData.slice(0, 2));
        setNoticias(noticiasData.slice(0, 4));
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleNavigate = (path) => navigate(path);

  const Card = ({ title, children, path }) => (
    <div className="dark:bg-neutral-900 bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold mb-4 text-neutral-500 dark:text-white">{title}</h3>
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
          {children}
        </div>
      </div>
      <button
        onClick={() => handleNavigate(path)}
        className="mt-6 px-4 py-2 dark:bg-neutral-800 dark:hover:bg-neutral-700 bg-neutral-400 text-white rounded-md hover:bg-neutral-500 transition"
      >
        Ver más
      </button>
    </div>
  );

  const SorteoMiniCard = ({ sorteo }) => (
    <div className="dark:bg-neutral-950 bg-neutral-100 shadow-lg shadow-neutral-300 dark:shadow-neutral-800 p-4 rounded-xl">
      <h4 className="text-lg font-bold dark:text-white text-gray-700">{sorteo.titulo}</h4>
      <p className="text-sm dark:text-gray-300 text-gray-500">{sorteo.descripcion}</p>
      <p className="text-xs mt-2 text-gray-400">
        {new Date(sorteo.fecha_inicio).toLocaleDateString()} - {new Date(sorteo.fecha_fin).toLocaleDateString()}
      </p>
      <p className="text-xs mt-1 text-gray-400">Estado: <strong className="text-green-400">{sorteo.estado}</strong></p>
      <ul className="text-xs mt-2 dark:text-gray-300 text-gray-500 list-disc list-inside">
        {sorteo.premios.map((premio, idx) => (
          <li key={idx}>{premio}</li>
        ))}
      </ul>
    </div>
  );

  const CitaMiniCard = ({ cita }) => (
    <div className="dark:bg-neutral-950 bg-neutral-100 shadow-lg shadow-neutral-300 dark:shadow-neutral-800 p-4 rounded-xl">
      <h4 className="text-lg font-bold dark:text-white text-gray-700">Cita #{cita.id}</h4>
      <p className="text-sm dark:text-gray-300 text-gray-500">
        <strong>Solicitante: </strong>{obtenerNombreSolicitante(cita.solicitante)}
      </p>
      <p className="text-xs mt-2 text-gray-400">
        Fecha: {new Date(cita.fecha).toLocaleDateString()} - Hora: {cita.hora}
      </p>
      <p className="text-xs mt-1 text-gray-400">Estado: <strong className="text-green-400">{cita.estado}</strong></p>
    </div>
  );

  const NoticiaMiniCard = ({ noticia }) => (
    <div className="dark:bg-neutral-950 bg-neutral-100 shadow-lg shadow-neutral-300 dark:shadow-neutral-800 p-4 rounded-xl">
      <img
        src={noticia.imagen}
        alt={noticia.titulo}
        className="w-full h-32 object-cover rounded mb-2"
      />
      <h4 className="font-bold dark:text-white text-gray-700">{noticia.titulo}</h4>
      <p className="text-sm dark:text-gray-300 text-gray-500">{noticia.descripcion}</p>
      <p className="text-xs text-gray-400 mt-1">
        {new Date(noticia.fecha).toLocaleDateString()}
      </p>
    </div>
  );

  return (
    <div className="p-8 text-white ">  

      <div className="justify-center flex items-center mb-4">
        <HomeLoginButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
        <Card title="Citas" path="/citas">
          {loading ? (
            <p>Cargando...</p>
          ) : (
            citas.map((c) => (
              <CitaMiniCard key={c.id} cita={c} />
            ))
          )}
        </Card>
        <Card title="Sorteos" path="/sorteos">
          {sorteos.map((s) => (
            <SorteoMiniCard key={s.id} sorteo={s} />
          ))}
        </Card>
      </div>

      <div className="">
        <Card title="Noticias" path="/noticias">
          {noticias.map((n) => (
            <NoticiaMiniCard key={n.id} noticia={n} />
          ))}
        </Card>
      </div>
    </div>
  );
};

export default Home;
