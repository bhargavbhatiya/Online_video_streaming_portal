const MoviesDBC = require("../models/movieModel");

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

			const newMovie = new MoviesDBC(
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

			);
			await newMovie.save();

			res.json({ msg: "Details Added Successfully!" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	get_allmovies: async (req, res) => {
		console.log("inside get_movies");

		try {
			const movies = await MoviesDBC.find({}).limit(20);
			//console.log("first"+movies);
			const allmovies = movies.map((movie) => {
				console.log(movie.movie_id);
				return movie;
			});
			res.json({
				msg: "movie find successfully",
				movies: allmovies
			});
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},

     get_movie: async (req, res) => {
		console.log("inside get_movie using id");
		// console.log(req.user);
		//console.log(req.body);
		try {
			console.log(req.params.id);

			//   MoviesDBC.findOneAndUpdate({movie_id:req.params.id},{$set:{videoUrl:"awhsiudubadu"}},{new:true},(err,movie)=>{
			// 	if(err)

			// 		console.log(err);
			// 	else

			// 		console.log(movie);
			// });


			const movie = await MoviesDBC.find({ movie_id: req.params.id });
			//console.log("first"+movies);
			if (movie.length == 0) {
				return res.status(404).json({ msg: "movie not found" });
			}


			movie.forEach(movie => {
				console.log(movie.videoUrl);
			});


			res.json({
				msg: "movie find successfully",
				movie: movie
			});
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},
};

module.exports = movieCtrl;
