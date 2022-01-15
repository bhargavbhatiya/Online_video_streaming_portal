
function Welcome() {
    return <>

        <div className="row mt-5">
            <div className="col-md-6 m-auto">
                <div className="card card-body text-center">
                    <h1><img src="/assets/secure-icon.png" alt="icon" width="20%" /></h1>
                    <p>Login to an existing account or register</p>
                    <a href="/auth/login" className="btn btn-primary btn-block">Login</a>
                    <a href="/auth/register" className="btn btn-secondary btn-block mb-2">Register</a>
                </div>
            </div>
        </div>
    </>;
}

export default Welcome;