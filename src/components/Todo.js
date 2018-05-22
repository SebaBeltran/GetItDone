import React, { Component } from "react"
import "./Todo.css"

export default function (props){
  console.log(props)
  return (
    <div className="todo_wrapper">
      <p className="todo">{props.text}<button className="remove_btn" onClick={()=>props.removeTodo(props.todoId)}><i class="far fa-trash-alt"></i></button></p>
      
    </div>
    )
}