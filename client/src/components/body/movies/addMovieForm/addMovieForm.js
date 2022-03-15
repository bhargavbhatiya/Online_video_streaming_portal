import React, { useState } from "react";
import {
	showErrMsg,
	showSuccessMsg,
} from "../../../utils/notification/Notification";
import { useSelector } from "react-redux";
import "./addVideo.css";
import axios from "axios";
function AddMovieForm() {
	const token = useSelector((state) => state.token);

	const initialState = {
		movie_id: "",
		title: "",
		overview: "",
		genres: "",
		keywords: "",
		cast: "",
		crew: "",
		popularity: "",
		production_companies: "",
		runtime: "",
		tagline: "",
		vote_average: "",
		vote_count: "",
		release_date: "",
		original_language: "",
		videoUrl: "",
		success: "",
		err: "",
	};
	const [movie, setMovie] = useState(initialState);

	const {
		movie_id,
		title,
		overview,
		genres,
		keywords,
		cast,
		crew,
		popularity,
		production_companies,
		runtime,
		tagline,
		vote_average,
		vote_count,
		release_date,
		original_language,
		videoUrl,
		success,
		err,
	} = movie;

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setMovie({ ...movie, [name]: value, err: "", success: "" });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.post("/movie/add_movie_details", movie, {
				headers: { Authorization: token },
			});

			setMovie({ ...movie, err: "", success: res.data.msg });
		} catch (err) {
			err.response.data.msg &&
				setMovie({ ...movie, err: err.response.data.msg, success: "" });
		}
	};
	return (
		<>
			<div className="moviesPage">
				<div className="display-6 text-white">Add Movie Details</div>
				{err && showErrMsg(err)}
				{success && showSuccessMsg(success)}
				<div className="form-for-movie-details">
					<div>
						<label htmlFor="movie_id">Movie ID</label>
						<input
							type="text"
							placeholder="Enter movie movie id"
							id="movie_id"
							value={movie_id}
							name="movie_id"
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<label htmlFor="title">title</label>
						<input
							type="text"
							placeholder="Enter movie title"
							id="title"
							value={title}
							name="title"
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<label htmlFor="overview">overview</label>
						<input
							type="text"
							placeholder="Enter movie overview"
							id="overview"
							value={overview}
							name="overview"
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<label htmlFor="genres">genres</label>
						<input
							type="text"
							placeholder="Enter movie genres"
							id="genres"
							value={genres}
							name="genres"
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<label htmlFor="keywords">keywords</label>
						<input
							type="text"
							placeholder="Enter movie keywords"
							id="keywords"
							value={keywords}
							name="keywords"
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<label htmlFor="cast">cast</label>
						<input
							type="text"
							placeholder="Enter movie cast"
							id="cast"
							value={cast}
							name="cast"
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<label htmlFor="crew">crew</label>
						<input
							type="text"
							placeholder="Enter movie image url"
							id="crew"
							value={crew}
							name="crew"
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<label htmlFor="popularity">popularity</label>
						<input
							type="text"
							placeholder="Enter movie popularity"
							id="popularity"
							value={popularity}
							name="popularity"
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<label htmlFor="production_companies">production companies</label>
						<input
							type="text"
							placeholder="Enter movie production companies"
							id="production_companies"
							value={production_companies}
							name="production_companies"
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<label htmlFor="runtime">runtime</label>
						<input
							type="text"
							placeholder="Enter movie runtime"
							id="runtime"
							value={runtime}
							name="runtime"
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<label htmlFor="tagline">tagline</label>
						<input
							type="text"
							placeholder="Enter movie tagline"
							id="tagline"
							value={tagline}
							name="tagline"
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<label htmlFor="vote_average">vote average</label>
						<input
							type="text"
							placeholder="Enter movie vote average"
							id="vote_average"
							value={vote_average}
							name="vote_average"
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<label htmlFor="vote_count">vote count</label>
						<input
							type="text"
							placeholder="Enter movie vote count"
							id="vote_count"
							value={vote_count}
							name="vote_count"
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<label htmlFor="release_date">release date</label>
						<input
							type="text"
							placeholder="Enter movie release date"
							id="release_date"
							value={release_date}
							name="release_date"
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<label htmlFor="original_language">original language</label>
						<input
							type="text"
							placeholder="Enter movie original language"
							id="original_language"
							value={original_language}
							name="original_language"
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<label htmlFor="videoUrl">videoUrl</label>
						<input
							type="text"
							placeholder="Enter movie videoUrl"
							id="videoUrl"
							value={videoUrl}
							name="videoUrl"
							onChange={handleChangeInput}
						/>
					</div>

					<button className="button-64" onClick={handleSubmit}>
						<span className="text">Upload Details</span>
					</button>
				</div>
			</div>
		</>
	);
}

export default AddMovieForm;
