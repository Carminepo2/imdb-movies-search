import React from "react";
import Film from "./Film"

const API_KEY = "53cace5d"

export default function FilmList() {
  const [films, setFilms] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [input, setInput] = React.useState("")
  const [selection, setSelection] = React.useState("")

  const pagination = React.useRef({query: "", pagination: 0})


  const get_data = async (initial=false) => {
    setLoading(true)
    pagination.current.pagination = 0
    pagination.current.query = initial ? "soul": input
    const endpoint = `http://www.omdbapi.com/?s=${initial ? "soul": input}${selection ? "&type=" + selection : ""}&apikey=` + API_KEY
    
    let filmResults = [] 
    for (let i = 1; i <= 2; i++) {
      const response = await fetch(endpoint +`&page=${i}`)
      const data = await response.json()

      if (data.Response === "False") {
        break
      }

      filmResults = filmResults.concat(data.Search)
      if (data.totalResults <= 10) {
        break
      }
    }
    pagination.current.pagination += filmResults.length
    setFilms(filmResults)
    setLoading(false)
  }

  const add_data = async () => {
    setLoading(true)
    const next_page = (pagination.current.pagination / 10) + 1;

    const enpoint = `http://www.omdbapi.com/?s=${pagination.current.query}&page=${next_page}&apikey=` + API_KEY
    const response = await fetch(enpoint)
    const data = await response.json()

    if (data.Response === "False") {
      return
    }

    pagination.current.pagination += data.Search.length


    setFilms((prev) => [...prev, ...data.Search])
    setLoading(false) 

  }

  const add_films = () => {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
      add_data()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input !== "") {
      await get_data()
    }
  }

  React.useEffect(async () => {
    await get_data(true)
    window.addEventListener("scroll", add_films)

    return () => {
      window.removeEventListener("scroll", add_films)
    }
  }, [])

  if (Object.prototype.hasOwnProperty.call(films, "Error")) {
    return "There is an error with the API."
  }

  return <section>
    <form onSubmit={handleSubmit} className="flex justify-center p-10">
      <input placeholder="Cerca..." className="rounded-lg border-gray-300 border py-2 px-5 w-2/3" value={input} onChange={(e) => setInput(e.target.value)} type="text"/>
      <select className="p-2 cursor-pointer" value={selection} onChange={(e) => setSelection(e.target.value)}>
        <option value="">All</option>
        <option value="movie">Movies</option>
        <option value="series">Series</option>
      </select>
    </form>
    <div className="mt-10 flex flex-wrap items-center justify-center">
      {loading && <div className="absolute p-10 bg-white bg-opacity-50 text-3xl">Loading...</div>}
      {!films.length ? <h2 className="text-center text-gray-300 text-6xl font-thin select-none">No Films...</h2> : films.map((film, i) => {
        return (<Film key={film.imdbID + i} imdbID={film.imdbID} title={film.Title} year={film.Year} img={film.Poster} />)
      })}
    </div>
    
  </section>
}