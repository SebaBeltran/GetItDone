const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const todosCtrl = require("./controller/controller");

app.use(bodyParser.json()); 

const port = 3005;

app.use(bodyParser.json());

app.get("/api/list", todosCtrl.getLists);

//endpoint for getting each list data
app.get("/api/list/:id", todosCtrl.getListDetails);

// //endpoint for todos
app.post("/api/todos/:id", todosCtrl.createTodo);

// //endpoint for lists
app.post("/api/list", todosCtrl.createList);

// endpoint for changeName
app.put("/api/list/:id", todosCtrl.changeName);

app.delete("/api/list/:id/:todo", todosCtrl.removeTodo);

// endpoint for deletin list
app.delete("/api/list/:id", todosCtrl.removeList);



app.listen(port, () => {
  console.log("listening: " + port)
})
