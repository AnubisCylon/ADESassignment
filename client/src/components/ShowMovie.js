import React from 'react'
import MoviesList from './MoviesList'
//import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import "./ShowMovie.scss"
import requests from '../Requests/Request'
import NavBar from '../navigate/NavBar'



function ShowMovie() {
    return (
        <>
            <NavBar/>
            <div className="List">

            {/* <IoIosArrowBack className="sliderArrow left" /> */}
            <MoviesList title="All Movies" getReq={requests.fetchAllMovies}/>
            <MoviesList title="Drama" getReq={requests.fetchDrama}/>
            <MoviesList title="Action" getReq={requests.fetchAction}/>
            <MoviesList title="Romance" getReq={requests.fetchRomance}/>
            
            
            
            {/* <IoIosArrowForward className="sliderArrow right"/> */}
            </div>
        </>
    )
}

export default ShowMovie
