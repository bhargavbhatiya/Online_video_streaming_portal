import { combineReducers } from "redux";
import auth from "./authReducer";
import token from "./tokenReducer";
import users from "./usersReducer";
import movies from "./moviesReducer";

export default combineReducers({
	auth,
	token,
	users,
	movies,
});
