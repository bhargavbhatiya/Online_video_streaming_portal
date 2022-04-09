import React from "react";
// Import required AWS-SDK clients and commands for Node.js
import { CreateJobCommand } from "@aws-sdk/client-mediaconvert";
import { emcClient } from "./libs/emcClient.js";

const params2 = {
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
						Destination: "s3://video0test/outputs/",
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
				FileInput: "s3://video0test/Stories • Instagram.mp4",
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
		const data = await emcClient.send(new CreateJobCommand(params2));
	} catch (err) {
		console.log("Error", err);
	}
};

const Temp = () => {
	return (
		<div>
			<button onClick={() => run()}>Run</button>
		</div>
	);
};

export default Temp;
