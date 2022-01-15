
import React from 'react'
import { Link } from 'react-router-dom';

function Dash(props) {
    return (
        <div>
            <h1 className="mt-4">Dashboard</h1>
            <p className="lead mb-3">{props.name}</p>
            {/* <a href="/auth/logout" className="btn btn-secondary" >Logout</a> */}
            <form action="/auth/logout" method="POST">
                <button type="submit" className="btn btn-primary btn-block">Logout</button>
            </form>
            {/* <Link to="/auth/logout" className="btn btn-secondary" >Logout</Link> */}
        </div>
    )
}

export default Dash
