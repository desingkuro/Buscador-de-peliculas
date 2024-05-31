import { useMemo, useRef, useState } from "react";
import { SearchPeliculas } from "../services/searchPeliculas";

export function usePelis({query}) {
  const [peliculas, setPeliculas] = useState([])  
  const [loading, setLoading] = useState(false)  
  const [error, setError] = useState(null)  
  const peliculasAnteriores = useRef(query)

  const getPelicula = useMemo(()=>{
   return async ({query}) =>{
      if (query === peliculasAnteriores.current) return
      try {
        setLoading(true)
        peliculasAnteriores.current = query
        const newPeliculas = await SearchPeliculas({query})
        setPeliculas(newPeliculas)
      } catch (e) {
        setError(e.message)
      }finally{
        setLoading(false)
      }
    }
  },[query]) 

  return {peliculas, getPelicula,loading};
}

