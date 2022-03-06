import { Upload } from "@aws-sdk/lib-storage";
import React, { useState, useRef } from "react";
// import { S3Client, S3 } from "@aws-sdk/client-s3";
import S3 from "react-aws-s3";
import "./addVideo.css";
// import { uploadFile } from "react-s3";

const AddVideo1 = () => {
	const fileInput = useRef();
	const handleClick = (event) => {
		event.preventDefault();
		let file = fileInput.current.files[0];
		let newFileName = fileInput.current.files[0].name.replace(/\..+$/, "");
		const config = {
			bucketName: "video0test",
			region: "ap-south-1",
			accessKeyId: process.env.REACT_APP_aws_access_key_id,
			secretAccessKey: process.env.REACT_APP_aws_secret_access_key,
		};
		const ReactS3Client = new S3(config);
		console.log("21 " + toString(ReactS3Client[0]) + "x");
		ReactS3Client.uploadFile(file, newFileName).then((data) => {
			console.log("23 " + data);
			if (data.status === 204) {
				console.log("success");
			} else {
				console.log("fail");
			}
		});
	};
	return (
		<>
			<form className="upload-steps" onSubmit={handleClick}>
				<label>
					Upload file:
					<input type="file" ref={fileInput} />
				</label>
				<br />
				<button type="submit">Upload</button>
			</form>
		</>
	);
};

export default AddVideo1;
