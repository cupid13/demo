import React, { Component } from 'react';
// import Form from './components/Form';
// import Todo from './components/Todo'
// import Brother from './components/Brother'
import TodoList from './components/TodoList'
import Qw from './components/Qw'
class App extends Component{
  render(){
    return(
      <div>
        {/* <Form/> */}
        {/* <Todo/> */}
        {/* <Brother/> */}
        <Qw/>
        <TodoList></TodoList>
      </div>
    )
  }
}

export default App;
