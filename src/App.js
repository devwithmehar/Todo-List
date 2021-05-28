import './App.css';
import React ,{useState, useEffect } from 'react'
import Form from './components/Form'
import TodoList from './components/TodoList'

function App() {

  //State Stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filterTodos, setFilterTodos] = useState([]);
//Run Once When the app starts
useEffect(() =>{
getLocalTodos();
},[])


//Use Effect : everytime a stucture or completed state changes we can run the function again
useEffect(() =>{
  filterHandler();
  saveLocalTodos();
},[todos ,status ])

  //Functions and events
  const filterHandler = () =>{
    switch(status){
      case 'completed':
      setFilterTodos(todos.filter(todo =>todo.completed === true));
      break;
      case 'uncompleted':
      setFilterTodos(todos.filter(todo =>todo.completed === false));
      break;
      default:
      setFilterTodos(todos);
      break;
    }
  };

  //Save to Local Storage
  const saveLocalTodos = () =>{
   localStorage.setItem('todos', JSON.stringify(todos));
  };
  const getLocalTodos = () =>{
    if(localStorage.getItem('todos') == null){
      localStorage.setItem('todos',JSON.stringify([]));
    }
    else{
    let todoLocal =  JSON.parse(localStorage.getItem('todos'));
     setTodos(todoLocal)
    }
  }

  return (
    <div className="App">
      <header>
      <h1>Sahil's Todo List </h1>
      </header>
      <Form 
      inputText={inputText} 
      todos={todos} 
      setTodos={setTodos} 
      setInputText={setInputText} 
      setStatus={setStatus}
      />
      <TodoList  
      todos={todos} 
      setTodos={setTodos} 
      filterTodos={filterTodos}
      />
    </div>
  );
}

export default App;
