import {
    Button,
    createMuiTheme,
    Tab,
    Tabs,
    TextField,
    ThemeProvider,
  } from "@material-ui/core";
  import "./search.css";
  import SearchIcon from "@material-ui/icons/Search";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import SingleContent from "../../movies/SingleContent/SingleContent";
  
  const Search = () => {

    const [searchText, setSearchText] = useState("");
    const [content, setContent] = useState([]);
  
    const darkTheme = createMuiTheme({
      palette: {
        type: "dark",
        primary: {
          main: "#fff",
        },
      },
    });

    var poster=[];
  
   const fetchPoster = (movie_id) => {

  return axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=03e0bf2107b04c431fb59f7dafb7905b`
  )


};
  
    const fetchSearch = async () => {
      try {
        // const { data } = await axios.get(
        //   `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
        //     process.env.REACT_APP_API_KEY
        //   }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
        // );
        // setContent(data.results);
        // setNumOfPages(data.total_pages);
        // // console.log(data);
        var cnt=0;

        const res= await axios.get('/movie/get_movie',{params:{searchText}});
        console.log(res.data);
        const {movies}=res.data;
        
      
    
        const posterdata = await Promise.all(movies.map(movie => fetchPoster(movie.movie_id)));
    
        posterdata.forEach(movie => {
          poster.push(`https://image.tmdb.org/t/p/w300${movie.data.poster_path}`);
        });
    
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
    const ab=2;
        //setContent(ab);
        // setContent(content => [...content, 2]);
        // setContent(content => [...content, 3]);
    
        console.log(content);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      window.scroll(0, 0);
      fetchSearch();
      // eslint-disable-next-line
    }, []);
  
    return (
      <div>
       

          <div className="search">
            <TextField
              style={{ flex: 1 }}
              className="searchBox"
              label="Search"
              variant="filled"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button
              onClick={fetchSearch}
              variant="contained"
              style={{ marginLeft: 10 }}
            >
              <SearchIcon fontSize="large" />
            </Button>
          </div>
        

        <div className="trending">
        {content &&
            content.map((c) => (
  
              <SingleContent
                key={c.movie_id}
                id={c.movie_id}
                poster={c.poster_path}
                title={c.title}
                date={c.release_date}
                vote_average={c.vote_average}
              />
            ))}
          {searchText &&
            !content &&
            (<h2>No Movies Found</h2>)}
        </div>
      
      </div>
    );
  };
  
  export default Search;