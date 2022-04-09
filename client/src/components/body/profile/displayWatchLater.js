import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import SingleContentForProfile from "../movies/SingleContent/SingleContentForProfile";
import { unavailable } from "../../../config/config.js";

const DisplayWatchLater = () => {
	const auth = useSelector((state) => state.auth);
	const [content, setContent] = useState([]);

	const poster = [];
	const fetchPoster = (movie_id) => {
		return axios.get(
			`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.REACT_APP_API_KEY}`
		);
	};
	const email = auth.user.email;
	const fetchMovies = async () => {

		try {
			if (email === undefined) return;
			setContent([]);
			const res = await axios.post("/movie/getWatchLaterList", { email });

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
					tagline,
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
					tagline,
				};
				setContent((content) => [...content, newdata]);
			});
		} catch (err) {
			console.log("Error" + err);
		}


	};
	useEffect(() => {
		setContent([]);
		fetchMovies();
	}, [email]);
	return (
		<div>
			<h2>Watch Later</h2>
			{content &&
				content.map((c) => (
					<SingleContentForProfile
						key={c.movie_id}
						id={c.movie_id}
						poster_path={c.poster_path}
						title={c.title}
						date={c.release_date}
						media_type="movie"
						vote_average={c.vote_average}
						flag={2}
						overview={c.overview}
						runtime={c.runtime}
						tagline={c.tagline}
					/>
				))}
		</div>
	);
};

export default DisplayWatchLater;
