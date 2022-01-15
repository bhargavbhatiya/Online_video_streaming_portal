import React, { useState } from "react";
function Register() {
  // var name = "", email = "", password = "", password2 = "";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
            Register New User
          </h2>
          {/* <%- include ("./messages") %> */}
          <form action="/auth/register" method="POST">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="name" id="name" name="name" className="form-control" placeholder="Enter Name"
                onChange={(e) => { setName(e.target.value) }}
                value={name !== 'undefined' ? name : ''} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" className="form-control" placeholder="Enter Email"
                onChange={(e) => { setEmail(e.target.value) }}
                value={email !== 'undefined' ? email : ''} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" className="form-control" placeholder="Enter Password"
                onChange={(e) => { setPassword(e.target.value) }}
                value={password !== 'undefined' ? password : ''} />
            </div>
            <div className="form-group">
              <label htmlFor="password2">Confirm Password</label>
              <input type="password" id="password2" name="password2" className="form-control" placeholder="Confirm Password"
                onChange={(e) => { setPassword2(e.target.value) }}
                value={password2 !== 'undefined' ? password2 : ''} />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Register
            </button>
          </form>
          <p className="mt-4">Already have an account? <a href="/auth/login">Login</a></p>
        </div>
      </div>
    </div>

  </>;
}

export default Register;