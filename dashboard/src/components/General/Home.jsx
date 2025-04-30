import { useEffect, useState } from "react";
import { navigate } from "astro/virtual-modules/transitions-router.js";
import HomeLoginButton from "../General/HomeLoginButton";


const Home = () => {
  const [sorteos, setSorteos] = useState([]);
  const [diseños, setDiseños] = useState([]);
  const [noticias, setNoticias] = useState([]);

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

        const [sorteosRes, diseñosRes, noticiasRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/sorteos/", { headers: authHeader }),
          fetch("http://127.0.0.1:8000/api/diseños/", { headers: authHeader }),
          fetch("http://127.0.0.1:8000/api/noticias/", { headers: authHeader }),
        ]);

        if (!sorteosRes.ok || !diseñosRes.ok || !noticiasRes.ok) {
          throw new Error("Error al cargar los datos");
        }

        const [sorteosData, diseñosData, noticiasData] = await Promise.all([
          sorteosRes.json(),
          diseñosRes.json(),
          noticiasRes.json(),
        ]);

        setSorteos(sorteosData.slice(0, 2));
        setDiseños(diseñosData.slice(0, 2));
        setNoticias(noticiasData.slice(0, 4));
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleNavigate = (path) => navigate(path);

  const Card = ({ title, children, path }) => (
    <div className="dark:bg-neutral-900 bg-neutral-500 rounded-2xl shadow-lg p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
          {children}
        </div>
      </div>
      <button
        onClick={() => handleNavigate(path)}
        className="mt-6 px-4 py-2 bg-neutral-500 border dark:border-none dark:bg-neutral-800 text-white rounded-md hover:bg-neutral-400 dark:hover:bg-neutral-700 transition"
      >
        Ver más
      </button>
    </div>
  );

  const SorteoMiniCard = ({ sorteo }) => (
    <div className="dark:bg-neutral-950 bg-neutral-500 border border-neutral-400 dark:border-none p-4 rounded-xl">
      <h4 className="text-lg font-bold">{sorteo.titulo}</h4>
      <p className="text-sm text-gray-300">{sorteo.descripcion}</p>
      <p className="text-xs mt-2 text-gray-400">
        {new Date(sorteo.fecha_inicio).toLocaleDateString()} - {new Date(sorteo.fecha_fin).toLocaleDateString()}
      </p>
      <p className="text-xs mt-1 text-green-400">Estado: {sorteo.estado}</p>
      <ul className="text-xs mt-2 text-gray-300 list-disc list-inside">
        {sorteo.premios.map((premio, idx) => (
          <li key={idx}>{premio}</li>
        ))}
      </ul>
    </div>
  );

  const DiseñoMiniCard = ({ diseño }) => (
    <div className="dark:bg-neutral-950 bg-neutral-500 border border-neutral-400 dark:border-none p-4 rounded-xl flex gap-4 items-center">
      <img
        src={diseño.image}
        alt={diseño.titulo}
        className="w-16 h-16 rounded object-cover border border-neutral-700"
      />
      <div>
        <h4 className="font-bold">{diseño.titulo}</h4>
        <p className="text-sm text-gray-300">{diseño.descripcion}</p>
        <p className="text-xs text-gray-400">Precio: {diseño.precio} €</p>
        <p className="text-xs text-gray-500">
          {diseño.ancho} x {diseño.alto} mm
        </p>
      </div>
    </div>
  );

  const NoticiaMiniCard = ({ noticia }) => (
    <div className="dark:bg-neutral-950 bg-neutral-500 border border-neutral-400 dark:border-none p-4 rounded-xl">
      <img
        src={noticia.imagen}
        alt={noticia.titulo}
        className="w-full h-32 object-cover rounded mb-2"
      />
      <h4 className="font-bold">{noticia.titulo}</h4>
      <p className="text-sm text-gray-300">{noticia.descripcion}</p>
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
        <Card title="Diseños" path="/diseños">
          {diseños.map((d) => (
            <DiseñoMiniCard key={d.id} diseño={d} />
          ))}
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
