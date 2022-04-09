import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
	showErrMsg,
	showSuccessMsg,
} from "../../utils/notification/Notification";
import { dispatchLogin } from "../../../redux/actions/authAction";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";


const initialState = {
	email: "",
	password: "",
	err: "",
	success: "",
};

function Login() {
	const [user, setUser] = useState(initialState);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { email, password, err, success } = user;

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value, err: "", success: "" });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post("/user/login", { email, password });
			setUser({ ...user, err: "", success: res.data.msg });

			localStorage.setItem("firstLogin", true);
			dispatch(dispatchLogin());
			navigate("/");
		} catch (err) {
			err.response.data.msg &&
				setUser({ ...user, err: err.response.data.msg, success: "" });
		}
	};

	const responseGoogle = async (response) => {
		try {
			const res = await axios.post("/user/google_login", {
				tokenId: response.tokenId,
			});

			setUser({ ...user, error: "", success: res.data.msg });
			localStorage.setItem("firstLogin", true);

			dispatch(dispatchLogin());
			navigate("/");
		} catch (err) {
			err.response.data.msg &&
				setUser({ ...user, err: err.response.data.msg, success: "" });
		}
	};


	return (
		<div className="login_page text-white">
			<h2>Login</h2>
			{err && showErrMsg(err)}
			{success && showSuccessMsg(success)}

			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email Address</label>
					<input
						type="text"
						placeholder="Enter email address"
						id="email"
						value={email}
						name="email"
						onChange={handleChangeInput}
					/>
				</div>

				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						placeholder="Enter password"
						id="password"
						value={password}
						name="password"
						onChange={handleChangeInput}
					/>
				</div>

				
				<Link className="text-white" to="/forgot_password">
					Forgot your password?
				</Link>
				<button className="button-64" type="submit">
					<span className="text">Login</span>
				</button>
			
			</form>

			<div className="hr">Or Login With</div>

			<div className="social">
				<GoogleLogin
					clientId={process.env.REACT_APP_CLIENT_ID}
					buttonText="Login with google"
					onSuccess={responseGoogle}
					cookiePolicy={"single_host_origin"}
				/>
			</div>

			<p>
				New User?{" "}
				<Link className="text-white" to="/register">
					Register
				</Link>
			</p>
		</div>
	);
}

export default Login;
