const MoviesDBC = require("../models/movieModel");
const Users = require("../models/userModel");
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

			const newMovie = new MoviesDBC({
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
			});
			await newMovie.save();

			res.json({ msg: "Details Added Successfully!" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	get_allmovies: async (req, res) => {
		console.log("inside get_movies");

		try {
			const user = await Users.find({ email: req.body.email });

			const movies = await MoviesDBC.find(
				{},
				{
					_id: 0,
					overview: 0,
					genres: 0,
					keywords: 0,
					cast: 0,
					crew: 0,
					popularity: 0,
					production_companies: 0,
					runtime: 0,
					tagline: 0,
					vote_count: 0,
					original_language: 0,
					videoUrl: 0,
					uploadedBy: 0,
				}
			).limit(20);
			//console.log("first"+movies);
			const allmovies = movies.map((movie) => {
				console.log(movie.movie_id);
				return movie;
			});
			res.json({
				msg: "movie find successfully",
				movies: allmovies,
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

			movie.forEach((movie) => {
				console.log(movie.videoUrl);
			});

			res.json({
				msg: "movie find successfully",
				movie: movie,
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
			const name = req.params.name;

			//   MoviesDBC.findOneAndUpdate({movie_id:req.params.id},{$set:{videoUrl:"awhsiudubadu"}},{new:true},(err,movie)=>{
			// 	if(err)

			// 		console.log(err);
			// 	else

			// 		console.log(movie);
			// });

			const movie = await MoviesDBC.find(
				{ title: { $regex: "^" + name, $options: "i" } },
				{
					_id: 0,
					genres: 0,
					keywords: 0,
					cast: 0,
					crew: 0,
					popularity: 0,
					production_companies: 0,
					tagline: 0,
					vote_count: 0,
					original_language: 0,
					videoUrl: 0,
					uploadedBy: 0,
				}
			);
			// //console.log("first"+movies);
			// if (movie.length == 0) {
			// 	return res.status(404).json({ msg: "movie not found" });
			// }
			if (movie.length == 0) {
				return res.json({ msg: "movie not found" });
			}

			movie.forEach((movie) => {
				console.log(movie.title);
			});

			return res.json({
				msg: "movie find successfully",
				movies: movie,
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
			const name = req.params.name;
			const movie = await MoviesDBC.find(
				{ title: { $regex: "^" + name, $options: "i" } },
				{
					_id: 0,
					overview: 0,
					genres: 0,
					keywords: 0,
					cast: 0,
					crew: 0,
					popularity: 0,
					production_companies: 0,
					runtime: 0,
					tagline: 0,
					vote_average: 0,
					vote_count: 0,
					release_date: 0,
					original_language: 0,
					videoUrl: 0,
					uploadedBy: 0,
				}
			);

			if (movie.length == 0) {
				return res.json({ msg: "movie not found" });
			}

			movie.forEach((movie) => {
				console.log(movie);
			});

			return res.json({
				msg: "movie find successfully",
				movies: movie,
			});
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},
	addToWatchLater: async (req, res) => {
		console.log("inside addToWatchLater");
		// console.log(req.user);
		//console.log(req.body);
		const { movie_id, email } = req.body;
		console.log(movie_id);
		console.log(email);

		try {
			const user1 = await Users.findOne({ email: email });

			if (user1.watchLaterList.includes(movie_id)) {
				return res.json({ msg: "movie already added to watch later List" });
			}

			const user = await Users.findOneAndUpdate(
				{ email: email },
				{ $push: { watchLaterList: movie_id } },
				{ new: true }
			);
			console.log(user);
			await user.save();
			res.json({ msg: "movie added to watch later list" });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},

	checkWatchLater: async (req, res) => {
		console.log("check addToWatchLater");
		// console.log(req.user);
		//console.log(req.body);
		const { movie_id, email } = req.body;
		console.log(movie_id);
		console.log(email);

		try {
			const user1 = await Users.findOne({ email: email });

			if (user1 && user1.watchLaterList.includes(movie_id)) {
				return res.json({ msg: true });
			}

			res.json({ msg: false });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},

	getWatchLaterList: async (req, res) => {
		console.log("inside getWatchLaterList");
		// console.log(req.user);
		//console.log(req.body);
		const { email } = req.body;
		//console.log(movie_id);
		console.log(email);

		try {
			const user = await Users.findOne({ email: email });
			const watchLaterList = user.watchLaterList;
			console.log(watchLaterList);

			const movies = await Promise.all(
				watchLaterList.map(async (movie_id) => {
					return await MoviesDBC.findOne(
						{ movie_id },
						{
							_id: 0,
							genres: 0,
							keywords: 0,
							cast: 0,
							crew: 0,
							popularity: 0,
							production_companies: 0,
							vote_count: 0,
							original_language: 0,
							videoUrl: 0,
							uploadedBy: 0,
						}
					);
					// movies.push(movie);
				})
			);
			console.log(movies.length);
			res.json({ movies });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},
	removeWatchLater: async (req, res) => {
		console.log("inside removeWatchLater");
		// console.log(req.user);
		//console.log(req.body);
		const { movie_id, email } = req.body;
		console.log(movie_id);
		console.log(email);
		const user = await Users.findOne({ email: email });

		try {
			if (user.watchLaterList.includes(movie_id)) {
				const user = await Users.findOneAndUpdate(
					{ email: email },
					{ $pull: { watchLaterList: movie_id } },
					{ new: true }
				);
				console.log(user);
				await user.save();
				res.json({ msg: "movie removed from watch later list" });
			} else {
				res.json({ msg: "movie not found in watch later list" });
			}
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},
	getLikedList: async (req, res) => {
		console.log("inside getLikedList");
		// console.log(req.user);
		//console.log(req.body);
		const { email } = req.body;
		//console.log(movie_id);
		console.log(email);
		try {
			const user = await Users.findOne({ email: email });
			const likedVideoList = user.likedVideoList;
			console.log(likedVideoList);

			const movies = await Promise.all(
				likedVideoList.map(async (movie_id) => {
					return await MoviesDBC.findOne(
						{ movie_id },
						{
							_id: 0,
							genres: 0,
							keywords: 0,
							cast: 0,
							crew: 0,
							popularity: 0,
							production_companies: 0,
							vote_count: 0,
							original_language: 0,
							videoUrl: 0,
							uploadedBy: 0,
						}
					);
					// movies.push(movie);
				})
			);
			console.log(movies.length);
			res.json({ movies });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},
	checkLiked: async (req, res) => {
		console.log("check Liked");
		// console.log(req.user);
		//console.log(req.body);
		const { movie_id, email } = req.body;
		console.log(movie_id);
		console.log(email);

		try {
			const user1 = await Users.findOne({ email: email });

			if (user1 && user1.likedVideoList.includes(movie_id)) {
				return res.json({ msg: true });
			}

			res.json({ msg: false });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},

	addToLikeList: async (req, res) => {
		console.log("inside addTolike");
		// console.log(req.user);
		//console.log(req.body);
		const { movie_id, email } = req.body;
		console.log(movie_id);
		console.log(email);

		try {
			const user1 = await Users.findOne({ email: email });

			if (user1.likedVideoList.includes(movie_id)) {
				const user = await Users.findOneAndUpdate(
					{ email: email },
					{ $pull: { likedVideoList: movie_id } },
					{ new: true }
				);
				console.log(user);
				await user.save();
				return res.json({ msg: "movie is disliked" });
			}

			const user = await Users.findOneAndUpdate(
				{ email: email },
				{ $push: { likedVideoList: movie_id } },
				{ new: true }
			);
			console.log(user);
			await user.save();
			res.json({ msg: "movie is liked" });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},
	getHistoryList: async (req, res) => {
		console.log("inside getHistoryList");
		const { email } = req.body;
		console.log(email);
		try {
			const user = await Users.findOne({ email: email });
			const historyList = user.historyList;
			historyList.reverse();
			console.log(historyList);

			const movies = await Promise.all(
				historyList.map(async (movie_id) => {
					return await MoviesDBC.findOne(
						{ movie_id },
						{
							_id: 0,
							genres: 0,
							keywords: 0,
							cast: 0,
							crew: 0,
							popularity: 0,
							production_companies: 0,
							vote_count: 0,
							original_language: 0,
							videoUrl: 0,
							uploadedBy: 0,
						}
					);
					// movies.push(movie);
				})
			);

			console.log(movies.length);
			res.json({ movies });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},
	updateHistoryList: async (req, res) => {
		console.log("inside updatehistoryList");
		// console.log(req.user);
		//console.log(req.body);
		const { movie_id, email } = req.body;
		console.log(movie_id);
		console.log(email);

		try {
			const user = await Users.findOne({ email: email });
			const historyList = user.historyList;
			console.log(historyList);

			if (historyList.includes(movie_id)) {
				const user = await Users.findOneAndUpdate(
					{ email: email },
					{ $pull: { historyList: movie_id } },
					{ new: true }
				);
				console.log(user);
				await user.save();
				// return res.json({ msg: "movie is already in history" });
			}

			const user1 = await Users.findOneAndUpdate(
				{ email: email },
				{ $push: { historyList: movie_id } },
				{ new: true }
			);
			console.log(user1);
			await user1.save();
			res.json({ msg: "movie is added to history" });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},
};

module.exports = movieCtrl;
