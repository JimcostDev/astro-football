import { useEffect, useState } from 'react';
import { getAllTeamsOrGetTeamsByLeague } from '../services/loadData.js';
import CardTeams from './CardTeams.jsx';

const GetTeams = () => {
  const [getTeams, setGetTeams] = useState([]);  // Estado para los equipos
  const [leagueName, setLeagueName] = useState('');  // Estado para la liga seleccionada
  const [loading, setLoading] = useState(true);  // Estado para saber si estamos cargando los datos

  // UseEffect para cargar equipos cuando la liga cambie o cuando se cargue el componente
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const league = searchParams.get('league_name') || '';  // Obtener la liga desde los parámetros de la URL
    setLeagueName(league);

    const fetchTeams = async () => {
      setLoading(true);  // Empezamos a cargar los datos
      const teamData = await getAllTeamsOrGetTeamsByLeague(league);
      setGetTeams(Array.isArray(teamData) ? teamData : []);  // Establecer los equipos recibidos
      setLoading(false);  // Terminamos de cargar los datos
    };

    fetchTeams();
  }, []);  // Solo se ejecuta una vez al montar el componente

  return (
    <div>
      <div className="container mx-auto flex justify-between items-center my-3">
        <nav>
          <form className="flex items-center" action="/" method="GET">
            <select
              id="league-filter"
              name="league_name"
              className="border border-blue-400 rounded-md px-4 py-2 mr-2"
              value={leagueName}
              onChange={(e) => setLeagueName(e.target.value)}
            >
              <option value="">Todas las ligas</option>
              <option value="Premier League">Premier League</option>
              <option value="La Liga">La Liga</option>
              <option value="Serie A">Serie A</option>
              <option value="Bundesliga">Bundesliga</option>
              <option value="Ligue 1">Ligue 1</option>
              <option value="Liga BetPlay">Liga BetPlay</option>
            </select>
            <button
              type="submit"
              className="bg-transparent border border-blue-400 hover:bg-blue-500/10 py-2 px-4 rounded-lg shadow-md hover:shadow-xl ease-in-out duration-500 cursor-pointer"
            >
              Buscar
            </button>
          </form>
        </nav>
      </div>

      {leagueName && (
        <p className="text-green-500 font-medium text-lg my-2">{leagueName}</p>
      )}

      {/* Mostrar mensaje de carga mientras se obtienen los equipos */}
      {loading ? (
        <p className="text-center text-lg text-blue-500">Cargando equipos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {getTeams.length > 0 ? (
            getTeams.map(({ _id, name, league, country }) => (
              <CardTeams key={_id} _id={_id} name={name} league={league} country={country} />
            ))
          ) : (
            <p className="mx-5 text-wrap text-center font-light text-red-500/90">
              No se encontraron equipos para la liga seleccionada.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default GetTeams;
