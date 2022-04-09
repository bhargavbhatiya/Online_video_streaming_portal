import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ActivationEmail from "./auth/ActivationEmail";
import NotFound from "../utils/NotFound/NotFound";

import ForgotPass from "../body/auth/ForgotPassword";
import ResetPass from "../body/auth/ResetPassword";

import Profile from "../body/profile/Profile";
import EditUser from "../body/profile/EditUser";

import AddMovieForm from "./movies/addMovieForm/addMovieForm";
import AddVideo from "./movies/addMovieForm/addVideo";

import Home from "../body/home/Home";

import { useSelector } from "react-redux";
import NewContentModal from "./movies/ContentModal/NewContentModal";
import Search from "./Pages/Search/search";
import "./body.css";

function Body() {
	const auth = useSelector((state) => state.auth);
	const { isLogged, isAdmin } = auth;

	return (
		<section className="body-section">
			<div id="stars"></div>
			<div id="stars2"></div>
			<div id="stars3"></div>
			<Routes>
				<Route path="/" element={isLogged ? <Home /> : <Login />} exact />

				<Route
					path="/login"
					element={isLogged ? <NotFound /> : <Login />}
					exact
				/>
				<Route
					path="/register"
					element={isLogged ? <NotFound /> : <Register />}
					exact
				/>

				<Route
					path="/forgot_password"
					element={isLogged ? <NotFound /> : <ForgotPass />}
					exact
				/>
				<Route
					path="/user/reset/:token"
					element={isLogged ? <NotFound /> : <ResetPass />}
					exact
				/>

				<Route
					path="/user/activate/:activation_token"
					element={<ActivationEmail />}
					exact
				/>

				<Route
					path="/profile"
					element={isLogged ? <Profile /> : <NotFound />}
					exact
				/>
				<Route
					path="/edit_user/:id"
					element={isAdmin ? <EditUser /> : <NotFound />}
					exact
				/>
				<Route
					path="/movie/:id"
					element={isLogged ? <NewContentModal /> : <NotFound />}
					exact
				/>
				<Route
					path="/searchmovie"
					element={isLogged ? <Search /> : <NotFound />}
					exact
				/>
				<Route
					path="/addMovieForm"
					element={isLogged && isAdmin ? <AddMovieForm /> : <NotFound />}
					exact
				/>
				<Route
					path="/addMovieVideo"
					element={isLogged && isAdmin ? <AddVideo /> : <NotFound />}
					exact
				/>
			</Routes>
		</section>
	);
}

export default Body;
