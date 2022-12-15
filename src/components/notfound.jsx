import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <React.Fragment>
            <div className="notfound-ctn">
                <div className="notfound-wrapper">
                    <h1>Oops! You seem to be lost.</h1>
                    <p>Here are the available links:</p>
                    <span> If you haven't Logged in - <div className="notfound-link"><Link to='/login'>LOGIN</Link></div></span>
                    <div className="notfound-link"><Link to='/'>Your Chat App</Link></div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default NotFound;