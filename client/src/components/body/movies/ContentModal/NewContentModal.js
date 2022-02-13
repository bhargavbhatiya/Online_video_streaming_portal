import React, { useEffect, useState } from "react";
import "./NewContentModal.css";
import ReactJWPlayer from "react-jw-player";
import axios from "axios";
import { useParams } from "react-router-dom";

const NewContentModal = () => {
	const { id } = useParams();
	const [content, setContent] = useState([]);

	const getVideo = async () => {
		try {
			const res = await axios.get(`/movie/get_movie/${id}`);
			console.log(res.data.movie[0]);
			setContent(res.data.movie[0]);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		getVideo();
	},[]);

	return (
		<div className="main-class">
			<div className="jw-player">
				<ReactJWPlayer
					playerId="futureskill"
					playerScript="https://content.jwplatform.com/libraries/tqjyvT9W.js"
					// file="https://content.jwplatform.com/manifests/vM7nH0Kl.m3u8"
					file={content.videoUrl}
					onReady={() => console.log("onReady")}
					onTime={(e) => console.log(e)}
					// onSeventyFivePercent={() => console.log("75 Percent")}
					// onNinetyFivePercent={() => console.log("95 Percent")}
					// onOneHundredPercent={() => console.log("100 Percent")}
					// isAutoPlay={true}

					// aspectRatio="16:9"
					// customProps={{
					// 	playbackRateControls: [1, 1.25, 1.5],
					// 	cast: {},
					// }}
				/>
			</div>
		</div>
	);
};

export default NewContentModal;