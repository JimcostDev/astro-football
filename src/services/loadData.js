// URL base de la API
const PROXY_URL = 'https://api.allorigins.win/raw?url=';
const API_URL = "https://fastapi-football.koyeb.app";

// Obtener todos los equipos o equipos por liga
export async function getAllTeamsOrGetTeamsByLeague(league = '') {
    let urlAPI = `${PROXY_URL}${API_URL}/`;

    // Si se proporciona un nombre de liga, lo añadimos a la URL
    if (league) {
        urlAPI += `?league_name=${league}`;
    }

    try {
        const response = await fetch(urlAPI);
        if (!response.ok) {
            throw new Error(`No se pudo obtener la respuesta de la API, status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error al obtener los datos de la API, ${error}`);
        return null;
    }
}

// Obtener un equipo por ID
export async function getTeamById(teamId) {
    const urlAPI = `${API_URL}/${teamId}`;
    try {
        const response = await fetch(urlAPI);
        if (!response.ok) {
            throw new Error(`No se pudo obtener el equipo, status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error al obtener el equipo, ${error}`);
        return null;
    }
}

// Crear un nuevo equipo
export async function createTeam(teamData) {
    const urlAPI = `${PROXY_URL}${encodeURIComponent(API_URL + '/')}`;

    try {
        const response = await fetch(urlAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(teamData),
        });

        if (!response.ok) {
            throw new Error(`No se pudo crear el equipo, status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Equipo creado:', data); // Imprime la respuesta
        return data;
    } catch (error) {
        console.error(`Error al crear el equipo, ${error}`);
        return null;
    }
}

// Actualizar un equipo
export async function updateTeam(teamId, teamData) {
    const urlAPI = `${API_URL}/${teamId}`;

    try {
        const response = await fetch(urlAPI, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(teamData),
        });

        if (!response.ok) {
            throw new Error(`No se pudo actualizar el equipo, status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error al actualizar el equipo, ${error}`);
        return null;
    }
}

// Eliminar un equipo
export async function deleteTeam(teamId) {
    const urlAPI = `${API_URL}/${teamId}`;

    try {
        const response = await fetch(urlAPI, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`No se pudo eliminar el equipo, status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error al eliminar el equipo, ${error}`);
        return null;
    }
}
