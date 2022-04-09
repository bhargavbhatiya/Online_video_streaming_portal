import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "../../movies/Carousel/Carousel";
import "../../movies/Carousel/Carousel.css";

const PopularMovies = () => {
	const [popularMovies, setPopularMovies] = useState([]);

	const unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg";
	var poster = [];

	const fetchPoster = (movie_id) => {
		return axios.get(
			`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.REACT_APP_API_KEY}`
		);
	};

	const fetchPopularMovies = async () => {
		try {
			setPopularMovies([]);

			const res = await axios.get(`/movie/getPopularMovies`);
			console.log(res.data);
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
				setPopularMovies((popularMovies) => [...popularMovies, newdata]);
			});
		} catch (err) {
			console.log("hellooo" + err);
		}
	};

	useEffect(() => {
		fetchPopularMovies();
	}, []);

	return (
		<>
			<div className="display-6 text-white mb-3 ">Popular Movies</div>

			<div ClassName="carousel">
				<Carousel id={2} recommendList={popularMovies} flag={0} />
			</div>
		</>
	);
};

export default PopularMovies;
