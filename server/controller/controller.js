let lists = [
  {
    id: 0,
    nameList: "My first list",
    tasks:[
        {
          todoId:0,
          text:"First task"
        },
        {
          todoId:1,
          text:"Second task"
        },
        {
          todoId:2,
          text:"Third task"
        }
    ]
  }
]
let id = 0;
let todoId = 2;
let completed = 0;

module.exports = {

  //GET ENDPOINT - send the todos object
  getLists: function(req, res){
    res.status(200).send({list: lists, completed: completed});
  },

  //CREATE LIST ENDPOINT
  createList: function(req, res){
    id++;
    let newList = {
      id: id,
      nameList: "New List",
      tasks:[],
      completed: 0
    }
    lists.push(newList);
    res.status(200).send(lists);
  },

  changeName: function(req, res){
    // console.log(req)
    let item = lists.find(obj => obj.id === +req.params.id);
    item.nameList = req.body.nameList;
    res.status(200).send(item.nameList);
  },

  getListDetails: function(req, res){
    var item = lists.find(obj => obj.id === +req.params.id);
    res.status(200).send(item);
  },

  //CREATE TODO METHOD
  createTodo: function(req, res){
    var item = lists.find(obj => obj.id === +req.params.id);
    let newTodo = {
      todoId: todoId,
      text: req.body.task
    }
    item.tasks.push(newTodo)
    res.status(200).send(lists)
  },

  removeList: function(req, res){
    let item = lists.find(((obj, i) => {
      if(obj.id === +req.params.id){
        return lists[i]
      }}))
    let index = lists.splice(lists.indexOf(item), 1)
    for(let i = 0; i < lists.length; i++){
      if(lists[i].id !== i){
        lists[i].id --
      }
    }
    res.status(200).send(lists)
  },

  removeTodo: function(req, res){
    // console.log(req.params)
    let item = lists.find((obj => {
      if(obj.id === +req.params.id){
        return obj
    }}))
    let task = item.tasks.find((taskObj =>{
      if(taskObj.todoId === +req.params.todo){
        return taskObj
      }
    }))

    // console.log((item.tasks.indexOf(task)))
    completed += item.tasks.splice(item.tasks.indexOf(task), 1).length
    // console.log(completed)
    res.sendStatus(200).send(completed)
  }
  
}