import "./SingleContentForProfile.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const SingleContentForProfile = ({
	id,
	poster_path,
	title,
	date,
	flag,
	overview,
	tagline,
}) => {

	const auth = useSelector((state) => state.auth);



	const goTomovie = async () => {

		if (flag === 2) {
			await axios.post("/movie/removeWatchLater", {
				movie_id: id,
				email: auth.user.email,
			});
		}

		await axios.post("/movie/updateHistoryList", {
			movie_id: id,
			email: auth.user.email,
		});

	};
	return (
		<>
			<Link to={`/movie/${id}`}>
				<div className="single-content" onClick={goTomovie}>
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
