import React from "react"
import PropTypes from "prop-types"

export default function Film({img, title, year, imdbID}) {


  return (
  <a href={"https://www.imdb.com/title/" + imdbID} target="__blank" >
      <div className="group w-72 h-72 z-0 relative bg-cover transform transition-transform hover:scale-110 hover:z-40" style={{backgroundImage: `url(${img})`}}>
        <div className="w-full h-full text-center flex justify-center flex-col p-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{backgroundColor: "rgba(0, 0, 0, 0.65)"}}>
          <h2 className="text-2xl font-bold text-white mb-0 leading-7">{title}</h2>
          <p className="text-lg text-white">{year}</p>
        </div>
    </div>
  </a>)
}

Film.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.string,
  imdbID: PropTypes.string
}