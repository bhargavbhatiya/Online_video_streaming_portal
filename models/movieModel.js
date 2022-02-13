const mongoose = require("mongoose");
const double = require("@mongoosejs/double");
const movieSchema = new mongoose.Schema(
	{

		movie_id: {
			type: Number,
			required: [true, "Please enter movie id!"],
			unique: true,
		},
		title: {
			type: String,
			//required: [true, "Please enter movie Title!"],
			
		},
		overview: {
			type: String,
			//required: [true, "Please enter movie description!"],
		},
		genres: {
			type: String,
			//required: [true, "Please enter movie genres!"],
		},

	    keywords: {
			type: String,
			//required: [true, "Please enter movie keywords!"],
		},

	       cast: {
			type: String,
			//required: [true, "Please enter movie cast!"]
		},

		crew: {
			type: String,
			//required: [true, "Please enter movie crew!"]
		},

		popularity: {
			type: String,
			//required: [true, "Please enter movie duration!"],
		},
	
		production_companies: {
			type: String,
			//required: [true, "Please enter movie production companies!"],
		},
		runtime: {
			type: String,
			//required: [true, "Please enter movie duration!"],
		},

		tagline: {
			type: String,
			//required: [true, "Please enter movie tagline!"],
		},

		vote_average: {
			type: String,
			//required: [true, "Please enter movie vote average!"],
		},

		vote_count: {
			type: String,
			//required: [true, "Please enter movie vote count!"],
		},

		release_date: {
			type: String,
			//required: [true, "Please enter movie release date!"],
		},

		original_language: {
			type: String,
			//required: [true, "Please enter movie original language!"],
		},
		
		videoUrl: {
			type: String,
			default:'',
		}
	},
);

module.exports = mongoose.model("moviesDBC", movieSchema, "moviesDBC");
