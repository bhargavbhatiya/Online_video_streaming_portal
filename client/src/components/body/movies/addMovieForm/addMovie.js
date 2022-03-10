import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function AddMovie() {
	const auth = useSelector((state) => state.auth);
	const { isLogged, isAdmin } = auth;
	const moviesLink = () => {
		return (
			<div class="dropdown">
				<button
					class="btn btn-secondary dropdown-toggle btn-sm"
					type="button"
					id="dropdownMenuButton1"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					<Link to="#">Add Movie</Link>
				</button>
				<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
					{/* <li> */}
					<Link to="/addMovieVideo" className="dropdown-item">
						Add Movie
					</Link>
					{/* </li> */}
					{/* <li> */}
					<Link to="/addMovieForm" className="dropdown-item">
						Add Movie Details
					</Link>
					{/* </li> */}
				</ul>
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
