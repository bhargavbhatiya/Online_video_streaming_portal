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
	get_search_movie: async (req, res) => {
		console.log("inside get_search_movie using name");
		// console.log(req.user);
		//console.log(req.body);
		try {
			console.log(req.params);
			const name=req.params.name;

			//   MoviesDBC.findOneAndUpdate({movie_id:req.params.id},{$set:{videoUrl:"awhsiudubadu"}},{new:true},(err,movie)=>{
			// 	if(err)

			// 		console.log(err);
			// 	else

			// 		console.log(movie);
			// });


			const movie = await MoviesDBC.find({"title": {$regex: '^' + name, $options: 'i'}},{"_id":0,
			"genres":0,"keywords":0,"cast":0,"crew":0,"popularity":0,"production_companies":0,"tagline":0,"vote_count":0,"original_language":0,"videoUrl":0,"uploadedBy":0});
			// //console.log("first"+movies);
			// if (movie.length == 0) {
			// 	return res.status(404).json({ msg: "movie not found" });
			// }
			if (movie.length == 0) {
				return res.json({ msg: "movie not found" });
			}

			movie.forEach(movie => {
				console.log(movie.title);
			});
            

			return res.json({
			 	msg: "movie find successfully",
			 	movies: movie
			 });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},
	get_search_title: async (req, res) => {
		console.log("inside get_search_title using name");
		
		try {
			console.log(req.params);
			const name=req.params.name;
			const movie = await MoviesDBC.find({"title": {$regex: '^' + name, $options: 'i'}},{"_id":0,
				"overview":0,"genres":0,"keywords":0,"cast":0,"crew":0,"popularity":0,"production_companies":0,"runtime":0,"tagline":0,"vote_average":0,"vote_count":0,"release_date":0,"original_language":0,"videoUrl":0,"uploadedBy":0});
		
			if (movie.length == 0) {
				return res.json({ msg: "movie not found" });
			}

			movie.forEach(movie => {
				console.log(movie);
			});


            

			return res.json({
			 	msg: "movie find successfully",
			 	movies: movie
			 });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},
};

module.exports = movieCtrl;
