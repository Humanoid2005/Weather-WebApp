import React, { useState } from "react";
import NavBar from "./NavBar";
import Form from "./Form";
import Weather from "./Weather";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
    const [CName,setCName] = React.useState("");
    const [temp,settemp] = React.useState("");
    const [humidity,sethumidity] = React.useState("");
    const [status,setstatus] = React.useState("");
    const [InputPlace,setInputPlace] = React.useState("");
    const [Time,setTime] = React.useState("");
    const [imgsrc,setimgsrc] = React.useState(null);

    async function SubmittedPlace(place){
        setInputPlace(place);
        console.log(place);
        const response = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${place}`);
        if(response.data==null || response.data.length==0){
            toast.error(`City named ${InputPlace} does not exist!!`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                Bounce: true,
                });
        }
        else{
            const LocationKey = response.data[0].Key;
            const response2 = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${LocationKey}?apikey=${API_KEY}&details=true`);
            const result = response2.data;
            const time = result[0].LocalObservationDateTime.slice(11,13);
            setTime(result[0].LocalObservationDateTime.slice(11,16))
            setCName(response.data[0].EnglishName+" , "+response.data[0].AdministrativeArea.EnglishName+" , "+response.data[0].Country.EnglishName);
            settemp(result[0].Temperature.Metric.Value);
            sethumidity(result[0].RelativeHumidity);
            setstatus(result[0].WeatherText);
            setimgsrc (`./images/${result[0].WeatherIcon}.png`);
            console.log(CName);
            console.log(temp);
            console.log(humidity);
            console.log(status);
            console.log(imgsrc);

            var BODY = document.querySelector("body");
            var texts = document.querySelectorAll(".text");
            var inputLabelText = document.querySelector(".inputlabeltext");
            var formHeading = document.querySelector(".formheading");
            var weatherContainer = document.querySelector(".weathercontainer");
            var DivFormPlace = document.querySelector(".placeformdiv");

            if(time>=6 && time<17){
                BODY.style.backgroundImage = 'url("./images/day.jpg")';
                for(var i=0;i<texts.length;i++){
                    texts[i].style.color = "#2E2E2E";
                }
                inputLabelText.style.color = "#6E6E6E";
                formHeading.style.color = "#4E4E4E";
                weatherContainer.style.boxShadow = "rgba(0, 0, 0, 0.24) 0px 3px 8px";
                DivFormPlace.style.boxShadow = "rgba(0, 0, 0, 0.24) 0px 3px 8px";
            }
            else if(time>=17 && time<20){
                BODY.style.backgroundImage = 'url("./images/evening.jpg")';
                for(var i=0;i<texts.length;i++){
                    texts[i].style.color = "#FFFFFF";
                }
                inputLabelText.style.color = "#FFFFFF";
                formHeading.style.color = "#FFFFFF";
                weatherContainer.style.boxShadow = "rgba(255, 255, 255, 0.24) 0px 3px 8px";
                DivFormPlace.style.boxShadow = "rgba(255, 255, 255, 0.24) 0px 3px 8px";
            }
            else{
                BODY.style.backgroundImage = 'url("./images/night.jpg")';
                for(var i=0;i<texts.length;i++){
                    texts[i].style.color = "#FFFFFF";
                }
                inputLabelText.style.color = "#FFFFFF";
                formHeading.style.color = "#FFFFFF";
                weatherContainer.style.boxShadow = "rgba(255, 255, 255, 0.24) 0px 3px 8px";
                DivFormPlace.style.boxShadow = "rgba(255, 255, 255, 0.24) 0px 3px 8px";
            }
        }
    }

    return <div className="app">
        <NavBar time={Time}/>
        <Form SubmitPlace = {SubmittedPlace}/>
        <Weather cityname={CName} temperature={temp} humidity={humidity} status={status} imgsrc={imgsrc}/>
        <ToastContainer />
    </div>
}

export default App;
