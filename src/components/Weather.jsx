import React from "react";

function Weather(props){
    return <div className="weathercontainer">
        <h3 className="text cityname">{props.cityname}</h3>
        <h3 className="text citystatus"><img src={props.imgsrc} height={30}/>&nbsp;&nbsp;&nbsp;{props.status}</h3>
        <h4 className="text citytemperature"><b>Temperature 🌡️ : </b> {props.temperature} C<sup>o</sup></h4>
        <h4 className="text cityhumidity"><b>Relative Humidity ♨️ : </b> {props.humidity}%</h4>
    </div>
}

export default Weather;