const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema(
	{

		movie_id: {
			type: Number,
			required: [true, "Please enter movie id!"],
			unique: true,
		},
		title: {
			type: String,

		},
		overview: {
			type: String,
		},
		genres: {
			type: String,
		},

		keywords: {
			type: String,
		},

		cast: {
			type: String,
		},

		crew: {
			type: String,
		},

		popularity: {
			type: String,
		},

		production_companies: {
			type: String,
		},
		runtime: {
			type: String,
		},

		tagline: {
			type: String,
		},

		vote_average: {
			type: String,
		},

		vote_count: {
			type: String,
		},

		release_date: {
			type: String,
		},

		original_language: {
			type: String,
		},

		videoUrl: {
			type: String,
			default: '',
		},


		commentList: {
			type: [{
				username: String,
				email: String,
				createdAt: Date,
				comment: String
			}],
			default: []
		}

	},


);



module.exports = mongoose.model("moviesDBC", movieSchema, "moviesDBC");
