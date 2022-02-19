import { Badge } from "@material-ui/core";
import { img_300, unavailable } from "../../../../config/config";
import "./SingleContent.css";
import ContentModal from "../ContentModal/ContentModal";
import { Link } from "react-router-dom";

const SingleContent = ({
	id,
	poster,
	title,
	date,
	media_type,
	vote_average,
}) => {
	function gotoMovies() {}

	return (
		<div className="media" onClick={gotoMovies}>
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
		<b className="title">{title}</b>
		</Link>
				<span className="subTitle">
					<p>Movie</p>
					<span className="subTitle">{date}</span>
				</span>
				{/* </ContentModal> */}
			</div>
	);
};

export default SingleContent;