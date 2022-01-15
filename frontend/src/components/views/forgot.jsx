
function Forgot() {

    return <>
        <div className="row mt-5">
            <div className="col-md-6 m-auto">
                <div className="card card-body text-center">
                    <h1 className="mb-3">
                        <img src="/assets/secure-icon.png" alt="icon" width="20%" />
                    </h1>
                    <h2>
                        Forgot Password
                    </h2>
                    {/* <%- include ("./messages") %> */}
                    {/* <Messages  /> */}
                    <form action="/auth/forgot" method="POST">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" className="form-control" placeholder="Enter Email" />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Send me a password reset link</button>
                    </form>
                    <p className="mt-4">
                        Remember your password? <a href="/auth/login">Login</a>
                    </p>
                </div>
            </div>
        </div>
    </>;
}

export default Forgot;