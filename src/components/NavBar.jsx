import React from "react";

function NavBar(props){
    return <div className="navbar">
        <div className ="logo">
            <img src = "./images/logo.jpeg" height={40}/>
            <h1 className="text appname">Weather Discerner</h1>
        </div>
        <h1 className="text timetext"><b>Time:</b>&nbsp;&nbsp;{props.time}</h1>
    </div>
}

export default NavBar;