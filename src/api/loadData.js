export async function getAllTeamsOrGetTeamsByLeague(league = '') {
    let urlAPI = `https://fastapi-football.koyeb.app/`;
    
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
