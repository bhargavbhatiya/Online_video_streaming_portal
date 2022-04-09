import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import S3 from "react-aws-s3";
import "./addVideo.css";
import { ToastContainer, toast } from "react-toastify";
import { CreateJobCommand } from "@aws-sdk/client-mediaconvert";
import { emcClient } from "./libs/emcClient.js";
import AddMovieForm from "./addMovieForm";

const AddVideo1 = () => {
	const [movieList, setMovieList] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState();
	const [selectedMovieID, setSelectedMovieID] = useState();
	const [selectedFileName, setSelectedFileName] = useState("");

	const notify = (msg) => {
		toast(msg);
	};
	const newParam = {
		Name: "FinalStreaming",
		Queue: "arn:aws:mediaconvert:ap-south-1:312452403033:queues/Default",
		UserMetadata: {},
		Role: "arn:aws:iam::312452403033:role/service-role/MediaConvert_Default_Role",
		Settings: {
			TimecodeConfig: {
				Source: "ZEROBASED",
			},
			OutputGroups: [
				{
					Name: "Apple HLS",
					Outputs: [
						{
							ContainerSettings: {
								Container: "M3U8",
								M3u8Settings: {},
							},
							VideoDescription: {
								Width: 1920,
								Height: 1080,
								CodecSettings: {
									Codec: "H_264",
									H264Settings: {
										MaxBitrate: 8500000,
										RateControlMode: "QVBR",
										QvbrSettings: {
											QvbrQualityLevel: 10,
										},
										SceneChangeDetect: "TRANSITION_DETECTION",
										QualityTuningLevel: "SINGLE_PASS_HQ",
									},
								},
							},
							AudioDescriptions: [
								{
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
							NameModifier: "1920x1080",
						},
						{
							ContainerSettings: {
								Container: "M3U8",
								M3u8Settings: {},
							},
							VideoDescription: {
								Width: 1280,
								Height: 720,
								CodecSettings: {
									Codec: "H_264",
									H264Settings: {
										MaxBitrate: 5000000,
										RateControlMode: "QVBR",
										QvbrSettings: {
											QvbrQualityLevel: 10,
										},
										SceneChangeDetect: "TRANSITION_DETECTION",
										QualityTuningLevel: "SINGLE_PASS_HQ",
									},
								},
							},
							AudioDescriptions: [
								{
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
							NameModifier: "1280x720",
						},
						{
							ContainerSettings: {
								Container: "M3U8",
								M3u8Settings: {},
							},
							VideoDescription: {
								Width: 960,
								Height: 540,
								CodecSettings: {
									Codec: "H_264",
									H264Settings: {
										MaxBitrate: 4000000,
										RateControlMode: "QVBR",
										QvbrSettings: {
											QvbrQualityLevel: 10,
										},
										SceneChangeDetect: "TRANSITION_DETECTION",
										QualityTuningLevel: "SINGLE_PASS_HQ",
									},
								},
							},
							AudioDescriptions: [
								{
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
							NameModifier: "960x540",
						},
						{
							ContainerSettings: {
								Container: "M3U8",
								M3u8Settings: {},
							},
							VideoDescription: {
								Width: 1600,
								Height: 540,
								CodecSettings: {
									Codec: "H_264",
									H264Settings: {
										MaxBitrate: 9000000,
										RateControlMode: "QVBR",
										QvbrSettings: {
											QvbrQualityLevel: 10,
										},
										SceneChangeDetect: "TRANSITION_DETECTION",
										QualityTuningLevel: "SINGLE_PASS_HQ",
									},
								},
							},
							AudioDescriptions: [
								{
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
							NameModifier: "1600x540",
						},
						{
							ContainerSettings: {
								Container: "M3U8",
								M3u8Settings: {},
							},
							VideoDescription: {
								Width: 640,
								Height: 360,
								CodecSettings: {
									Codec: "H_264",
									H264Settings: {
										MaxBitrate: 6000000,
										RateControlMode: "QVBR",
										QvbrSettings: {
											QvbrQualityLevel: 10,
										},
										SceneChangeDetect: "TRANSITION_DETECTION",
										QualityTuningLevel: "SINGLE_PASS_HQ",
									},
								},
							},
							AudioDescriptions: [
								{
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
							NameModifier: "640x360",
						},
						{
							ContainerSettings: {
								Container: "M3U8",
								M3u8Settings: {},
							},
							VideoDescription: {
								Width: 480,
								Height: 270,
								CodecSettings: {
									Codec: "H_264",
									H264Settings: {
										MaxBitrate: 5000000,
										RateControlMode: "QVBR",
										QvbrSettings: {
											QvbrQualityLevel: 10,
										},
										SceneChangeDetect: "TRANSITION_DETECTION",
										QualityTuningLevel: "SINGLE_PASS_HQ",
									},
								},
							},
							AudioDescriptions: [
								{
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
							NameModifier: "480x270",
						},
						{
							ContainerSettings: {
								Container: "M3U8",
								M3u8Settings: {},
							},
							VideoDescription: {
								Width: 640,
								Height: 480,
								CodecSettings: {
									Codec: "H_264",
									H264Settings: {
										MaxBitrate: 1000000,
										RateControlMode: "QVBR",
										QvbrSettings: {
											QvbrQualityLevel: 10,
										},
										SceneChangeDetect: "TRANSITION_DETECTION",
									},
								},
							},
							AudioDescriptions: [
								{
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
							NameModifier: "640x480",
						},
					],
					OutputGroupSettings: {
						Type: "HLS_GROUP_SETTINGS",
						HlsGroupSettings: {
							SegmentLength: 4,
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
			const data = await emcClient.send(new CreateJobCommand(newParam));

			const res = await axios.post("/movie/setVideoUrl", {
				movie_id: selectedMovieID,
				videoUrl: `https://video0test.s3.ap-south-1.amazonaws.com/outputs/${selectedMovieID}/${selectedMovieID}.m3u8`,
			});
			notify("Video added successfully");
		} catch (err) {
			console.log("Error", err);
		}
	};
	useEffect(() => {
		const getMovieList = async () => {
			const res = await axios.get("/movie/allMovieList");
			setMovieList(res.data.movies);
		};
		getMovieList();
	}, []);

	const fileInput = useRef();


	const handleClick = (event) => {
		event.preventDefault();
		if (
			selectedFileName &&
			selectedMovie &&
			selectedMovie.movie_id &&
			selectedMovie.label
		) {

			let file = selectedFileName;

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
			ReactS3Client.uploadFile(file, newFileName).then((data) => {
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
