import React from "react"
import PropTypes from "prop-types"
import {FiCameraOff} from "react-icons/fi"

export default function Film({img, title, year, imdbID}) {


  return (
  <a href={"https://www.imdb.com/title/" + imdbID} target="__blank" >
      <div className={`group w-36 h-36 lg:w-72 lg:h-72 z-0 relative bg-cover transform transition-transform hover:scale-110 hover:z-40 ${img === "N/A" && "bg-gray-300"}`} style={img !== "N/A" ? {backgroundImage: `url(${img})`} : {}}>
        {img === "N/A" && <div className="absolute top-14 left-14 text-3xl lg:top-28 lg:left-28 lg:text-6xl text-gray-400 z-0"><FiCameraOff /></div>}
        <div className="w-full h-full relative z-40 text-center flex justify-center flex-col p-5 lg:p-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{backgroundColor: "rgba(0, 0, 0, 0.65)"}}>
          <h2 className="text-md lg:text-2xl font-bold text-white mb-0 leading-5 lg:leading-7">{title}</h2>
          <p className="text-sm lg:text-lg text-white">{year}</p>
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