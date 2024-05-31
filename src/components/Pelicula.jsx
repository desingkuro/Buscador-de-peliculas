function ListaPeliculas({peliculas}) {
  return (
    <ul className="peliculas">
      {peliculas.map((elemento) => {
        return (
          <li key={elemento.id} className="pelicula">
            <div className="headerPelicula">
              <h3>{elemento.titulo}</h3>
              <p>{elemento.año}</p>
            </div>
            <img src={elemento.imagen} alt={elemento.titulo} />
          </li>
        );
      })}
    </ul>
  );
}

function PeliculaNoEncontrada(){
    return(
        <h2>Pelicula no encontrada</h2>
    )
}

export default function RenderListaPeliculas({peliculas}){
    const resultados = peliculas?.length > 0
    return(
        resultados ? <ListaPeliculas peliculas={peliculas} />
        : <PeliculaNoEncontrada/>
    )
}