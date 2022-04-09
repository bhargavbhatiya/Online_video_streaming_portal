import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { isLength, isMatch } from "../../utils/validation/Validation";
import {
	showSuccessMsg,
	showErrMsg,
} from "../../utils/notification/Notification";
import {
	fetchAllUsers,
	dispatchGetAllUsers,
} from "../../../redux/actions/usersAction";
import DisplayWatchLater from "./displayWatchLater";
import DisplayHistory from "./displayHistory";
import DisplayLiked from "./displayLiked";

const initialState = {
	name: "",
	password: "",
	cf_password: "",
	err: "",
	success: "",
};

function Profile() {
	const auth = useSelector((state) => state.auth);
	const token = useSelector((state) => state.token);

	const users = useSelector((state) => state.users);

	const { user, isAdmin } = auth;
	const [data, setData] = useState(initialState);
	const { name, password, cf_password, err, success } = data;

	const [avatar, setAvatar] = useState(false);
	const [loading, setLoading] = useState(false);
	const [callback, setCallback] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		if (isAdmin) {
			fetchAllUsers(token).then((res) => {
				dispatch(dispatchGetAllUsers(res));
			});
		}
	}, [token, isAdmin, dispatch, callback]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value, err: "", success: "" });
	};

	const changeAvatar = async (e) => {
		e.preventDefault();
		try {
			const file = e.target.files[0];

			if (!file)
				return setData({
					...data,
					err: "No files were uploaded.",
					success: "",
				});

			if (file.size > 1024 * 1024)
				return setData({ ...data, err: "Size too large.", success: "" });

			if (file.type !== "image/jpeg" && file.type !== "image/png")
				return setData({
					...data,
					err: "File format is incorrect.",
					success: "",
				});

			let formData = new FormData();
			formData.append("file", file);

			setLoading(true);
			const res = await axios.post("/api/upload_avatar", formData, {
				headers: {
					"content-type": "multipart/form-data",
					Authorization: token,
				},
			});

			setLoading(false);
			setAvatar(res.data.url);
		} catch (err) {
			setData({ ...data, err: err.response.data.msg, success: "" });
		}
	};

	const updateInfor = () => {
		try {
			axios.patch(
				"/user/update",
				{
					name: name ? name : user.name,
					avatar: avatar ? avatar : user.avatar,
				},
				{
					headers: { Authorization: token },
				}
			);

			setData({ ...data, err: "", success: "Updated Success!" });
		} catch (err) {
			console.log("Error", err);
			setData({ ...data, err: err.response.data.msg, success: "" });
		}
	};

	const updatePassword = () => {
		if (isLength(password))
			return setData({
				...data,
				err: "Password must be at least 6 characters.",
				success: "",
			});

		if (!isMatch(password, cf_password))
			return setData({ ...data, err: "Password did not match.", success: "" });

		try {
			axios.post(
				"/user/reset",
				{ password },
				{
					headers: { Authorization: token },
				}
			);

			setData({ ...data, err: "", success: "Updated Success!" });
		} catch (err) {
			console.log("Error", err);

			setData({ ...data, err: err.response.data.msg, success: "" });
		}
	};

	const handleUpdate = () => {
		if (name || avatar) updateInfor();
		if (password) updatePassword();
	};

	const handleDelete = async (id) => {
		try {
			if (user._id !== id) {
				if (window.confirm("Are you sure you want to delete this account?")) {
					setLoading(true);
					await axios.delete(`/user/delete/${id}`, {
						headers: { Authorization: token },
					});
					setLoading(false);
					setCallback(!callback);
				}
			}
		} catch (err) {
			console.log("Error", err);

			setData({ ...data, err: err.response.data.msg, success: "" });
		}
	};

	return (
		<>
			<div className="message">
				{err && showErrMsg(err)}
				{success && showSuccessMsg(success)}
				{loading && <h3>Loading.....</h3>}
			</div>
			<div className="profile_page">
				<div className="profile_page_left">
					<div className="col-left border-end border-2 border-dark">
						<h2>{isAdmin ? "Admin Profile" : "User Profile"}</h2>

						<div className="avatar">
							<img src={avatar ? avatar : user.avatar} alt="" />
							<span>
								<i className="fas fa-camera"></i>
								<p>Change</p>
								<input
									type="file"
									name="file"
									id="file_up"
									onChange={changeAvatar}
								/>
							</span>
						</div>

						<div className="form-group">
							<label htmlFor="name">Name</label>
							<input
								type="text"
								name="name"
								id="name"
								defaultValue={user.name}
								placeholder="Your name"
								onChange={handleChange}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								name="email"
								id="email"
								defaultValue={user.email}
								placeholder="Your email address"
								disabled
							/>
						</div>

						<div className="form-group">
							<label htmlFor="password">New Password</label>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="Your password"
								value={password}
								onChange={handleChange}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="cf_password">Confirm New Password</label>
							<input
								type="password"
								name="cf_password"
								id="cf_password"
								placeholder="Confirm password"
								value={cf_password}
								onChange={handleChange}
							/>
						</div>

						<div>
							<em style={{ color: "crimson" }}>
								* If you update your password here, you will not be able to
								login quickly using google and facebook.
							</em>
						</div>

						<button disabled={loading} onClick={handleUpdate}>
							Update
						</button>
					</div>
				</div>
				<div className="col-right">
					<nav>
						<div class="nav nav-tabs" id="nav-tab" role="tablist">
							{isAdmin ? (
								<button
									class="nav-link active"
									id="nav-user-tab"
									data-bs-toggle="tab"
									data-bs-target="#nav-user"
									type="button"
									role="tab"
									aria-controls="nav-user"
									aria-selected="true"
								>
									All Users
								</button>
							) : (
								<> </>
							)}
							<button
								class="nav-link"
								id="nav-history-tab"
								data-bs-toggle="tab"
								data-bs-target="#nav-history"
								type="button"
								role="tab"
								aria-controls="nav-history"
								aria-selected="false"
							>
								History
							</button>
							<button
								class="nav-link"
								id="nav-watchLater-tab"
								data-bs-toggle="tab"
								data-bs-target="#nav-watchLater"
								type="button"
								role="tab"
								aria-controls="nav-watchLater"
								aria-selected="false"
							>
								Watch Later List
							</button>
							<button
								class="nav-link"
								id="nav-liked-tab"
								data-bs-toggle="tab"
								data-bs-target="#nav-liked"
								type="button"
								role="tab"
								aria-controls="nav-liked"
								aria-selected="false"
							>
								Liked List
							</button>
						</div>
					</nav>
					<div class="tab-content" id="nav-tabContent">
						{isAdmin ? (
							<div
								class="tab-pane fade show active"
								id="nav-user"
								role="tabpanel"
								aria-labelledby="nav-user-tab"
							>
								<>
									<h2>Manage All Users</h2>
									<div style={{ overflowX: "auto" }}>
										<table className="customers">
											<thead>
												<tr>
													<th>ID</th>
													<th>Name</th>
													<th>Email</th>
													<th>Admin</th>
													<th>Action</th>
												</tr>
											</thead>
											<tbody>
												{users.map((user) => (
													<tr key={user._id}>
														<td>{user._id}</td>
														<td>{user.name}</td>
														<td>{user.email}</td>
														<td>
															{user.role === 1 ? (
																<i className="fas fa-check" title="Admin"></i>
															) : (
																<i className="fas fa-times" title="User"></i>
															)}
														</td>
														<td>
															<Link to={`/edit_user/${user._id}`}>
																<i className="fas fa-edit" title="Edit"></i>
															</Link>
															<i
																className="fas fa-trash-alt"
																title="Remove"
																onClick={() => handleDelete(user._id)}
															></i>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</>
							</div>
						) : (
							<> </>
						)}
						<div
							class="tab-pane fade"
							id="nav-history"
							role="tabpanel"
							aria-labelledby="nav-history-tab"
						>
							<DisplayHistory />
						</div>
						<div
							class="tab-pane fade"
							id="nav-watchLater"
							role="tabpanel"
							aria-labelledby="nav-watchLater-tab"
						>
							<div className="watchLater">
								<DisplayWatchLater />
							</div>
						</div>
						<div
							class="tab-pane fade"
							id="nav-liked"
							role="tabpanel"
							aria-labelledby="nav-liked-tab"
						>
							<DisplayLiked />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Profile;
