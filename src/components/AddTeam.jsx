import { useState } from 'react';
import { createTeam } from '../services/loadData';  // Importamos la función createTeam

const AddTeam = () => {
  // Estados para almacenar la información del equipo
  const [name, setName] = useState('');
  const [league, setLeague] = useState('');
  const [country, setCountry] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Verificación simple para asegurar que los campos no estén vacíos
    if (!name || !league || !country) {
      alert('Todos los campos son requeridos.');
      return;
    }
  
    const newTeam = { name, league, country };
    console.log("Datos enviados:", newTeam);
  
    try {
      setIsLoading(true);
  
      // Enviamos los datos del nuevo equipo
      const result = await createTeam(newTeam);
  
      console.log("Respuesta de la API:", result); // Depuramos la respuesta completa
  
      // Comprobamos si la respuesta contiene el mensaje de éxito
      if (result && result.message === "Equipo creado exitosamente") {
        alert('¡Equipo agregado exitosamente!');
        // Limpiamos los campos después de guardar
        setName('');
        setLeague('');
        setCountry('');
      } else if (result && result.detail) {
        // Si la API devuelve un error con detalle, lo mostramos
        alert(`Error al agregar el equipo: ${result.detail[0]?.msg || "Error desconocido"}`);
      } else {
        alert('Hubo un error al agregar el equipo.');
      }
  
      setIsLoading(false);
    } catch (error) {
      console.error('Error al agregar el equipo:', error);
      alert('Hubo un error al agregar el equipo.');
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="container mx-auto max-w-xl mt-8">
      <h1 className="text-2xl font-bold text-center">Agregar Nuevo Equipo</h1>
      
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
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={isLoading}
          >
            {isLoading ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTeam;
