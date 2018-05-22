import React, { Component } from "react";
import "./List.css";
import axios from "axios";
import Todo from "./Todo";

class List extends Component {
  constructor(props){
    super(props);

    this.state = {
      id:this.props.id,
      nameInput:"",
      todoInput:"",
    }

    this.getInput = this.getInput.bind(this);
    this.getKey = this.getKey.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }

  
  //input caught into state
  getInput(val){
    this.setState({todoInput: val})
  }  

  //get the name for the list
  getNameList(val){
    this.setState({nameInput: val})
  }
  
  getKey(event){
   if (event === 13 && this.state.input !== "") {
    this.setState({todoInput: ""})
    this.props.addTodo(this.state.id, this.state.todoInput)
    }
  }


removeTodo(todoID){
  console.log(todoID)
  axios.delete(`/api/list/${this.state.id}/${todoID}`).then(res=>{
    this.props.refresh()
  })
}

  render(){
    let getTodos = this.props.todos.map((elem, i)=>{
        return <Todo todoId={elem.todoId} text={elem.text} key={i} removeTodo={this.removeTodo}/>
      })
      
    return(
      <div className="list">
        <button className="remove_list " onClick={()=>this.props.removeList(this.state.id)}><i class="fas fa-times"></i></button>
        <div className="list_header">
          <div className="list_name">  
            <h1>{this.props.nameList}</h1>
            <button className="edit_btn"><i className="fas fa-pencil-alt"></i></button>
          </div>
          
          <input className={this.state.show_input} placeholder="Change the title" value={this.state.nameInput} onChange={(e)=>this.getNameList(e.target.value)} onKeyDown={(e)=>this.props.changeName(e.key, this.state.id, this.state.nameInput)}/>
          
          <input className="effect-1" value={this.state.todoInput} onChange={(e)=>this.getInput(e.target.value)} placeholder="Add to-do" onKeyDown={(e)=>this.getKey(e.keyCode, this.state.input)}/>
          <span className="focus-border"></span>

        </div>
        
        <div className="list_body">
          {getTodos}
        </div> 
      </div>
    )
  }
}

export default List;