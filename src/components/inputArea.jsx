import "../index.css"
import React, { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import sunnyIcon from "../assets/sunnyIcon.svg";
import cloudyIcon from "../assets/cloudyIcon.svg"
import drizzleIcon from "../assets/drizzleIcon.svg";
import rainyIcon from "../assets/rainyIcon.svg";
import snowIcon from "../assets/snowIcon.svg";
import WeatherDetails from "./outputArea";

function InputArea() {
  //openweather.com//
  const api_key = "91b4d8b03f0d3b52f81032a07c65b475";

  const [text, setText] = useState("London");
  const [icon, setIcon] = useState(sunnyIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("London");
  const [country, setCountry] = useState("GB");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherIconMap = {
    "01d": sunnyIcon,
    "01n": sunnyIcon,
    "02d": cloudyIcon,
    "02n": cloudyIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainyIcon,
    "09n": rainyIcon,
    "10d": rainyIcon,
    "10n": rainyIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  }

  const search = async () => {
    setLoading(true);
    setError(null); // Reset error state before starting the search
  
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
  
    try {
      let response = await fetch(url);
      let data = await response.json();
      if (data.cod === "404") {
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weatherIconcode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconcode] || sunnyIcon);
      setCityNotFound(false);
    } catch(error) {
      console.error("An error occurred:", error.message);
      setError("An error occurred while fetching weather data");
    } finally {
      setLoading(false);
    }
  };
  
  const handleCity = (event) => {
    setText(event.target.value);
  }

  const handleKeyDown = (event) => {
    if(event.key === "Enter") {
      search();
      setText("");
    }
  }

  //For default page (London)//
  useEffect(function() {
    search();
  }, []);
  
  return (
    <>
    <div className="container">
      <div className="input-container">
        <input type="text" onChange={handleCity} onClick={() => setText("")} value={text} onKeyDown={handleKeyDown} className="cityInput" placeholder="Search City"/>
        <div className="search-icon" onClick={() => {search(); setText("") }} >
          {<SearchIcon />}
        </div>
      </div>

      {loading && <div className="loading-message">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      {cityNotFound && <div className="city-not-found">City not found</div>}

      {!loading && !cityNotFound && 
      //Output Component//
      <WeatherDetails 
      icon={icon} 
      temp={temp} 
      city={city} 
      country={country} 
      lat={lat} 
      log={log} 
      humidity={humidity} 
      wind={wind} />}
    </div>
    </>
  );
}

export default InputArea;
