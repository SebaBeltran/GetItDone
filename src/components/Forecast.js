import React, { Component } from "react";
import "./Forecast.css";
import axios from "axios";

class Forecast extends Component {
  constructor(){
    super();

    this.state ={
      city: "",
      temp:"",
      temp_max:"",
      temp_min:"",
      clouds:""
    }
    
    this.getForecast = this.getForecast.bind(this)

  }

componentDidMount(){
  
  // get city
  axios.get("https://ipapi.co/city").then(res=>{
  this.setState({city: res.data}, this.getForecast);
  })  
  }

  //get forecast
getForecast(){
  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=imperial&APPID=3e226f93546e45fce46a09a4c1e81106`).then(res=>{
    this.setState({temp: Math.round(res.data.main.temp), temp_max: Math.round(res.data.main.temp_max), temp_min: Math.round(res.data.main.temp_min), clouds: res.data.clouds})
  })
}
render(){
  let weather_icon = () => {
    if(this.state.clouds !==""){
      if(this.state.clouds <= 25){
        return <img className="weather_icon" src={require(`./imgs/sunny.png`)}/>
      } else if(this.state.clouds <= 75){
          return <img className="weather_icon" src={require(`./imgs/part_cloud.png`)}/>
      } else {
          return <img className="weather_icon" src={require(`./imgs/full_cloud.png`)}/>
      }
    }  
  }

  let temp = () => {
    if (this.state.temp !==""){
      return (
        <p className="temp">{this.state.temp}˚F</p>
      )
    }
  } 

  let temp_max = () => {
    if (this.state.temp_max !==""){
      return <p><i className="fas fa-long-arrow-alt-up"></i>{this.state.temp_max}</p>
    }
  }
  
  let temp_min = () => {
    if (this.state.temp_min !==""){
      return <p><i className="fas fa-long-arrow-alt-down"></i>{this.state.temp_min}</p>
    }
  } 
  
  return(
    <div className="forecast_wrapper">
      <h3>Hey, looks like you are in <span className="city">{this.state.city}</span>, here's the forecast for today</h3>
      <div className="forecast_info">
        {weather_icon()}
        <div className="temps">
          {temp()}
          <div className="max_min">
            {temp_max()}
            {temp_min()}
          </div>
        </div>
      </div>
    </div>  
  )
}
}

export default Forecast;