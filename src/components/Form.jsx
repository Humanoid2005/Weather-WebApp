import React from "react";

function Form(props){
    const [location,setLocation]  = React.useState('');

    function ChangeText(event){
        setLocation(event.target.value);
    }

    function SubmitLocation(event){
        event.preventDefault();
        props.SubmitPlace(location);
        setLocation("");
    }

    return <div className="placeformdiv">
        <h2 className=" formheading text">Discern Weather 👓</h2>
        <form className="placeform">
            <label className="inputlabeltext text">Which place's weather would you like to see ? 🔎</label>
            <input type="text" className="inputtext" name="place" value={location} onChange={ChangeText} placeholder="Enter name of place"></input>
            <button type="submit" className="formsubmitbutton text" onClick={SubmitLocation}>Search</button>
        </form>
    </div>
}

export default Form;