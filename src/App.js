import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.fetchTodos = this.fetchTodos.bind(this);
    //TODO nää alla olevat
    //  this.fetchOne = this.fetchOne.bind(this);
    this.postTodo = this.postTodo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.state = {
      todos: [],
      taskName: "",
    };
  }

  handleChange(event) {
    this.setState({ taskName: event.target.value });
  }

  fetchTodos() {
    console.log('fetching...');
    fetch('http://localhost:8080/todo/')
      .then(result => result.json())
      .then(result => this.setState({
        task: 'type task...',
        todos: result,
      })

      );

  };

  handleDelete(todoId, callback) {
    fetch('http://localhost:8080/todo/' + todoId, {
      method: 'DELETE',
    })
      .then(
      res => this.fetchTodos()
      )
      .catch(err => console.log(err))
  };


  postTodo(todo) {
    fetch('http://localhost:8080/todo/', {
      // POST method, JSON content type
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      // Request body
      body: JSON.stringify(todo)
    })
      .then(
      res => this.fetchTodos()
      )
      .catch(
      err => console.error(err)
      );
  };

  handleSubmit(event) {
    event.preventDefault();
    var newTodo = {
      taskName: this.state.taskName,
    };
    this.postTodo(newTodo);
  }

  render() {
    return (
      <div>
        {/*<input type="text" value={this.state.value} onChange={this.handleChange}/>*/}
        <button onClick={this.fetchTodos}>Get todos</button>
        <div>
          <TodoTable data={this.state.todos}
            handleDelete={this.handleDelete} />
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Todo:
          <input type="text" value={this.state.taskName} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

// Component for Todo table
class TodoTable extends Component {
  render() {
    var rows = this.props.data.map((item) =>
      <Task item={item} handleDelete={this.props.handleDelete}
        key={item.id} />
    );

    return (
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Action</th>
            <th>Id</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

// Component for one table row
class Task extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete(todoId) {
    this.props.handleDelete(todoId);
  }
  render() {
    return (
      <tr>
        <td>{this.props.item.taskName}</td>
        <td>
          <button
            id="idDeleteButton"
            onClick={() => this.handleDelete(this.props.item.id)}
          >Delete</button>
        </td>
        <td>{this.props.item.id}</td>
      </tr>);
  }
}

export default App;
