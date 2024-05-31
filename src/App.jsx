import { useEffect, useRef, useState} from 'react'
import './App.css'
import RenderListaPeliculas from './components/Pelicula'
import { usePelis } from './hooks/usePelis'

function useReach(){
  const [query,setQuery] = useState('')
  const [error,setError] = useState(null)
  const primeraBusqueda = useRef(true)
  useEffect(()=>{
    if(primeraBusqueda.current){
      primeraBusqueda.current = query === ''
      return
    }
    if(query === ''){
      setError('no se puede buscar vacio')
      return
    }
    if(query === 'hola'){
      setError('No se puede buscar hola') 
      return
    }
    if(query.length < 3){
      setError('Debe tener mas de 3 caracteres')
      return
    }
    setError(null)
  },[query])

  return ({query,error,setQuery})
}

function App() {
  const {query,error,setQuery} = useReach()
  const {peliculas,getPelicula,loading} = usePelis({query});

  function handleClick(event){
    event.preventDefault();
    const valor = Object.fromEntries(
      new window.FormData(event.target)
    )
    getPelicula({query})
  }
  function handleChange(event){
    setQuery(event.target.value)
  }

  return (
    <>
      <header>
        <h1>Buscador de peliculas</h1>
        <form className='formulario' onSubmit={handleClick}>
          <input onChange={handleChange} value={query} name='nombrePelicula' type="text" placeholder='Avengers, Matriz, Maze runner...' />
          {error && <p style={{color:'red'}}>{error}</p>}
          <button type='submit'>Buscar</button>
        </form>
      </header>

      <main className='containerPeliculas'>
        {
        loading ?<p>cargando .....</p> 
        : <RenderListaPeliculas peliculas={peliculas} />
        }
      </main>
    </>
  )
}

export default App
