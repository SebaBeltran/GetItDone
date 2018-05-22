import React, { Component } from "react";
import "./CreateList.css";
import Input from "./Input";
import axios from "axios"

class Form extends Component{
  constructor(){
    super();

    this.state = {
      nameList: ""
    }
    this.getListName = this.getListName.bind(this)
    this.getKeyName = this.getKeyName.bind(this)
  }
  getListName(val){
    this.setState({nameList: val})
  }
  // addList(){
  //   axios.post("/api/list", {listName: this.state.nameList}).then(res=>{
  //     console.log(res);

  //   })
  // }

  getKeyName(event) {
    if (event === 13) {
      this.props.newList(this.state.nameList)
    }
  }    

  render(){
    return(
      <div className="form">
        <div className="quotes_wrapper">
          <p className="quote">Procrastination makes easy things hard, hard things harder.</p>
          <p className="author">Mason Cooley</p>
        </div>
        <div className="form_wrapper">
            <Input value={this.state.newList} getTheme={this.getListName} getKey={this.getKeyName} placeholder={"Create your list"}/>
        <button className="top-3" onClick={()=>this.newList(this.state.nameList)}>CREATE LIST</button>
        </div>
      </div>  
    )
  }
}

export default Form;
