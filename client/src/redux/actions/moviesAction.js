import ACTIONS from "./index";
import axios from "axios";

export const fetchAllMovies = async (token) => {
	const res = await axios.get("/user/all_movies", {
		headers: { Authorization: token },
	});
	return res;
};

export const dispatchGetAllUsers = (res) => {
	return {
		type: ACTIONS.GET_ALL_MOVIES,
		payload: res.data,
	};
};

export const fetchMovies = async (token) => {
	const res = await axios.get("/user/movie", {
		headers: { Authorization: token },
	});
	return res;
};

export const dispatchGetMovie = (res) => {
	return {
		type: ACTIONS.GET_MOVIE,
		payload: res.data,
	};
};
