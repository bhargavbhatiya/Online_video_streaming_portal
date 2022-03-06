import { Badge } from "@material-ui/core";
import { unavailable } from "../../../../config/config";
import "./SingleContent.css";
//import ContentModal from "../ContentModal/ContentModal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";

const SingleContent = ({
	id,
	poster,
	title,
	date,
	media_type,
	vote_average,
	notify,
}) => {
	const [isAdded, setIsAdded] = useState(false);
	const auth = useSelector((state) => state.auth);
	const email = auth.user.email;

	const gotoMovies = async () => {
		await axios.post("/movie/updateHistoryList", {
			movie_id: id,
			email: auth.user.email,
		});
	};
	const checkWatchLater = async () => {
		console.log("check watch later");
		const movie_id = id;
		try {
			const res = await axios.post("/movie/checkWatchLater", {
				movie_id,
				email,
			});

			// console.log(res.data.msg);
			if (res.data.msg) {
				setIsAdded(true);
			}

			// console.log(res);
		} catch (err) {
			console.log(err);
		}
	};

	const addToWatchLater = async () => {
		console.log("add to watch later");
		const movie_id = id;
		const email = auth.user.email;
		try {
			const res = await axios.post("/movie/addToWatchLater", {
				movie_id,
				email,
			});

			notify(res.data.msg);
			console.log(res);
			checkWatchLater();
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		// window.scroll(0, 0);
		//console.log("useEffect");
		// checkWatchLater();
		// eslint-disable-next-line
	}, []);

	return (
		<div className="media">
			{/* <ContentModal media_type={media_type} id={id} videoUrl={videoUrl}> */}

			<Badge
				badgeContent={vote_average}
				color={vote_average > 6 ? "primary" : "secondary"}
			/>

			<img
				className="poster"
				src={poster ? `${poster}` : unavailable}
				alt={title}
			/>
			<Link to={`/movie/${id}`}>
				<b className="title" onClick={gotoMovies}>
					{title}
				</b>
			</Link>
			<span className="subTitle">
				{/* <button className="icon1" onClick={addToWatchLater}>
					{isAdded ? (
						<span class="material-icons" style={{ color: "green" }}>
							playlist_add_check
						</span>
					) : (
						<span class="material-icons">playlist_add</span>
					)}
				</button> */}
				<span className="subTitle">{date}</span>
			</span>

			{/* </ContentModal> */}
		</div>
	);
};

export default SingleContent;
