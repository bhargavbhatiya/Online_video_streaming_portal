import React, { useState } from "react";
import {
	showErrMsg,
	showSuccessMsg,
} from "../../utils/notification/Notification";
import { useSelector } from "react-redux";
import axios from "axios";

function AddMovieForm() {
	const auth = useSelector((state) => state.auth);
	const token = useSelector((state) => state.token);

	const initialState = {
		title: "",
		description: "",
		year: "",
		duration: "",
		genre: "",
		rating: "",
		imgUrl: "",
		cast: "",
		language: "",
		country: "",
		imdb_id: "",
		err: "",
		success: "",
	};
	const [movie, setMovie] = useState(initialState);

	const {
		title,
		description,
		year,
		duration,
		genre,
		rating,
		imgUrl,
		cast,
		language,
		country,
		imdb_id,
		uploadedBy,
		err,
		success,
	} = movie;

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setMovie({ ...movie, [name]: value, err: "", success: "" });
	};

	// const array = [
	// 	{ key: 0, label: "comedy" },
	// 	{ key: 1, label: "Drama" },
	// 	{ key: 2, label: "Polymer" },
	// 	{ key: 3, label: "React" },
	// 	{ key: 4, label: "Vue.js" },
	// ];
	// const handleDelete = (chipToDelete) => {
	// 	// array.push(chipToDelete);
	// 	// setMovie((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
	// };

	// const handleAddition = (chip) => {
	// 	console.log(chip);
	// 	// setMovie((chips) => [...chips, chip]);
	// };
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
				<h2>Add Movie Details</h2>
				{err && showErrMsg(err)}
				{success && showSuccessMsg(success)}
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="title">Movie Name</label>
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
						<label htmlFor="description">Description</label>
						<input
							type="text"
							placeholder="Enter movie description"
							id="description"
							value={description}
							name="description"
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<label htmlFor="year">Year</label>
						<input
							type="text"
							placeholder="Enter movie year"
							id="year"
							value={year}
							name="year"
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<label htmlFor="duration">Duration</label>
						<input
							type="text"
							placeholder="Enter movie duration"
							id="duration"
							value={duration}
							name="duration"
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<label htmlFor="genre">Genre</label>
						<input
							type="text"
							placeholder="Enter movie genre"
							id="genre"
							value={genre}
							name="genre"
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<label htmlFor="rating">Rating</label>
						<input
							type="text"
							placeholder="Enter movie rating"
							id="rating"
							value={rating}
							name="rating"
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<label htmlFor="imgUrl">Image URL</label>
						<input
							type="text"
							placeholder="Enter movie image url"
							id="imgUrl"
							value={imgUrl}
							name="imgUrl"
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<label htmlFor="cast">Cast</label>
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
						<label htmlFor="language">Language</label>
						<input
							type="text"
							placeholder="Enter movie language"
							id="language"
							value={language}
							name="language"
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<label htmlFor="country">Country</label>
						<input
							type="text"
							placeholder="Enter movie country"
							id="country"
							value={country}
							name="country"
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<label htmlFor="imdb_id">IMDB ID</label>
						<input
							type="text"
							placeholder="Enter movie imdb id"
							id="imdb_id"
							value={imdb_id}
							name="imdb_id"
							onChange={handleChangeInput}
						/>
					</div>
					<div className="row">
						<button type="submit">Upload Details</button>
					</div>
				</form>

				{/* {array.map((data) => {
					let icon;
					return (
						<ListItem key={data.key}>
							<Chip
								icon={icon}
								label={data.label}
								onDelete={(data) => handleAddition(data)}
							/>
						</ListItem>
					);
				})} */}
			</div>
		</>
	);
}

export default AddMovieForm;
