import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import S3 from "react-aws-s3";
import "./addVideo.css";
import { ToastContainer, toast } from "react-toastify";
import { CreateJobCommand } from "@aws-sdk/client-mediaconvert";
import { emcClient } from "./libs/emcClient.js";
import { ListJobsCommand } from "@aws-sdk/client-mediaconvert";
import AddMovieForm from "./addMovieForm";

const AddVideo1 = () => {
	const [movieList, setMovieList] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState();
	const [selectedMovieID, setSelectedMovieID] = useState();
	const [selectedFileName, setSelectedFileName] = useState("");
	// const [selectedMovie, setSelectedMovie] = useState();

	const notify = (msg) => {
		toast(msg);
	};

	const params = {
		JobTemplate:
			"arn:aws:mediaconvert:ap-south-1:312452403033:jobTemplates/asdfghjkl",
		Queue: "arn:aws:mediaconvert:ap-south-1:312452403033:queues/Default",
		UserMetadata: {},
		Role: "arn:aws:iam::312452403033:role/service-role/MediaConvert_Default_Role",
		Settings: {
			TimecodeConfig: {
				Source: "ZEROBASED",
			},
			OutputGroups: [
				{
					CustomName: "apple0test",
					Name: "Apple HLS",
					Outputs: [
						{
							ContainerSettings: {
								Container: "M3U8",
								M3u8Settings: {},
							},
							VideoDescription: {
								CodecSettings: {
									Codec: "H_264",
									H264Settings: {
										MaxBitrate: 500000,
										RateControlMode: "QVBR",
										QvbrSettings: {
											QvbrQualityLevel: 8,
										},
										SceneChangeDetect: "TRANSITION_DETECTION",
										QualityTuningLevel: "SINGLE_PASS_HQ",
									},
								},
							},
							AudioDescriptions: [
								{
									AudioSourceName: "Audio Selector 1",
									CodecSettings: {
										Codec: "AAC",
										AacSettings: {
											Bitrate: 96000,
											CodingMode: "CODING_MODE_2_0",
											SampleRate: 48000,
										},
									},
								},
							],
							OutputSettings: {
								HlsSettings: {},
							},
							NameModifier: "xyz",
						},
					],
					OutputGroupSettings: {
						Type: "HLS_GROUP_SETTINGS",
						HlsGroupSettings: {
							SegmentLength: 10,
							Destination: `s3://video0test/outputs/${selectedMovieID}/`,
							MinSegmentLength: 0,
						},
					},
				},
			],
			Inputs: [
				{
					AudioSelectors: {
						"Audio Selector 1": {
							DefaultSelection: "DEFAULT",
						},
					},
					VideoSelector: {},
					TimecodeSource: "ZEROBASED",
					FileInput: `s3://video0test/movies/${selectedMovieID}.mp4`,
				},
			],
		},
		AccelerationSettings: {
			Mode: "DISABLED",
		},
		StatusUpdateInterval: "SECONDS_60",
		Priority: 0,
		HopDestinations: [],
	};
	const run = async () => {
		try {
			// const data = await emcClient.send(new ListJobsCommand(params3));
			const data = await emcClient.send(new CreateJobCommand(params));
			// console.log("Success. Jobs: ", data);

			const res = await axios.post("/movie/setVideoUrl", {
				movie_id: selectedMovieID,
				videoUrl: `https://video0test.s3.ap-south-1.amazonaws.com/outputs/${selectedMovieID}/${selectedMovieID}.m3u8`,
			});
			// videoUrl: `https://video0test.s3.ap-south-1.amazonaws.com/outputs/49529/49529.m3u8`,
			// console.log("Success. ", res);
			notify("Video added successfully");
		} catch (err) {
			// console.log("Error", err);
		}
	};
	useEffect(() => {
		const getMovieList = async () => {
			const res = await axios.get("/movie/allMovieList");
			setMovieList(res.data.movies);
			// console.log(res.data.movies);
		};
		getMovieList();
	}, []);

	const fileInput = useRef();

	// useEffect(() => {
	// 	setSelectedFileName(fileInput.current.files[0].name);
	// }, [fileInput]);
	const handleClick = (event) => {
		event.preventDefault();
		if (
			selectedFileName &&
			selectedMovie &&
			selectedMovie.movie_id &&
			selectedMovie.label
		) {
			// electedMovieID (""+ selectedMovie.movie_id);
			// let file = fileInput.current.files[0];
			let file = selectedFileName;
			// let newFileName = fileInput.current.files[0].name.replace(/\..+$/, "");
			// file.name = toString(selectedMovie.movie_id);
			let newFileName = "" + selectedMovie.movie_id;
			setSelectedMovieID(newFileName);

			notify("Uploading...");
			notify(selectedMovie.movie_id);
			const config = {
				bucketName: "video0test",
				region: "ap-south-1",
				dirName: "movies",
				accessKeyId: process.env.REACT_APP_aws_access_key_id,
				secretAccessKey: process.env.REACT_APP_aws_secret_access_key,
			};
			const ReactS3Client = new S3(config);
			// console.log("21 " + toString(ReactS3Client[0]) + "x");
			ReactS3Client.uploadFile(file, newFileName).then((data) => {
				// console.log("23 " + data);
				if (data.status === 204) {
					notify("video uploaded successfully");
				} else {
					notify("video uploading failed");
				}
			});
		} else {
			notify("Please select appropriate movie ");
		}
	};

	const changeFile = (event) => {
		event.preventDefault();
		console.log(event.target.files[0]);
		console.log("Inside changeFile");
		setSelectedFileName(event.target.files[0]);
	};

	return (
		<>
			<ToastContainer />
			<div className="upload-video-section">
				<div className="display-6	 text-white">Upload Video Button</div>
				<div>
					<div className="enter-movie-name-TF">
						<Autocomplete
							disablePortal
							id="combo-box-demo"
							options={movieList}
							sx={{ width: 500 }}
							renderInput={(params) => <TextField {...params} label="Movie" />}
							value={selectedMovie}
							onChange={(event, newValue) => {
								setSelectedMovie(newValue);
							}}
						/>
					</div>
					<label>
						<div className="upload-file text-black">
							<input
								type="file"
								onChange={changeFile}
								style={{ display: "none" }}
							/>
							{!selectedFileName.name && "Click here to Select video file:"}
							{selectedFileName.name && <span>{selectedFileName.name}</span>}
						</div>
					</label>
					<br />
					<div className="buttons-2">
						<button className="button-64" type="submit" onClick={handleClick}>
							<span className="text">Upload</span>
						</button>

						<button onClick={() => run()} className="button-64">
							<span className="text">Run</span>
						</button>
					</div>
				</div>
				<br />
				<br />
				<AddMovieForm />
			</div>
		</>
	);
};

export default AddVideo1;
