const  MoviesDBC = require("../models/movieModel");

const movieCtrl = {
	add_movie_details: async (req, res) => {
		console.log(req.user);
		console.log(req.body);
		try {
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
			} = req.body;

			const newMovie = new Movies({
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
				uploadedBy: req.user.id,
			}
			//collection: "movies",
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
		
			const movies = await MoviesDBC.find({}).limit(20);
				//console.log("first"+movies);
			const allmovies = movies.map((movie) => {
				console.log(movie.movie_id);
				return movie;
			});

		

			res.json({ msg: "movie find successfully",  
			movies:allmovies });
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

			const movie = await MoviesDBC.find({title: new RegExp(`^${req.params.id}$`, 'i')});
				//console.log("first"+movies);
			if(movie.length==0)
			{
				return res.status(404).json({ msg: "movie not found" });
			}


		

			res.json({ msg: "movie find successfully",  
			movie:movie });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},
};

module.exports = movieCtrl;
