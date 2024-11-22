import { useState, useEffect } from 'react';
import { getTeamById, updateTeam } from '../services/loadData';

const UpdateTeamReact = ({ teamId }) => {
  const [team, setTeam] = useState(null);
  const [name, setName] = useState('');
  const [league, setLeague] = useState('');
  const [country, setCountry] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('teamId recibido:', teamId); // Verifica que el id está llegando al componente

    const fetchTeamData = async () => {
      if (!teamId) {
        console.log('No se proporcionó un ID válido');
        return;
      }

      try {
        const teamData = await getTeamById(teamId);
        console.log('Datos obtenidos:', teamData);
        if (teamData) {
          setTeam(teamData);
          setName(teamData.name);
          setLeague(teamData.league);
          setCountry(teamData.country);
        }
      } catch (error) {
        console.error('Error al obtener los datos del equipo:', error);
        alert('Hubo un error al cargar los datos del equipo.');
      }
    };

    if (teamId) {
      fetchTeamData();
    }
  }, [teamId]); // Vuelve a cargar cuando el 'teamId' cambie

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !league || !country) {
      alert('Todos los campos son requeridos.');
      return;
    }

    const updatedTeam = { name, league, country };

    try {
      setIsLoading(true);
      const result = await updateTeam(teamId, updatedTeam);

      if (result && result.message === "Equipo actualizado exitosamente") {
        alert('¡Equipo actualizado exitosamente!');
      } else {
        alert('Hubo un error al actualizar el equipo.');
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error al actualizar el equipo:', error);
      alert('Hubo un error al actualizar el equipo.');
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-xl mt-8">
      <h1 className="text-2xl font-bold text-center uppercase">Actualizar Equipo</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md mt-6">
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="team-name">Nombre del Equipo</label>
          <input
            type="text"
            id="team-name"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Nombre del equipo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="league">Liga</label>
          <input
            type="text"
            id="league"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Liga"
            value={league}
            onChange={(e) => setLeague(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="country">País</label>
          <input
            type="text"
            id="country"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="País"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => window.location.href = '/'}
            className="text-sm inline-flex items-center justify-center gap-2 px-4 py-2 text-tertiary bg-transparent border border-gray-400 rounded-lg"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="text-sm inline-flex items-center justify-center gap-2 px-4 py-2 text-tertiary bg-transparent border border-blue-400 rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTeamReact;
