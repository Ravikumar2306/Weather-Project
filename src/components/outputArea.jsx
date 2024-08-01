import "../index.css"
import React from "react";
import humidityIcon from "../assets/humidityIcon.svg";
import windIcon from "../assets/windIcon.svg";


const WeatherDetails = ({icon, temp, city, country, lat, log, humidity, wind}) => {
  return (
    <>
    <div className="icon-pic">
    <img src={icon} alt="icon-image" />
    </div>
    <div className="temp">{temp}°C</div>
    <div className="location">{city}</div>
    <div className="country">{country}</div>
    <div className="cord">
    <div>
      <span className="lat">latitude</span> 
      <span>{lat}</span>
    </div>
    <div>
      <span className="log">longitude</span> 
      <span>{log}</span>
    </div>
    </div>
    <div className="data-container">
      <div className="element">
        <img src={humidityIcon} className="icon" alt="humidity" width={"40"}/>
        <div className="data">
          <div className="humidity-percent">{humidity}%</div>
          <div className="text">Humidity</div>
        </div>
      </div>
      <div className="element">
        <img src={windIcon} className="icon" alt="wind" width={"40"}/>
        <div className="data">
          <div className="wind-percent">{wind} km/h</div>
          <div className="text">wind Speed</div>
        </div>
      </div>
    </div>
    </>
  )
}

export default WeatherDetails;