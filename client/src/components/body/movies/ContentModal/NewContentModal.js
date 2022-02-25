import React, { useEffect, useState } from "react";
import "./NewContentModal.css";
import ReactJWPlayer from "react-jw-player";
import axios from "axios";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
//import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Carousel from "../Carousel/Carousel";
import { useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer, toast } from "react-toastify";


import {
	img_500,
	unavailable,
	unavailableLandscape,
} from "../../../../config/config.js";
const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		width: "100%",
		height: "100%",
		backgroundColor: "#0D1321",
		border: "1px solid #282c34",
		
		color: "white",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(0, 1, 3),
	},
}));


const NewContentModal = () => {
	
	const { id } = useParams();
	const auth = useSelector(state => state.auth);
	const [isWatchList, setIsWatchList] = useState(false);
	const [isLiked, setIsLiked] = useState(false);

	const notify = (msg) => {
		   
		toast(msg);
		  
		  }
	
	const checkWatchLater = async () => {

		console.log("check watch later");
		const movie_id=id;
		const email=auth.user.email;
		try{
			console.log(email);
		const res = await axios.post("/movie/checkWatchLater",{
			movie_id,email
		});

	      if(res.data.msg)
		  {
               setIsWatchList(true);
		  }
		 
            
	       console.log(res);   			
	}
	catch(err){
		console.log(err);
	}
		
	
	};

	const addToWatchLater = async () => {
		console.log("add to watch later");
		const movie_id=id;
		const email=auth.user.email;
		try{
		const res = await axios.post("/movie/addToWatchLater",{
			movie_id,email
		});

	
           notify(res.data.msg);
	       console.log(res);   	
		   checkWatchLater();		
	}
	catch(err){
		console.log(err);
	}
		
	};

	const checkLiked = async () => {

		console.log("check liked");
		const movie_id=id;
		const email=auth.user.email;
		try{
		const res = await axios.post("/movie/checkLiked",{
			movie_id,email
		});

	      if(res.data.msg)
		  {
               setIsLiked(true);
		  }
		  else
		  setIsLiked(false);
            
	       console.log(res);   			
	}
	catch(err){
		console.log(err);
	}
		
	
	};

	const addToLikedList = async () => {
		console.log("add to liked list");
		const movie_id=id;
		const email=auth.user.email;
		try{
		const res = await axios.post("/movie/addToLikeList",{
			movie_id,email
		});

	
           notify(res.data.msg);
	       console.log(res);   	
		   checkLiked();		
	}
	catch(err){
		console.log(err);
	}
		
	};



	const [contentForPlayer, setContentForPlayer] = useState([]);

	const getVideo = async () => {
		try {
			const res = await axios.get(`/movie/get_movie/${id}`);
			console.log(res.data.movie[0]);
			setContentForPlayer(res.data.movie[0]);
		} catch (err) {
			console.log(err);
		}
	};
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [content, setContent] = useState();
	const [video, setVideo] = useState();

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const fetchData = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		);

		setContent(data);
		// console.log(data);
	};

	const fetchVideo = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		);

		setVideo(data.results[0]?.key);
	};
	useEffect(() => {
		getVideo();
		fetchVideo();
		fetchData();
		checkWatchLater();
		checkLiked();

	}, []);

	return (

		<>
		
		<ToastContainer/>
			{content && (
				<div className="main-class">
					<div className={classes.paper}>
						<div ClassName="ContentModal__about">


							<span className="ContentModal__title">
								{content.name || content.title} (
								{(
									content.first_air_date ||
									content.release_date ||
									"-----"
								).substring(0, 4)}
								)
							</span>
							{content.tagline && (
								<i className="tagline">{content.tagline}</i>
							)}



						</div>

						<div className="Content_Row">

							<div className="left-part">
								<img
									src={
										content.poster_path
											? `${img_500}/${content.poster_path}`
											: unavailable
									}
									alt={content.name || content.title}
									className="ContentModal__portrait"
								/>

								<div className="left-btn-row">

								<div className="youtube-btn" onClick={addToWatchLater}>
								{console.log("is watchlater"+isWatchList)}
									isWatchList {isWatchList}

								{ isWatchList ? (
								<Button
									className="youtube-btn"
									variant="contained"
									startIcon={<YouTubeIcon />}
									color="primary"
									
								>
									watch later
								</Button>):(
								<Button
										className="youtube-btn"
										variant="contained"
										startIcon={<YouTubeIcon />}
										color="#FFEDDF"
										
									>
										watch later
									</Button>)}

							  </div>
									
									<div className="youtube-btn" onClick={addToLikedList}>
									{console.log("is liked"+isLiked)}
									isliked {isLiked}
									{ isLiked ?(
									<Button
											className="youtube-btn"
											variant="contained"
											startIcon={<YouTubeIcon />}
											color="primary"
											
										>
											Like
										</Button>)
										:(
										<Button
										className="youtube-btn"
										variant="contained"
										startIcon={<YouTubeIcon />}
										color="#FFEDDF"
										
									>
										Like
									</Button>)}

									</div>
								</div>

							</div>

							<div className="jw-player">
								<ReactJWPlayer
									playerId="futureskill"
									playerScript="https://content.jwplatform.com/libraries/tqjyvT9W.js"
									// file="https://content.jwplatform.com/manifests/vM7nH0Kl.m3u8"
									file={contentForPlayer.videoUrl}
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
						<span className="ContentModal__description">
							{content.overview}
						</span>


						<div className="youtube-btn1">
							<Button
								className="youtube-btn"
								variant="contained"
								startIcon={<YouTubeIcon />}
								color="secondary"
								target="__blank"
								href={`https://www.youtube.com/watch?v=${video}`}
							>
								Watch the Trailer
							</Button>
						</div>

						<div ClassName="carousel">
							<Carousel id={id} />
						</div>




					</div>


					
				</div>


			)}

		</>
	);
};

export default NewContentModal;