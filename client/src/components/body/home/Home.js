import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../movies/SingleContent/SingleContent";
import "./home.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import CustomPagination from "./CustomPagination/CustomPagination";
import Loader from "../Loader/Loader.js";
import PopularMovies from "./PopularMovies/PopularMovies";

function Home() {
	const [page, setPage] = useState(1);
	const [content, setContent] = useState([]);

	const [numOfPages, setNumOfPages] = useState();
	const [isLoading, setIsLoading] = useState(false);

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
				setContent((content) => [...content, newdata]);
			});
			setIsLoading(false);
		} catch (err) {
			console.log("hellooo" + err);
		}


	};

	const fetchtotalmovies = async () => {
		console.log("fetchtotalmovies");
		try {
			const data = await axios.get("/movie/getTotalMovies");
			let total_pages = data.data / 21;
			setNumOfPages(Math.ceil(total_pages));
		} catch (err) {
		}
	};

	useEffect(() => {

		fetchtotalmovies();

	}, []);

	useEffect(() => {

		fetchMovies();

	}, [page]);

	return (
		<>
			<ToastContainer />
			<div className="home-page">
				<PopularMovies />
				<div className="home-container">
					<div className="display-6 text-white">All Movies</div>
				</div>
				<div className="all-movies">
					{isLoading === true ? (
						<Loader />
					) : (
						content.map((c) => (
							<div className="carouselItem-home">
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
							</div>
						))
					)}
					<CustomPagination setPage={setPage} numOfPages={numOfPages} />
				</div>
			</div>
		</>
	);
}

export default Home;
