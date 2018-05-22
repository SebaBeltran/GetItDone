import React, { Component } from "react";
import Counter from "./components/Counter";
import "./App.css";
import List from "./components/List";
import axios from "axios";
import Sidebar from "./components/Sidebar";

class App extends Component{
  constructor(){
    super();

    this.state = {
      baseUrl: "https://api.unsplash.com",
      unsplash_id: "7a41b4cbd80e929e44c9a1ed59f8a17f8b7f70c5c614c920d70eb456775b20ab",
      theme:"",
      random_pic: "",
      arrayOfLists: [],
      assigned: 0,
      completed: 0,
      nameNewList: "",
      quote:"",
      author:""

    } 
    this.createList = this.createList.bind(this);
    this.getImg = this.getImg.bind(this);
    this.getTheme = this.getTheme.bind(this);
    this.getKeySearch = this.getKeySearch.bind(this);
    this.refresh = this.refresh.bind(this);
    this.totalTasks = this.totalTasks.bind(this)
    this.changeNameList = this.changeNameList.bind(this)
    this.addTodo = this.addTodo.bind(this);
    this.removeList = this.removeList.bind(this);
  }

componentDidMount(){
  axios.get("/api/list").then(res=>{
    console.log(res.data)
      this.setState({arrayOfLists: res.data.list, completed: res.data.completed}, this.totalTasks)
  })
  axios.get("http://quotes.rest/qod.json?category=inspire").then(res=>{
    let randomQuote = res.data.contents.quotes[0];
    this.setState({quote: randomQuote.quote, author: randomQuote.author});
  })
  this.getImg()  
}

  //create a new list method
createList(){
    axios.post("/api/list", {listName: ""}).then(res=>{
      this.refresh()
    })
}

removeList(id){
  axios.delete(`/api/list/${id}`).then(res=>{
    this.refresh()
  })
}

// get the word the user entered
getTheme(val){
  this.setState({theme: val})
}

//get background img
getImg(){
  axios.get(this.state.baseUrl + `/photos/random/?query=${this.state.theme}&client_id=${this.state.unsplash_id}`).then((res)=>{
    this.setState({random_pic: res.data.urls.full})
  }
  )
}

//API call to get a random image of whatever word the user entered
getKeySearch(event) {
  if (event === "Enter" && this.state.theme !== "") {
    this.getImg()
  }
}
//Load the lists again once a list is deleted. 
//Also used to refresh counter when a new to-do is added
refresh(){
  axios.get("/api/list").then(res=>{
    this.setState({arrayOfLists: res.data.list, completed: res.data.completed}, this.totalTasks)
  })
}

addTodo(id, text){
  console.log(id, text)
  axios.post(`/api/todos/${id}`, {task: text}).then(res =>{
    this.refresh()
  })
}


changeNameList(event, id, val){
  console.log(id)
    if (event === "Enter" && val !== "") {
      axios.put(`/api/list/${id}`, {nameList: val}).then(res=>{
        this.refresh()
      })
    }
}

//Get the total of tasks assined looping through the array of lists
totalTasks(){
  let total = 0;
  this.state.arrayOfLists.map(obj=>{
    total += obj.tasks.length
  })
  this.setState({assigned: total})
}


  render(){
    let newList  = this.state.arrayOfLists.map((elem, i)=> {
        return <List key={i} id={i} nameList={elem.nameList} refresh={this.refresh} assign={this.totalTasks} changeName={this.changeNameList} todos={elem.tasks} addTodo={this.addTodo} removeList={this.removeList} removeTodo={this.removeTodo}/>
    });

    return (
      <div className="mainframe">
        <Sidebar quote={this.state.quote} author={this.state.author} getImg={this.getImg} getTheme={this.getTheme} theme={this.state.theme} getKeySearch={this.getKeySearch} city={this.state.city} lat={this.state.latitude} long={this.state.longitude} getForecast={this.getForecast}/>
        <div style={ { backgroundImage: `url(${this.state.random_pic})` } }  className="content_right">
          <section className="totals_wrapper">
            <Counter totalTodos={this.state.arrayOfLists.length} text="Lists Created"/>
            <Counter totalTodos={this.state.assigned} text="THINGS TO-DO"/>
            <Counter totalTodos={this.state.completed} text="THINGS DONE"/>
          </section>
          <button className="addBtn" onClick={()=>this.createList()}><i className="fas fa-plus"></i></button>
          <section className="todos_lists">
            {newList}
          </section>
          </div>    
      </div>
    )
  }
}

export default App;