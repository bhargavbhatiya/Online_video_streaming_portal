import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import AddMovie from "../body/movies/addMovie";
import "./header.css";

function Header() {
	const auth = useSelector((state) => state.auth);

	const { user, isLogged } = auth;

	const handleLogout = async () => {
		try {
			await axios.get("/user/logout");
			localStorage.removeItem("firstLogin");
			window.location.href = "/";
		} catch (err) {
			window.location.href = "/";
		}
	};

	// <li className="drop-nav">
	// 	<Link to="#" className="avatar">
	// 		<img src={user.avatar} alt="" /> {user.name}{" "}
	// 		<i className="fas fa-angle-down"></i>
	// 	</Link>
	// 	<ul className="dropdown">
	// 		<li>
	// 			<Link to="/profile">Profile</Link>
	// 		</li>
	// 		<li>
	// 			<Link to="/" onClick={handleLogout}>
	// 				Logout
	// 			</Link>
	// 		</li>
	// 	</ul>
	// </li>;

	const userLink = () => {
		return (
			<div class="dropdown">
				<button
					class="btn profile-btn btn-secondary dropdown-toggle btn-sm"
					type="button"
					id="dropdownMenuButton1"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					<Link to="#" className="avatar">
						<img src={user.avatar} alt="" /> {user.name}{" "}
					</Link>
				</button>
				<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
					<Link to="/profile" className="dropdown-item mx-0">
						Profile
					</Link>

					<Link to="/" className="dropdown-item" onClick={handleLogout}>
						Logout
					</Link>
				</ul>
			</div>
		);
	};

	return (
		<header>
			<div className="logo">
				<h4>
					<Link to="/">Video Streaming Portal</Link>
				</h4>
			</div>

			<AddMovie />

			<ul>
				{isLogged ? (
					userLink()
				) : (
					<li>
						<Link to="/login">
							<i className="fas fa-user"></i> Sign in
						</Link>
					</li>
				)}
			</ul>
		</header>
	);
}

export default Header;
