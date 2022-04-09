/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
ABOUT THIS NODE.JS EXAMPLE: This example works with the AWS SDK for JavaScript version 3 (v3),
which is available at https://github.com/aws/aws-sdk-js-v3. This example is in the 'AWS SDK for JavaScript v3 Developer Guide' at
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/ec2-examples.html.

Purpose:
emcClient.js is a helper function that creates an Amazon Elastic Compute Cloud (Amazon EC2) service client.

Inputs (replace in code):
- REGION
- ENDPOINT
 */
/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
ABOUT THIS NODE.JS EXAMPLE: This example works with the AWS SDK for JavaScript version 3 (v3),
which is available at https://github.com/aws/aws-sdk-js-v3. This example is in the 'AWS SDK for JavaScript v3 Developer Guide' at
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/ec2-examples.html.

Purpose:
emcClient.js is a helper function that creates an Amazon Elemental MediaConvert (EMC) service client.

Inputs (replace in code):
- REGION
- ENDPOINT
*/
// snippet-start:[emc.JavaScript.createclientv3]
import { MediaConvertClient } from "@aws-sdk/client-mediaconvert";
// Set the AWS Region.
const REGION = "ap-south-1";
// Set the account end point.
const ENDPOINT = {
	endpoint: "https://xnbzilj6c.mediaconvert.ap-south-1.amazonaws.com",
};
// Set the MediaConvert Service Object
const emcClient = new MediaConvertClient({
	region: REGION,
	endpoint: "https://xnbzilj6c.mediaconvert.ap-south-1.amazonaws.com/",
	credentials: {
		accessKeyId: process.env.REACT_APP_aws_access_key_id,
		secretAccessKey: process.env.REACT_APP_aws_secret_access_key,
	},
});
export { emcClient };
