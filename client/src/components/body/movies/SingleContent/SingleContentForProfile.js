import { Badge } from "@material-ui/core";
import { unavailable } from "../../../../config/config";
import "./SingleContentForProfile.css";
//import ContentModal from "../ContentModal/ContentModal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";

const SingleContentForProfile = ({
	id,
	poster_path,
	title,
	date,
	media_type,
	vote_average,
	notify,
	flag,
	overview,
	tagline,
}) => {
	function gotoMovies() {}
	const [isAdded, setIsAdded] = useState(false);
	const auth = useSelector((state) => state.auth);

	const email = auth.user.email;
	// const checkWatchLater = async () => {
	// 	console.log("check watch later");
	// 	const movie_id = id;
	// 	try {
	// 		const res = await axios.post("/movie/checkWatchLater", {
	// 			movie_id,
	// 			email,
	// 		});

	// 		// console.log(res.data.msg);
	// 		if (res.data.msg) {
	// 			setIsAdded(true);
	// 		}

	// 		console.log(res);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	// const addToWatchLater = async () => {
	// 	console.log("add to watch later");
	// 	const movie_id = id;
	// 	const email = auth.user.email;
	// 	try {
	// 		const res = await axios.post("/movie/addToWatchLater", {
	// 			movie_id,
	// 			email,
	// 		});

	// 		notify(res.data.msg);
	// 		console.log(res);
	// 		checkWatchLater();
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	// useEffect(() => {
	// 	// window.scroll(0, 0);
	// 	//console.log("useEffect");
	// 	checkWatchLater();
	// 	// eslint-disable-next-line
	// }, [email]);

	const goTomovie = async () => {
		if (flag === 2) {
			await axios.post("/movie/removeWatchLater", {
				movie_id: id,
				email: auth.user.email,
			});
		}
		if (flag === 1) {
			await axios.post("/movie/updateHistoryList", {
				movie_id: id,
				email: auth.user.email,
			});
		}
	};
	return (
		<>
			<Link to={`/movie/${id}`}>
				<div
					className="single-content ContentModal__description"
					onClick={goTomovie}
				>
					<div className="single-content-img">
						<img src={poster_path} alt={title} />
					</div>

					<div className="single-content-info">
						<div className="single-content-info-title">
							<h1>{title}</h1>
							<i className="tagline">{tagline}</i>
						</div>

						<span className="overview">{overview}</span>
						<h4>
							<b>Release Date: </b>
							{date}
						</h4>
					</div>
				</div>
			</Link>
		</>
	);
};

export default SingleContentForProfile;
