import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Modal from 'react-modal';
import { TodoRowHeader, TodoRow, SelectedTodo } from './components/todo';
import { addTodo, generateId, findById, updateTodos, toggleTodo, removeTodo, updateImportance, updatePercent, updateTime, updateTitle } from './lib/todoHelpers';
import { loadTodos, createTodo, saveTodo, destroyTodo } from './lib/todoService';
import { modalStyles } from './components/modal/modal_styles';


class App extends Component {

  state = {
    todos: [],
    selectedTodos: [],
    errorMessage: '',
    modalIsOpen: false,
    modalTitle: '',
    idForTitleChange: ''
  }

  static contextTypes = {
    route: React.PropTypes.string
  };

  componentDidMount() {
    loadTodos()
      .then(todos => {
        this.setState({ todos }, () => {
          let selectedTodos = this.state.todos.filter(todo => todo.selected);
          this.setState({ selectedTodos });
        })
      });
  }

  openModal = () => {
    this.setState({
      modalIsOpen: true
    });
  }

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      modalTitle: '',
      errorMessage: ''
    });
  }

  handleRemove = id => {
    this.state.selectedTodos.forEach(todo => {
      removeTodo(this.state.todos, todo.id);
      destroyTodo(todo.id);
    });

    const updatedTodos = this.state.todos.filter(todo => !todo.selected);

    this.setState({ todos: updatedTodos, selectedTodos: [] });
  }

  handleToggle = id => {
    const todo = findById(id, this.state.todos);
    const toggled = toggleTodo(todo);
    const updatedTodos = updateTodos(this.state.todos, toggled);

    const selectedTodos = updatedTodos.filter(todo => todo.selected);
    this.setState({ todos: updatedTodos, selectedTodos });

    saveTodo(toggled);
  }

  handleImportanceChange = (id, event) => {
    const newImportance = event.target.value;
    const todo = findById(id, this.state.todos);
    const updatedTodo = updateImportance(todo, newImportance);
    const updatedTodos = updateTodos(this.state.todos, updatedTodo);
    this.setState({ todos: updatedTodos });
    saveTodo(updatedTodo);
  }

  handlePercentChange = (id, event) => {
    const newPercent = event.target.value;
    const todo = findById(id, this.state.todos);
    const updatedTodo = updatePercent(todo, newPercent);
    const updatedTodos = updateTodos(this.state.todos, updatedTodo);
    this.setState({ todos: updatedTodos });
    saveTodo(updatedTodo);
  }

  handleTimeChange = (id, event) => {
    const newHours = event.target.value;
    const todo = findById(id, this.state.todos);
    const updatedTodo = updateTime(todo, newHours);
    const updatedTodos = updateTodos(this.state.todos, updatedTodo);
    this.setState({ todos: updatedTodos });
    saveTodo(updatedTodo);
  }

  createNewTodo = (event) => {
    event.preventDefault();
    if (!this.state.modalTitle) {
      return this.handleEmptyTitle();
    }
    const newId = generateId();
    const newTodo = {
      "id": newId,
      title: this.state.modalTitle,
      importance: "low",
      creator: "User 1",
      time: 0,
      percentComplete: 0,
      description: "",
      selected: false
    };
    const updatedTodos = addTodo(this.state.todos, newTodo);
    this.setState({
      todos: updatedTodos,
      modalIsOpen: false,
      modalTitle: ''
    });
    createTodo(newTodo);
  }

  handleEmptyTitle = () => {
    this.setState({
      errorMessage: 'Please enter a todo title'
    });
  }

  changeTitle = (id, event) => {
    const newTitle = event.target.value;
    const todo = findById(id, this.state.todos);
    const updatedTodo = updateTitle(todo, newTitle);
    const updatedTodos = updateTodos(this.state.todos, updatedTodo);
    this.setState({ todos: updatedTodos });
    saveTodo(updatedTodo);
  }

  handleTitleChange = (event) => {
    this.setState({
      modalTitle: event.target.value
    });
  }

  render() {

    return (

      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="Todo-App">

        <div id="modal">
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={modalStyles}
            contentLabel="Example Modal" >

            <p id="modalTitle">Title</p>
            {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
            <form onSubmit={this.createNewTodo}>
              <input value={this.state.modalTitle} onChange={this.handleTitleChange} />
            </form>

            <button id="saveModal" onClick={this.createNewTodo}>save</button>
            <button onClick={this.closeModal}>close</button>
          </Modal>
        </div>


          {this.state.message && <span className="green">{this.state.message}</span>}
          <SelectedTodo
            openModal={this.openModal}
            selectedTodos={this.state.selectedTodos}
            createNewTodo={this.createNewTodo}
            handleRemove={this.handleRemove}
          />
          <table>
            <tbody>
              <TodoRowHeader />
              {this.state.todos.map(todo => {
                return (
                  <TodoRow
                    todo={todo}
                    handleToggle={this.handleToggle}
                    handleImportanceChange={this.handleImportanceChange}
                    handlePercentChange={this.handlePercentChange}
                    handleTimeChange={this.handleTimeChange}
                    openModal={this.openModal}
                    changeTitle={this.changeTitle}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
