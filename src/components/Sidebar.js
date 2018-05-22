import React, { Component } from "react";
import "./Sidebar.css";
import Forecast from "./Forecast";

export default function (props){
  return(
    <div className="sidebar">
        <div className="profile">
          <div className="profile_img">
            <img src="../imgs/profile_img.jpg"/>
          </div>
          <p className="username">username</p>
          <p className="position">position</p>
        </div>
        <input className="effect-1 top-3" placeholder="Search background image" value={props.theme} onChange={(e)=>{props.getTheme(e.target.value)}} onKeyDown={(e)=>{props.getKeySearch(e.key)}} />
        <div className="forecast">
          <Forecast />
        </div>
        <div className="quotes_wrapper">
          <p className="quote">{props.quote}</p>
          <p className="author">{props.author}</p>
        </div>
      </div>
    )
  }