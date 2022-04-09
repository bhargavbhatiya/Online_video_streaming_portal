import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
	EmailShareButton,
	FacebookShareButton,
	LinkedinShareButton,
	TelegramShareButton,
	TwitterShareButton,
	WhatsappShareButton,
} from "react-share";

import {
	EmailIcon,
	FacebookIcon,
	LinkedinIcon,
	TelegramIcon,
	TwitterIcon,
	WhatsappIcon,
} from "react-share";

import "./ShareMovie.css";
const ShareMovie = ({ notify, url }) => {
	return (
		<>
			<div className="share-component">
				<span
					className="share-btn"
					data-bs-toggle="modal"
					data-bs-target="#exampleModal"
				>
					<i className="fa fa-share-alt" /> Share
				</span>

				<div
					className="modal fade"
					id="exampleModal"
					tabIndex={-1}
					aria-labelledby="exampleModalLabel"
					aria-hidden="true"
				>
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLabel">
									Share Movie
								</h5>
								<button
									type="button"
									className="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"
								/>
							</div>
							<div className="modal-body">
								<div className="share-btn-container">
									<WhatsappShareButton
										url={url}
										quote={"Watch this movie"}
										hashtag={"#Movie"}
									>
										<WhatsappIcon size={40} round={true} />
									</WhatsappShareButton>
									<FacebookShareButton
										url={url}
										quote={"Watch this movie"}
										hashtag={"#Movie"}
									>
										<FacebookIcon size={40} round={true} />
									</FacebookShareButton>
									<TwitterShareButton
										url={url}
										quote={"Watch this movie"}
										hashtag={"#Movie"}
									>
										<TwitterIcon size={40} round={true} />
									</TwitterShareButton>
									<LinkedinShareButton
										url={url}
										quote={"Watch this movie"}
										hashtag={"#Movie"}
									>
										<LinkedinIcon size={40} round={true} />
									</LinkedinShareButton>
									<TelegramShareButton
										url={url}
										quote={"Watch this movie"}
										hashtag={"#Movie"}
									>
										<TelegramIcon size={40} round={true} />
									</TelegramShareButton>

									<EmailShareButton
										url={url}
										quote={"Watch this movie"}
										hashtag={"#Movie"}
									>
										<EmailIcon size={40} round={true} />
									</EmailShareButton>
								</div>
								<div className="copy-link">
									{url}
									<CopyToClipboard text={url}>
										<button
											className="btn btn-outline-success btn-sm m-3"
											onClick={() => notify("link copied")}
										>
											Copy Link
										</button>
									</CopyToClipboard>
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
			</div>
		</>
	);
};

export default ShareMovie;
