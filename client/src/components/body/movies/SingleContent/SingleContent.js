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
		<Link to={`/movie/${id}`}>
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
				<b className="title">{title}</b>
				<span className="subTitle">
					{media_type === "tv" ? "TV Series" : "Movie"}
					<span className="subTitle">{date}</span>
				</span>
				{/* </ContentModal> */}
			</div>
		</Link>
	);
};

export default SingleContent;