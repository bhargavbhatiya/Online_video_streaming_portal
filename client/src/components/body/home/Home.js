import React from "react";
import axios from "axios";
import {useEffect, useState } from "react";
//import Genres from "../../components/Genres/Genres";
import SingleContent from "../movies/SingleContent/SingleContent";
//import useGenre from "../../hooks/useGenre";
//import CustomPagination from "../../components/Pagination/CustomPagination";
import "./home.css";

function Home() {

  

  //const [genres, setGenres] = useState([]);
  //const [selectedGenres, setSelectedGenres] = useState([]);
  //const [page, setPage] = useState(1);
   const [content, setContent] = useState([]);
  //const [numOfPages, setNumOfPages] = useState();
  //const genreforURL = useGenre(selectedGenres);
  // console.log(selectedGenres);
  //const [poster, setPoster] = useState([]);
   const unavailable ="https://www.movienewz.com/img/films/poster-holder.jpg";
  var poster=[];
  
const fetchPoster = (movie_id) => {

  return axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=03e0bf2107b04c431fb59f7dafb7905b`
  )


};

  const fetchMovies = async () => {
 
console.log("fetchMovies");
    try{
    const res= await axios.get('/movie/get_allmovie');
    console.log(res.data);
    const {movies}=res.data;
    
  

    const posterdata = await Promise.all(movies.map(movie => fetchPoster(movie.movie_id)));

    posterdata.forEach(movie => {
      if(movie.data.poster_path!=null)
      poster.push(`https://image.tmdb.org/t/p/w300${movie.data.poster_path}`);
      else
      poster.push(unavailable);
    });

    var cnt=0;

    movies.forEach(movie => {
      const {movie_id, title,overview, release_date, runtime,vote_average} = movie;
      const poster_path = poster[cnt];
      cnt++;
      const newdata = {
        movie_id,
        title,
        overview,
        release_date,
        runtime,
        poster_path,
        vote_average
      };
      console.log(newdata);
      setContent(content => [...content, newdata]);
      
    });

    }
    catch(err){
      console.log("hellooo"+err);
    }

    //setContent(data.results);
    //setNumOfPages(data.total_pages);
  };

  useEffect(() => {
   // window.scroll(0, 0);
   //console.log("useEffect");
    fetchMovies();
    // eslint-disable-next-line
  }, []);

  return (
    
    <div className="trending">
        {content &&
          content.map((c) => (

            <SingleContent
              key={c.movie_id}
              id={c.movie_id}
              poster={c.poster_path}
              title={c.title}
              date={c.release_date}
              media_type="movie"
              vote_average={c.vote_average}

            />
          ))}
      </div>
    
  
  );
}


export default Home;
