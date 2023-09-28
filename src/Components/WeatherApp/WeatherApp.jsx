import React, { useState } from 'react'
import './WeatherApp.css'

import search_icons from '../Assets/search.png'
import clear from '../Assets/clear.png'
import cloudy from '../Assets/cloud.png'
import drizzle from '../Assets/drizzle.png'
import humidity from '../Assets/humidity.png'
import rain from '../Assets/rain.png'
import snow from '../Assets/snow.png'
import wind from '../Assets/wind.png'
import toast from 'react-hot-toast'

export const WeatherApp = () => {
  let api_key = 'cce4281d72e34b0107d4a8b3158107dc';
  const [wicon, setWicon] = useState();

  const onKeyPress = async () => {
    return search()
  }

  const search = async () => {
    try {
      const element = document.getElementsByClassName("cityInput");
    if (element[0].value === ""){
      return 0;
    } 
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    const humidity = document.getElementsByClassName("humidity-per");
    const windrate = document.getElementsByClassName("wind-rate");
    const temp = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");
    const desc = document.getElementById("desc");

    humidity[0].innerHTML = data.main.humidity + " %";
    windrate[0].innerHTML = Math.floor(data.wind.speed) + " km/hr";
    temp[0].innerHTML = Math.floor(data.main.temp) + " °C";
    location[0].innerHTML = data.name;
    desc.innerHTML = data.weather[0].description;

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n"){
      //Sunny
      setWicon({clear});
    } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
      //Cloudy
      setWicon({cloudy});
    } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
      //Drizzle
      setWicon({drizzle});
    } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
     //cloudy 
      setWicon({cloudy});
    } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
      //Rain
      setWicon({rain});
    }  else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
      //Rain
      setWicon({rain});
    } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
      //Snow
      setWicon({snow});
    } else {
      //clear
      setWicon({clear});
    }
    } catch (error) {
      toast.error("Place doesn't exist. Please enter correct location");
    }
    
  } 

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%'}} className='main-container'>

      <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="" id='background-image' />
    <div className='container' >
      <div className="top-bar">
        <input 
          id='search-bar'
          type="text" 
          className="cityInput" 
          placeholder='Search'
          onKeyDown = {(key) => key.code === 'Enter' && search()}
        />
        <div 
          className="searchIcon" 
          onClick={() => {search()}}
        >
          <img src={search_icons} alt="" id='search-icon'/>
        </div>
      </div>
      <div className="weather-image">
        <img src={cloudy} alt="" className='img'/>
      </div>
      <div className="element" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
          <div className="data">
            <div id='desc'>Humidity</div>
          </div>
      </div>
      <div className="weather-temp">24 °C</div>
      <div className="weather-location">London</div>

      <div className="data-container">
        <div className="element">
          <img src={humidity} alt="" />
          <div className="data">
            <div className="humidity-per">65%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        
        <div className="element">
          <img src={wind} alt="" />
          <div className="data">
            <div className="wind-rate">18 km/hr</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
    </div>
)}
