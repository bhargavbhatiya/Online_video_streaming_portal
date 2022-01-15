import React, { useState } from "react";
const useParams = require('react-router-dom').useParams;

function ResetPassword() {
    const { id } = useParams();
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    return <>
        <div className="row mt-5">
            <div className="col-md-6 m-auto">
                <div className="card card-body text-center">
                    <h1 className="mb-3">
                        <img src="/assets/secure-icon.png" alt="icon" width="20%" />
                    </h1>
                    <h2>
                        Reset Password
                        {/* {id} */}
                    </h2>
                    {/* <%- include ("./messages") %> */}
                    <form action={`/auth/reset/${id}`} method="POST">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" className="form-control" placeholder="Enter Password"
                                // value="<%= typeof password != 'undefined' ? password : '' %>" />
                                onChange={(e) => { setPassword(e.target.value) }}
                                value={password !== 'undefined' ? password : ''} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password2">Confirm Password</label>
                            <input type="password" id="password2" name="password2" className="form-control" placeholder="Confirm Password"
                                // value="<%= typeof password2 != 'undefined' ? password2 : '' %>" />
                                onChange={(e) => { setPassword2(e.target.value) }}
                                value={password2 !== 'undefined' ? password2 : ''} />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Reset Password</button>
                    </form>
                    <p className="mt-4">
                        Remember your password? <a href="/auth/login">Login</a>
                    </p>
                </div>
            </div>
        </div>

    </>;
}

export default ResetPassword;