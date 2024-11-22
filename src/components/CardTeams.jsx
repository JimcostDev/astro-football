const CardTeams = ({ name, league, country, onEdit, onDelete }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-gray-600">
          <strong>Liga:</strong> {league}
        </p>
        <p className="text-gray-600">
          <strong>País:</strong> {country}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          className="text-sm inline-flex items-center justify-center gap-2 px-4 py-2
          text-tertiary bg-transparent border border-yellow-400 rounded-lg shadow-md
          hover:shadow-xl hover:bg-yellow-600/10 ease-in-out duration-500 cursor-pointer mb-2"
          onClick={onEdit}
        >
          ✏️ Editar
        </button>
        <button
          className="text-sm inline-flex items-center justify-center gap-2 px-4 py-2
          text-tertiary bg-transparent border border-red-400 rounded-lg shadow-md
          hover:shadow-xl hover:bg-red-600/10 ease-in-out duration-500 cursor-pointer mb-2"
          onClick={onDelete}
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
};

export default CardTeams;
