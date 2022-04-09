import React, { useEffect, useState } from "react";
import "./NewContentModal.css";
import ReactJWPlayer from "react-jw-player";
import axios from "axios";
import { useParams } from "react-router-dom";

import Carousel from "../Carousel/Carousel";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import { img_500, unavailable } from "../../../../config/config.js";

import ShareMovie from "./ShareMovie";

const NewContentModal = () => {
	const { id } = useParams();
	const auth = useSelector((state) => state.auth);
	const [isWatchList, setIsWatchList] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [comment, setComment] = useState("");
	const email = auth.user.email;
	const username = auth.user.name;
	const { isAdmin } = auth;
	const [commentList, setCommentList] = useState([]);
	const url = window.location.href;

	const notify = (msg) => {
		toast(msg);
	};

	const checkWatchLater = async () => {
		const movie_id = id;
		try {
			const res = await axios.post("/movie/checkWatchLater", {
				movie_id,
				email,
			});

			if (res.data.msg) {
				setIsWatchList(true);
			}

		} catch (err) {
			console.log(err);
		}
	};

	const addToWatchLater = async () => {
		const movie_id = id;

		try {
			const res = await axios.post("/movie/addToWatchLater", {
				movie_id,
				email,
			});

			notify(res.data.msg);
			setIsWatchList(true);
		} catch (err) {
			console.log(err);
		}
	};

	const checkLiked = async () => {
		const movie_id = id;

		try {
			const res = await axios.post("/movie/checkLiked", {
				movie_id,
				email,
			});

			if (res.data.msg) {
				setIsLiked(true);
			} else setIsLiked(false);

			console.log(res);
		} catch (err) {
			console.log(err);
		}
	};

	const addToLikedList = async () => {
		const movie_id = id;

		try {
			const res = await axios.post("/movie/addToLikeList", {
				movie_id,
				email,
			});

			notify(res.data.msg);
			if (res.data.msg === "movie is disliked") {
				setIsLiked(false);
			} else setIsLiked(true);
		} catch (err) {
			console.log(err);
		}
	};

	const addComment = async () => {
		setComment("");
		const movie_id = id;

		const date = new Date();

		try {
			const res = await axios.post("/movie/addComment", {
				movie_id,
				email,
				comment,
				username,
				date,
			});
			notify(res.data.msg);
			setCommentList((data) => [...data, res.data.commentObj]);
		} catch (err) {
			console.log("Error" + err);
		}
	};

	const getComments = async () => {
		try {
			const res = await axios.post(`/movie/getComments`, { movie_id: id });
			setCommentList(res.data.commentList);
		} catch (err) {
			console.log(err);
		}
	};

	const deleteComment = async (comment_id) => {
		try {
			const res = await axios.post("/movie/deleteComment", {
				movie_id: id,
				comment_id,
			});
			notify(res.data.msg);
			setCommentList((data) => data.filter((item) => item._id !== comment_id));
		} catch (err) {
			console.log(err);
		}
	};

	const [content, setContent] = useState();
	const [video, setVideo] = useState();
	const [genresList, setGenresList] = useState();
	const fetchData = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		);
		try {
			const res = await axios.get(`/movie/get_movie/${id}`);
			let obj = res.data.movie[0];
			var poster_path = await axios.get(
				`https://api.themoviedb.org/3/movie/${res.data.movie[0].movie_id}?api_key=${process.env.REACT_APP_API_KEY}`
			);
			poster_path = `https://image.tmdb.org/t/p/w500${poster_path.data.poster_path}`;
			obj = { ...obj, poster_path };
			setContent(obj);
			setGenresList(eval(res.data.movie[0].genres));
		} catch (err) {
			console.log(err);
		}
	};

	const fetchVideo = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		);

		setVideo(data.results[0]?.key);
	};

	const toIST = (date) => {
		date = new Date(date);
		const utc = date.getTime() + date.getTimezoneOffset() * 60000;
		const newDate = new Date(utc + 3600000 * +5.5);
		var dd = date.getDate();
		var mm = date.getMonth() + 1;
		var yyyy = date.getFullYear();
		// return typeof date;
		return `${dd}-${mm}-${yyyy} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
	};
	const [recommendIDs, setRecommendIDs] = useState([]);
	const [recommendList, setRecommendList] = useState([]);
	const recommendMovies = async () => {
		try {
			const res = await axios.get(
				`${process.env.REACT_APP_AZURE_RECOMMENDATIONS_API_URL}/${content.title}`
			);
			console.log(res.data);
			setRecommendIDs(res.data);
			console.log(recommendIDs);

		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		fetchVideo();
		fetchData();
		getComments();
		checkWatchLater();
		checkLiked();
	}, [auth]);

	useEffect(() => {
		recommendMovies();
	}, [content]);

	useEffect(() => {
		if (recommendIDs.length > 0) {
			recommendIDs.map(async (movie) => {
				const res1 = await axios.get(`/movie/get_movie/${movie.id}`);

				let obj = res1.data.movie[0];
				var poster_path = await axios.get(
					`https://api.themoviedb.org/3/movie/${res1.data.movie[0].movie_id}?api_key=${process.env.REACT_APP_API_KEY}`
				);
				poster_path = `https://image.tmdb.org/t/p/w300${poster_path.data.poster_path}`;
				obj = { ...obj, poster_path };
				setRecommendList((data) => [...data, obj]);
			});
		}
	}, [recommendIDs]);

	function commentButton() {
		return (
			<>
				<span
					className="comment-btn"
					data-bs-toggle="modal"
					data-bs-target="#staticBackdrop"
				>
					<i className="fa fa-comment" /> Comment
				</span>

				<div
					className="modal fade"
					id="staticBackdrop"
					data-bs-backdrop="static"
					data-bs-keyboard="false"
					tabindex="-1"
					aria-labelledby="staticBackdropLabel"
					aria-hidden="true"
				>
					<div className="modal-dialog modal-dialog-scrollable modal-lg">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="staticBackdropLabel">
									Add A Comment
								</h5>
								<button
									type="button"
									className="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"
								></button>
							</div>
							<div className="modal-body">
								<div className="d-flex justify-content-center row flex-column m-1">
									<div className="d-flex flex-row align-items-center text-left comment-top p-2 border border-2 px-2">
										<div className="profile-image me-2">
											<img
												className="rounded-circle"
												src={
													content.poster_path
														? `${img_500}/${content.poster_path}`
														: unavailable
												}
												alt={content.name || content.title}
												width={70}
												height={70}
											/>
										</div>

										<div className="d-flex flex-column mt-1 border-left">
											<div className="d-flex flex-row post-title">
												<h5>{content.title}</h5>
											</div>
										</div>
									</div>
									<div className="coment-bottom bg-white p-2 px-3 border mt-1">
										<div className="d-flex flex-row add-comment-section mt-2 mb-4">
											<img
												className="img-fluid img-responsive rounded-circle m-1"
												src={auth.user.avatar}
												width={38}
											/>
											<input
												type="text"
												className="form-control m-1"
												placeholder="Add comment"
												value={comment}
												onChange={(e) => {
													setComment(e.target.value);
												}}
											/>
											<button
												className="btn btn-primary m-1"
												type="button"
												onClick={addComment}
											>
												Comment
											</button>
										</div>
										<div className="commented-section mt-2">
											{commentList &&
												commentList
													.slice(0)
													.reverse()
													.map((comm) => {
														return (
															<blockquote className="blockquote border my-2">
																<div className="d-flex flex-row align-items-center commented-user">
																	<h6 className="mr-2">
																		{comm.username}&nbsp;-&nbsp;
																	</h6>

																	<small className="mb-1 ml-2 .text-blue display-font-sizes-2">
																		{toIST(comm.createdAt)}
																	</small>
																	{isAdmin && (
																		<button
																			className="deleteButton"
																			onClick={() => deleteComment(comm._id)}
																		>
																			<i
																				className="fas fa-trash-alt"
																				title="Remove"
																			></i>
																		</button>
																	)}
																</div>
																<div className="small">
																	<div>{comm.comment}</div>
																</div>
															</blockquote>
														);
													})}
										</div>
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary"
									data-bs-dismiss="modal"
								>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
	return (
		<>
			<ToastContainer />
			{content && (
				<div className="main-class">


					<div ClassName="ContentModal__about">
						<span className="display-1 ContentModal__title">
							{content.name || content.title} (
							{(
								content.first_air_date ||
								content.release_date ||
								"-----"
							).substring(0, 4)}
							)
						</span>
						{content.tagline && <i className="tagline1">{content.tagline}</i>}
					</div>
					<div className="jw-player">
						<ReactJWPlayer
							playerId="futureskill"
							playerScript="https://content.jwplatform.com/libraries/tqjyvT9W.js"
							file={content.videoUrl}
							onReady={() => console.log("onReady")}
							onTime={(e) => console.log(e)}

						/>
					</div>

					<span className=" text-light ">
						<div className="Content_Row mx-3">
							<div className="left-part">
								<img
									className="ContentModal__portrait"
									src={
										content.poster_path
											? `${img_500}/${content.poster_path}`
											: unavailable
									}
									alt={content.name || content.title}
								/>
							</div>
							<div className="right-part ps-5">
								<span className="display-5 	">
									{content.name || content.title} (
									{(
										content.first_air_date ||
										content.release_date ||
										"-----"
									).substring(0, 4)}
									)
								</span>
								{content.tagline && (
									<i className="tagline">{"~ " + content.tagline}</i>
								)}
								<div className="runtime-rating mb-2">
									{content.runtime && (
										<>
											<span className="text-light">
												<i className="fa fa-clock-o" />{" "}
												{" " + Math.trunc(content.runtime / 60)} hr{" "}
												{content.runtime % 60} min{"      "}
											</span>
										</>
									)}
									<span>
										<i className="fa fa-star ms-3" /> {content.vote_average}/10
									</span>
								</div>
								{content.overview}
								{genresList && (
									<span className="genres mt-4">
										<span className="genres-title fw-bold">Genres:</span>
										<span className="genres-list">
											{genresList.map((genre) => (
												<span className="genre" key={genre.id}>
													{genre.name}
												</span>
											))}
										</span>
									</span>
								)}
								{content.release_date && (
									<span className="release-date">
										<span className="release-title fw-bold">
											Realease-date:{" "}
										</span>
										<span className="release-content">
											{content.release_date}
										</span>
									</span>
								)}
								{content.original_language && (
									<span className="language">
										<span className="language-title fw-bold">Language: </span>
										<span className="language-content">
											{content.original_language}
										</span>
									</span>
								)}
								<div className="buttons-row ">
									<a
										href={`https://www.youtube.com/watch?v=${video}`}
										target="_blank"
									>
										<span className="yt-trailer-btn">
											<i className="fa fa-play" /> Play Youtube Trailer
										</span>
									</a>
									<div className="right-buttons-row">
										<span className="like-btn" onClick={addToLikedList}>
											{!isLiked ? (
												<i className="fa fa-heart" />
											) : (
												<i className="fa fa-heart already-liked" />
											)}
											Like
										</span>
										{commentButton()}
										<span className="add-to-list-btn" onClick={addToWatchLater}>
											{!isWatchList ? (
												<i className="fa fa-plus" />
											) : (
												<i className="fa fa-check already-inWatchList" />
											)}{" "}
											Add to list
										</span>

										<ShareMovie url={url} notify={notify} />
									</div>
								</div>
							</div>
						</div>
					</span>
				</div>
			)}
			<h3 className="text-light mt-5 ms-5">Cast & Crew</h3>
			<div ClassName="carousel">
				<Carousel id={id} recommendList={[]} notify={notify} flag={1} />
			</div>

			{recommendList && (
				<>
					<h3 className="text-light mt-5 ms-5">Recommendations</h3>
					<div ClassName="carousel">
						<Carousel id={2} recommendList={recommendList} flag={0} />
					</div>
				</>
			)}
		</>
	);
};

export default NewContentModal;
