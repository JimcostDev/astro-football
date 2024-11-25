import { useState, useEffect } from 'react';
import { getTeamById, deleteTeam } from '../services/loadData';
import ButtonReact from './ButtonReact.jsx';
import Swal from 'sweetalert2';

const DeleteTeam = ({ teamId }) => {
  const [team, setTeam] = useState(null);
  const [confirmationText, setConfirmationText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Obtener los datos del equipo cuando el componente se carga
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const teamData = await getTeamById(teamId);
        if (teamData) {
          setTeam(teamData);
        } else {
          Swal.fire('Error', 'No se pudo cargar el equipo.', 'error');
        }
      } catch (error) {
        console.error('Error al obtener los datos del equipo:', error);
        Swal.fire('Error', 'Hubo un problema al obtener los datos del equipo.', 'error');
      }
    };

    if (teamId) {
      fetchTeamData();
    }
  }, [teamId]);

  const handleDelete = async (e) => {
    e.preventDefault();

    if (confirmationText !== 'Eliminar') {
      Swal.fire({
        title: 'Atención',
        text: 'Debes escribir "Eliminar" para confirmar.',
        icon: 'warning',
      });
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás a punto de eliminar el equipo ${team.name}. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsDeleting(true);
          const response = await deleteTeam(teamId);

          if (response && response.message === 'Equipo eliminado exitosamente') {
            Swal.fire({
                title: '¡Eliminado!',
                text: 'El equipo ha sido eliminado exitosamente.',
                icon: 'success',
              }).then(() => {
                // Redirigir después de que el usuario cierre el alerta
                window.location.href = '/';
              });
          } else {
            Swal.fire('Error', 'Hubo un problema al eliminar el equipo.', 'error');
          }
          setIsDeleting(false);
        } catch (error) {
          console.error('Error al eliminar el equipo:', error);
          Swal.fire('Error', 'Hubo un problema al eliminar el equipo.', 'error');
          setIsDeleting(false);
        }
      }
    });
  };

  if (!team) {
    return <p className="text-center">Cargando información del equipo...</p>;
  }

  return (
    <div className="container mx-auto max-w-xl mt-8">
      <h1 className="text-2xl font-bold text-center uppercase">Eliminar Equipo</h1>

      <div className="bg-white p-6 rounded-md shadow-md mt-6">
        <p className="text-lg text-gray-700 mb-4">
          ¿Estás seguro de que deseas eliminar el equipo{' '}
          <span className="font-bold">{team.name}</span> de la liga{' '}
          <span className="font-bold">{team.league}</span>?
        </p>
        <form onSubmit={handleDelete}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Escribe <span className="font-bold">"Eliminar"</span> para confirmar:
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder="Eliminar"
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
              bgColor="hover:bg-red-600/10"
              borderColor="border-red-400"
              disabled={isDeleting}
            >
              {isDeleting ? 'Eliminando...' : 'Eliminar'}
            </ButtonReact>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteTeam;
