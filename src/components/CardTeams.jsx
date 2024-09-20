import React from 'react';

const CardTeams = ({ name, league, country }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold">{name}</h2>
      <p>Liga: {league}</p>
      <p>País: {country}</p>
      <div className="flex space-x-2">
        <button className="text-indigo-600 hover:text-indigo-900" aria-label="Editar">
          Editar
        </button>
        <button className="text-red-600 hover:text-red-900" aria-label="Eliminar">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CardTeams;
