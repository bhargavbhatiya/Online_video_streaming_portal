const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please enter your name!"],
			trim: true,
		},
		
		email: {
			type: String,
			required: [true, "Please enter your email!"],
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Please enter your password!"],
		},
		role: {
			type: Number,
			default: 0, // 0 = user, 1 = admin
		},
		avatar: {
			type: String,
			default:
				"https://res.cloudinary.com/bhatiya-bhargav/image/upload/v1643187293/avatar/avatar_cugq40_gpb5cp.png",
		},
		watchLaterList: {
			type: [Number],
			default: [],
		},

		historyList: {
			type: [Number],
			default: [],
		},

		likedVideoList: {
			type: [Number],
			default: [],
		},
	},
	{
		timestamps: true,
	}
);


module.exports = mongoose.model("Users", userSchema);
