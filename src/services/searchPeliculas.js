const API_KEY = '7659fd0b'

export async function SearchPeliculas({query}){
    if(query === '') return null    
    try{
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
        const json = await response.json()
        const peliculas = json.Search
        
        return peliculas?.map((pelicula) => ({
            id: pelicula.imdbID,
            titulo: pelicula.Title,
            año: pelicula.Year,
            imagen: pelicula.Poster,
          }));
    }catch(e){
        throw new Error('No se encontro la pelicula')
    }
}