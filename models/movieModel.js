const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Please enter movie Title!"],
			unique: true,
		},
		description: {
			type: String,
			required: [true, "Please enter movie description!"],
		},
		year: {
			type: String,
			required: [true, "Please enter movie year!"],
		},
		duration: {
			type: String,
			required: [true, "Please enter movie duration!"],
		},
		genre: {
			type: String,
			required: [true, "Please enter movie genre!"],
		},
		rating: {
			type: String,
			required: [true, "Please enter movie rating!"],
		},
		imgUrl: {
			type: String,
			required: [true, "Please enter movie imgUrl!"],
		},
		cast: {
			type: String,
			required: [true, "Please enter movie cast!"],
		},
		language: {
			type: String,
			required: [true, "Please enter movie language!"],
		},
		country: {
			type: String,
			required: [true, "Please enter movie country!"],
		},
		imdb_id: {
			type: String,
			required: [true, "Please enter movie imdb_id!"],
		},
		uploadedBy: {
			type: mongoose.Schema.Types.ObjectId,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Movies", movieSchema);
