import React , { useState, useEffect } from "react";
// import axios from '../axios'
import "./MovieList.scss"
import {} from 'react-icons/io'

//import requests from "../Requests/Request";



const MoviesList =({title, getReq})=> {
    const [movies, setMovies] = useState([]);
   
    
    
    


  useEffect(()=>{
    const getAll = async()=>{
      try{
        const url = "http://localhost:5000"
        
        const response = await fetch(url.concat(getReq));
   
        const jsonData = await response.json()
  
        
        setMovies(jsonData)
  
      }catch(err){
        console.log(err.message)
      }
    }
    getAll()
  },[getReq])
 
  console.log(movies)

  return(
  <>
    
      <h2>{title}</h2>

       
          <div className="movieList">
          {movies.map(movie=>[
            <div className="movies" key={movie.movie_id}>
               <div className="posters" ><img href={movie.movie_href} src={movie.movie_poster} alt=""/></div>
               <div className="itemInfo">
              <text className="titles">Title: {movie.movie_title}</text>
              <p className="desc"><div className="descW">Description:</div> {movie.movie_description}</p>
              {/* <iframe width="225" height="130" src="" title="YouTube video player" frameborder="0" allowfullscreen></iframe> */}
              </div>
             
            </div>
         
          ])}

          </div>
     
       
     
      </>

   
  )
};


export default MoviesList;