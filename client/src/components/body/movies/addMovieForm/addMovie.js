import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function AddMovie() {
	const auth = useSelector((state) => state.auth);
	const { isLogged, isAdmin } = auth;
	const moviesLink = () => {
		return (
			<div class="Add-movie-Page">
				<button type="button">
					<Link to="/addMovieVideo">Add Movie</Link>
				</button>
			</div>
		);
	};
	return (
		<div>
			<ul>{isLogged && isAdmin ? moviesLink() : <></>}</ul>
		</div>
	);
}

export default AddMovie;
