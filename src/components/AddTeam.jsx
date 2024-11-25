import { useState } from 'react';
import { createTeam } from '../services/loadData'; 
import ButtonReact from './ButtonReact.jsx';
import Swal from 'sweetalert2';

const AddTeam = () => {
  const [name, setName] = useState('');
  const [league, setLeague] = useState('');
  const [country, setCountry] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !league || !country) {
      Swal.fire({
        title: 'Error',
        text: 'Todos los campos son requeridos.',
        icon: 'warning',
      });
      return;
    }
  
    const newTeam = { name, league, country };
    console.log('Datos enviados:', newTeam);
  
    try {
      setIsLoading(true);
  
      const result = await createTeam(newTeam);
      console.log('Respuesta de la API:', result);
  
      if (result && result.message === 'Equipo creado exitosamente') {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Equipo agregado exitosamente.',
          icon: 'success',
        }).then(() => {
          // Limpiamos los campos y redirigimos si es necesario
          setName('');
          setLeague('');
          setCountry('');
          window.location.href = '/';
        });
      } else if (result && result.detail) {
        Swal.fire({
          title: 'Error',
          text: `Error al agregar el equipo: ${result.detail[0]?.msg || 'Error desconocido'}`,
          icon: 'error',
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al agregar el equipo.',
          icon: 'error',
        });
      }
  
      setIsLoading(false);
    } catch (error) {
      console.error('Error al agregar el equipo:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al agregar el equipo.',
        icon: 'error',
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-xl mt-8">
      <h1 className="text-2xl font-bold text-center uppercase">Agregar Nuevo Equipo</h1>
      
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
          <ButtonReact
            type="button"
            onClick={() => window.location.href = '/'}
            bgColor="hover:bg-gray-600/10"
            borderColor="border-gray-400"
          >
            Cancelar
          </ButtonReact>
          <ButtonReact
            type="submit"
            bgColor="hover:bg-blue-600/10"
            borderColor="border-blue-400"
            disabled={isLoading}
          >
            {isLoading ? 'Guardando...' : 'Guardar'}
          </ButtonReact>
        </div>
      </form>
    </div>
  );
};

export default AddTeam;
