import { useEffect, useState } from 'react';
import { getAllTeamsOrGetTeamsByLeague } from '../api/loadData.js';
import CardTeams from './CardTeams.jsx'; // Asegúrate de que este componente también sea un componente de React.

const GetTeams = () => {
  const [getTeams, setGetTeams] = useState([]);
  const [leagueName, setLeagueName] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const league = searchParams.get('league_name') || '';
    setLeagueName(league);

    const fetchTeams = async () => {
      const teamData = await getAllTeamsOrGetTeamsByLeague(league);
      setGetTeams(Array.isArray(teamData) ? teamData : []);
    };

    fetchTeams();
  }, []);

  return (
    <div>
      <div className="container mx-auto flex justify-between items-center my-3">
        <a href="/" className="text-blue-800 text-3xl font-bold">JimcostDev Football</a>
        <nav>
          <form className="flex items-center" action="/" method="GET">
            <select
              id="league-filter"
              name="league_name"
              className="border border-gray-300 rounded-md px-4 py-2 mr-2"
              value={leagueName}
              onChange={(e) => setLeagueName(e.target.value)}
            >
              <option value="">Todas las ligas</option>
              <option value="Premier League">Premier League</option>
              <option value="La Liga">La Liga</option>
              <option value="Serie A">Serie A</option>
              <option value="Bundesliga">Bundesliga</option>
              <option value="Ligue 1 Uber Eats">Ligue 1 Uber Eats</option>
            </select>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Buscar
            </button>
          </form>
        </nav>
      </div>

      {leagueName && (
        <p className="text-green-500 font-medium text-lg my-2">Liga: {leagueName}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {getTeams.length > 0 ? (
          getTeams.map(({ name, league, country }) => (
            <CardTeams key={name} name={name} league={league} country={country} />
          ))
        ) : (
          <p className="mx-5 text-wrap text-center font-light text-red-500/90">
            No se encontraron equipos para la liga seleccionada.
          </p>
        )}
      </div>
    </div>
  );
};

export default GetTeams;
