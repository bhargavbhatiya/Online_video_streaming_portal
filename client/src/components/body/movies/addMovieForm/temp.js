import React from "react";
// Import required AWS-SDK clients and commands for Node.js
import { CreateJobCommand } from "@aws-sdk/client-mediaconvert";
import { emcClient } from "./libs/emcClient.js";
import { ListJobsCommand } from "@aws-sdk/client-mediaconvert";
// import { emcClient } from "./libs/emcClient.js";
// import { MediaConvertClient } from "@aws-sdk/client-mediaconvert";
// Set the AWS Region.

// const REGION = "ap-south-1";
// // Set the account end point.
// const ENDPOINT = {
// 	endpoint: "https://xnbzilj6c.mediaconvert.ap-south-1.amazonaws.com",
// };

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
const params = {
	Queue: "arn:aws:mediaconvert:ap-south-1:312452403033:queues/Default", //JOB_QUEUE_ARN
	UserMetadata: {
		Customer: "Amazon",
	},
	Role: "arn:aws:iam::312452403033:role/service-role/MediaConvert_Default_Role", //IAM_ROLE_ARN
	Settings: {
		OutputGroups: [
			{
				Name: "File Group",
				OutputGroupSettings: {
					Type: "FILE_GROUP_SETTINGS",
					FileGroupSettings: {
						Destination: "s3://video0test/", //OUTPUT_BUCKET_NAME, e.g., "s3://BUCKET_NAME/"
					},
				},
				Outputs: [
					{
						VideoDescription: {
							ScalingBehavior: "DEFAULT",
							TimecodeInsertion: "DISABLED",
							AntiAlias: "ENABLED",
							Sharpness: 50,
							CodecSettings: {
								Codec: "H_264",
								H264Settings: {
									InterlaceMode: "PROGRESSIVE",
									NumberReferenceFrames: 3,
									Syntax: "DEFAULT",
									Softness: 0,
									GopClosedCadence: 1,
									GopSize: 90,
									Slices: 1,
									GopBReference: "DISABLED",
									SlowPal: "DISABLED",
									SpatialAdaptiveQuantization: "ENABLED",
									TemporalAdaptiveQuantization: "ENABLED",
									FlickerAdaptiveQuantization: "DISABLED",
									EntropyEncoding: "CABAC",
									Bitrate: 5000000,
									FramerateControl: "SPECIFIED",
									RateControlMode: "CBR",
									CodecProfile: "MAIN",
									Telecine: "NONE",
									MinIInterval: 0,
									AdaptiveQuantization: "HIGH",
									CodecLevel: "AUTO",
									FieldEncoding: "PAFF",
									SceneChangeDetect: "ENABLED",
									QualityTuningLevel: "SINGLE_PASS",
									FramerateConversionAlgorithm: "DUPLICATE_DROP",
									UnregisteredSeiTimecode: "DISABLED",
									GopSizeUnits: "FRAMES",
									ParControl: "SPECIFIED",
									NumberBFramesBetweenReferenceFrames: 2,
									RepeatPps: "DISABLED",
									FramerateNumerator: 30,
									FramerateDenominator: 1,
									ParNumerator: 1,
									ParDenominator: 1,
								},
							},
							AfdSignaling: "NONE",
							DropFrameTimecode: "ENABLED",
							RespondToAfd: "NONE",
							ColorMetadata: "INSERT",
						},
						AudioDescriptions: [
							{
								AudioTypeControl: "FOLLOW_INPUT",
								CodecSettings: {
									Codec: "AAC",
									AacSettings: {
										AudioDescriptionBroadcasterMix: "NORMAL",
										RateControlMode: "CBR",
										CodecProfile: "LC",
										CodingMode: "CODING_MODE_2_0",
										RawFormat: "NONE",
										SampleRate: 48000,
										Specification: "MPEG4",
										Bitrate: 64000,
									},
								},
								LanguageCodeControl: "FOLLOW_INPUT",
								AudioSourceName: "Audio Selector 1",
							},
						],
						ContainerSettings: {
							Container: "MP4",
							Mp4Settings: {
								CslgAtom: "INCLUDE",
								FreeSpaceBox: "EXCLUDE",
								MoovPlacement: "PROGRESSIVE_DOWNLOAD",
							},
						},
						NameModifier: "_1",
					},
				],
			},
		],
		AdAvailOffset: 0,
		Inputs: [
			{
				AudioSelectors: {
					"Audio Selector 1": {
						Offset: 0,
						DefaultSelection: "NOT_DEFAULT",
						ProgramSelection: 1,
						SelectorType: "TRACK",
						Tracks: [1],
					},
				},
				VideoSelector: {
					ColorSpace: "FOLLOW",
				},
				FilterEnable: "AUTO",
				PsiControl: "USE_PSI",
				FilterStrength: 0,
				DeblockFilter: "DISABLED",
				DenoiseFilter: "DISABLED",
				TimecodeSource: "EMBEDDED",
				FileInput:
					"s3://video0test/182931280_311234930580158_670988850971011132_n.mp4", //INPUT_BUCKET_AND_FILENAME, e.g., "s3://BUCKET_NAME/FILE_NAME"
			},
		],
		TimecodeConfig: {
			Source: "EMBEDDED",
		},
	},
};

// Set the parameters
const params3 = {
	MaxResults: 10,
	Order: "ASCENDING",
	Queue: "arn:aws:mediaconvert:ap-south-1:312452403033:queues/Default",
	Status: "SUBMITTED", // e.g., "SUBMITTED"
};
const run = async () => {
	try {
		// const data = await emcClient.send(new ListJobsCommand(params3));
		const data = await emcClient.send(new CreateJobCommand(params2));
		// console.log("Success. Jobs: ", data);
	} catch (err) {
		// console.log("Error", err);
	}
};
// run();

// // Set the MediaConvert Service Object
// const emcClient = new MediaConvertClient(ENDPOINT);
// export { emcClient };
const Temp = () => {
	return (
		<div>
			<button onClick={() => run()}>Run</button>
		</div>
	);
};

export default Temp;
