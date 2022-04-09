const MoviesDBC = require("../models/movieModel");
const Users = require("../models/userModel");
const movieCtrl = {
	add_movie_details: async (req, res) => {



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
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},

	getTotalMovies: async (req, res) => {
		try {
			const totalMovies = await MoviesDBC.countDocuments();
			res.json(totalMovies);
		} catch (err) {
			console.log(err);

			return res.status(500).json({ msg: err.message });
		}
	},

	get_allmovies: async (req, res) => {
		const { page } = req.params;
		const skip1 = (page - 1) * 21;
		try {


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
					tagline: 0,
					vote_count: 0,
					original_language: 0,
					videoUrl: 0,
					uploadedBy: 0,
					commentList: 0,
				}
			).skip(skip1).limit(21);

			res.json({
				msg: "movies find successfully",
				movies: movies,
			});
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},

	getPopularMovies: async (req, res) => {
		try {
			const movies = await MoviesDBC.find(
				{},
				{
					_id: 0,
					overview: 0,
					genres: 0,
					keywords: 0,
					cast: 0,
					crew: 0,
					production_companies: 0,
					tagline: 0,
					vote_count: 0,
					original_language: 0,
					videoUrl: 0,
					uploadedBy: 0,
					commentList: 0,
				}
			).sort({ popularity: -1 }).limit(15);

			res.json({
				msg: "movies find successfully",
				movies: movies,
			});
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},

	allMovieList: async (req, res) => {
		try {
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
					vote_average: 0,
					vote_count: 0,
					release_date: 0,
					original_language: 0,
					videoUrl: 0,
					uploadedBy: 0,
					commentList: 0,
				}
			)
			const allmovies = movies.map((movie) => {
				const obj = {
					movie_id: movie.movie_id,
					label: movie.title,
				};
				return obj;
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
	setVideoUrl: async (req, res) => {
		try {
			const { movie_id, videoUrl } = req.body;
			const movie = await MoviesDBC.findOneAndUpdate(
				{ movie_id },
				{ videoUrl },
				{ new: true }
			);
			res.json({
				msg: "Url attached to movie successfully",
				movie,
			});
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},
	get_movie: async (req, res) => {

		try {


			const movie = await MoviesDBC.find({ movie_id: req.params.id });
			if (movie.length == 0) {
				return res.status(404).json({ msg: "movie not found" });
			}



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

		try {
			const name = req.params.name;



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

			if (movie.length == 0) {
				return res.json({ msg: "movie not found" });
			}


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

		try {
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

		const { movie_id, email } = req.body;


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
			await user.save();
			res.json({ msg: "movie added to watch later list" });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},

	checkWatchLater: async (req, res) => {

		const { movie_id, email } = req.body;


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

		const { email } = req.body;

		try {
			const user = await Users.findOne({ email: email });
			const watchLaterList = user.watchLaterList;

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
				})
			);
			res.json({ movies });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},
	removeWatchLater: async (req, res) => {

		const { movie_id, email } = req.body;

		const user = await Users.findOne({ email: email });

		try {
			if (user.watchLaterList.includes(movie_id)) {
				const user = await Users.findOneAndUpdate(
					{ email: email },
					{ $pull: { watchLaterList: movie_id } },
					{ new: true }
				);
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

		const { email } = req.body;

		try {
			const user = await Users.findOne({ email: email });
			const likedVideoList = user.likedVideoList;

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
				})
			);
			res.json({ movies });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},
	checkLiked: async (req, res) => {

		const { movie_id, email } = req.body;


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

		const { movie_id, email } = req.body;


		try {
			const user1 = await Users.findOne({ email: email });

			if (user1.likedVideoList.includes(movie_id)) {
				const user = await Users.findOneAndUpdate(
					{ email: email },
					{ $pull: { likedVideoList: movie_id } },
					{ new: true }
				);
				await user.save();
				return res.json({ msg: "movie is disliked" });
			}

			const user = await Users.findOneAndUpdate(
				{ email: email },
				{ $push: { likedVideoList: movie_id } },
				{ new: true }
			);
			await user.save();
			res.json({ msg: "movie is liked" });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},
	getHistoryList: async (req, res) => {
		const { email } = req.body;
		try {
			const user = await Users.findOne({ email: email });
			const historyList = user.historyList;
			historyList.reverse();

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
				})
			);

			res.json({ movies });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},
	updateHistoryList: async (req, res) => {

		const { movie_id, email } = req.body;


		try {
			const user = await Users.findOne({ email: email });
			const historyList = user.historyList;

			if (historyList.includes(movie_id)) {
				const user = await Users.findOneAndUpdate(
					{ email: email },
					{ $pull: { historyList: movie_id } },
					{ new: true }
				);
				await user.save();
			}

			const user1 = await Users.findOneAndUpdate(
				{ email: email },
				{ $push: { historyList: movie_id } },
				{ new: true }
			);
			await user1.save();
			res.json({ msg: "movie is added to history" });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},
	addComment: async (req, res) => {

		const { username, email, movie_id, comment, date } = req.body;
		try {
			let commentObj = {
				username: username,
				email: email,
				createdAt: date,
				comment: comment,
			};

			const movie = await MoviesDBC.findOneAndUpdate(
				{ movie_id: movie_id },
				{ $push: { commentList: commentObj } },
				{ new: true }
			);
			await movie.save();
			commentObj = movie.commentList[movie.commentList.length - 1];


			res.json({ msg: "Comment is Added", commentObj });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},

	getComments: async (req, res) => {
		const { movie_id } = req.body;
		try {
			const movie = await MoviesDBC.findOne({ movie_id: movie_id });
			const commentList = movie.commentList;
			res.json({ commentList });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},



	deleteComment: async (req, res) => {

		const { movie_id, comment_id } = req.body;
		try {
			const movie = await MoviesDBC.findOneAndUpdate(
				{ movie_id: movie_id },
				{ $pull: { commentList: { _id: comment_id } } },
				{ new: true }
			);
			await movie.save();
			res.json({ msg: "Comment is Deleted" });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},
};


module.exports = movieCtrl;
