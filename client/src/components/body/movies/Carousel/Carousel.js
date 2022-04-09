import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../../../../config/config";
import SingleContent from "../SingleContent/SingleContent";
import "./Carousel.css";

const handleDragStart = (e) => e.preventDefault();

const Gallery = ({ id, recommendList, notify, flag }) => {
	const [credits, setCredits] = useState([]);

	const items = credits.map((c) => (
		<div className="carouselItem">
			<img
				src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
				alt={c?.name}
				onDragStart={handleDragStart}
				className="carouselItem__img"
			/>
			<b className="carouselItem__txt text-muted">{c?.name}</b>
		</div>
	));

	const singleItem = recommendList.map((c) => (
		<div className="carouselItem">
			<SingleContent
				key={c.movie_id}
				id={c.movie_id}
				poster={c.poster_path}
				title={c.title}
				date={c.release_date}
				media_type="movie"
				vote_average={c.vote_average}
				notify={notify}
			/>
		</div>
	));
	const responsive = {
		0: {
			items: 3,
		},
		512: {
			items: 5,
		},
		1024: {
			items: 7,
		},
	};

	const fetchCredits = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		);
		setCredits(data.cast);
	};

	useEffect(() => {
		fetchCredits();
	}, []);

	return (
		<div className="carousel">
			<AliceCarousel
				autoPlayInterval={1200}
				mouseTracking
				autoPlay
				infinite
				disableDotsControlscd
				disableButtonsControls
				disableDotsControls
				responsive={responsive}
				items={flag == 1 ? items : singleItem}
			/>
		</div>
	);
};

export default Gallery;
