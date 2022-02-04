const Moviesdbcs = require("../models/movieModel");

const movieCtrl = {
	add_movie_details: async (req, res) => {
		console.log(req.user);
		console.log(req.body);
		try {
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
			} = req.body;

			const newMovie = new Moviesdbcs(
				{
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
					uploadedBy: req.user.id,
				}
				// { collection: "moviesdbcs" }
			);
			await newMovie.save();

			res.json({ msg: "Details Added Successfully!" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	get_allmovies: async (req, res) => {
		console.log("inside get_movies");
		// console.log(req.user);
		//console.log(req.body);
		try {
			const movies = await Moviesdbcs.find({}).limit(20);
			//console.log("first"+movies);
			const allmovies = movies.map((movie) => {
				console.log(movie.movie_id);
				return movie;
			});

			res.json({ msg: "movie find successfully", movies: allmovies });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},

	get_movie: async (req, res) => {
		console.log("inside get_movie using id");
		console.log(req.user);
		console.log(req.params.id);
		try {
			console.log(req.params.id);

			const movie = await Moviesdbcs.find({
				// title: new RegExp(`^${req.params.id}$`, "i"),
				movie_id: req.params.id,
			});
			// console.log("first" + movies);
			if (movie.length == 0) {
				return res.status(404).json({ msg: "movie not found" });
			}

			res.json({ msg: "movie find successfully", movie: movie });
		} catch (err) {
			console.log(err.message);
			return res.status(500).json({ msg: err.message });
		}
	},
};

module.exports = movieCtrl;
