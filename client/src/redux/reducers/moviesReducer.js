import ACTIONS from "../actions/";

const movies = [];

const moviesReducer = (state = movies, action) => {
  switch (action.type) {
    case ACTIONS.GET_ALL_MOVIES:
      return action.payload;
    case ACTIONS.GET_MOVIE:
      return action.payload;

    default:
      return state;
  }
};

export default moviesReducer;
