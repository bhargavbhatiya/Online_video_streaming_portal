import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
//import Genres from "../../components/Genres/Genres";
import SingleContent from "../movies/SingleContent/SingleContent";
//import useGenre from "../../hooks/useGenre";
//import CustomPagination from "../../components/Pagination/CustomPagination";
import "./home.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import CustomPagination from "./CustomPagination/CustomPagination";
import Loader from "../Loader/Loader.js";
import PopularMovies from "./PopularMovies/PopularMovies";

function Home() {
	//const [genres, setGenres] = useState([]);
	//const [selectedGenres, setSelectedGenres] = useState([]);
	const [page, setPage] = useState(1);
	const [content, setContent] = useState([]);


	const [numOfPages, setNumOfPages] = useState();
	const [isLoading, setIsLoading] = useState(false);
	//const genreforURL = useGenre(selectedGenres);
	// console.log(selectedGenres);
	//const [poster, setPoster] = useState([]);
	const unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg";
	var poster = [];

	const fetchPoster = (movie_id) => {
		return axios.get(
			`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.REACT_APP_API_KEY}`
		);
	};

	const notify = (msg) => {
		toast(msg);
	};
	const fetchMovies = async () => {

		try {
			setContent([]);
			setIsLoading(true);
			const res = await axios.get(`/movie/get_allmovie/${page}`);
			// console.log(res.data);
			const { movies } = res.data;

			const posterdata = await Promise.all(
				movies.map((movie) => fetchPoster(movie.movie_id))
			);

			posterdata.forEach((movie) => {
				if (movie.data.poster_path != null)
					poster.push(
						`https://image.tmdb.org/t/p/w300${movie.data.poster_path}`
					);
				else poster.push(unavailable);
			});

			var cnt = 0;

			movies.forEach((movie) => {
				const {
					movie_id,
					title,
					overview,
					release_date,
					runtime,
					vote_average,
				} = movie;
				const poster_path = poster[cnt];
				cnt++;
				const newdata = {
					movie_id,
					title,
					overview,
					release_date,
					runtime,
					poster_path,
					vote_average,
				};
				// console.log(newdata);
				setContent((content) => [...content, newdata]);
			});
			setIsLoading(false);

		} catch (err) {
			// console.log("hellooo" + err);
		}

		//setContent(data.results);
		//setNumOfPages(data.total_pages);
	};




	const fetchtotalmovies = async () => {
		console.log("fetchtotalmovies");
		try {
			const data = await axios.get("/movie/getTotalMovies");
			// console.log(data.data);
			let total_pages = data.data / 21;
			// console.log(Math.ceil(total_pages));
			setNumOfPages(Math.ceil(total_pages));


		} catch (err) {
			// console.log("hellooo" + err);
		}
	}




	useEffect(() => {
		// window.scroll(0, 0);
		//console.log("useEffect");
		fetchtotalmovies();
		// eslint-disable-next-line
	}, []);


	useEffect(() => {
		// window.scroll(0, 0);
		//console.log("useEffect");
		fetchMovies();

		// eslint-disable-next-line
	}, [page]);


	return (
		<>
			<ToastContainer />

			<PopularMovies />
			<div className="home-container">

			<div className="display-4">All Movies</div>
			</div>
			<div className="trending">

				{isLoading === true ? (

					<Loader />
				) :

					(
						
							
						content.map((c) => (
							<SingleContent
								key={c.movie_id}
								id={c.movie_id}
								poster={c.poster_path}
								title={c.title}
								date={c.release_date}
								media_type="movie"
								vote_average={c.vote_average}
								notify={notify}
							/>
							))
						
					)}
			</div>
			<CustomPagination setPage={setPage} numOfPages={numOfPages} />
		</>
	);
}

export default Home;
