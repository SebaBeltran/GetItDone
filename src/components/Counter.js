import React, { Component } from "react";
import "./Counter.css"

export default function(props){
  return (
    <div className="counter" id="first">
      <h6>{props.totalTodos}</h6>
      <h5>{props.text}</h5>
    </div>
  )
}