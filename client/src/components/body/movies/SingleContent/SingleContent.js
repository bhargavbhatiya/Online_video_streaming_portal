import { Badge } from "@material-ui/core";
import { unavailable } from "../../../../config/config";
import "./SingleContent.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
const SingleContent = ({
	id,
	poster,
	title,
	vote_average,
}) => {
	const auth = useSelector((state) => state.auth);
	

	const gotoMovies = async () => {
		console.log("clicked " + id);
		await axios.post("/movie/updateHistoryList", {
			movie_id: id,
			email: auth.user.email,
		});
	};
	

	useEffect(() => {
	
	}, []);

	return (
		<div className="media">

			<Badge
				badgeContent={vote_average}
				color={vote_average > 6 ? "primary" : "secondary"}
			/>

			<img
				className="poster"
				src={poster ? `${poster}` : unavailable}
				alt={title}
			/>
			<Link
				className="middle"
				onClick={window.location.reload}
				to={`/movie/${id}`}
			>
				<div className="middle-bg"></div>
				<b className="title text-white" onClick={gotoMovies}>
					{title}
				</b>
			</Link>
		
		</div>
	);
};

export default SingleContent;
