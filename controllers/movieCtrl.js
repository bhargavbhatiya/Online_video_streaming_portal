const Movies = require("../models/movieModel");

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
			});

			await newMovie.save();

			res.json({ msg: "Details Added Successfully!" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

module.exports = movieCtrl;
