
function Login() {
    return <>

        <div className="row mt-5">
            <div className="col-md-6 m-auto">
                <div className="card card-body text-center">
                    <h1 className="mb-3">
                        <img src="/assets/secure-icon.png" alt="icon" width="20%" />
                    </h1>
                    <h2>
                        Login
                    </h2>
                    {/* <%- include ("./messages") %> */}
                    <form action="/auth/login" method="POST">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" className="form-control" placeholder="Enter Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" className="form-control"
                                placeholder="Enter Password" />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                    </form>
                    <p className="mt-4">
                        New User? <a href="/auth/register">Register</a>
                    </p>
                    <p>
                        Forgot Password? <a href="/auth/forgot">Reset</a>
                    </p>
                </div>
            </div>
        </div>
    </>;
}

export default Login;