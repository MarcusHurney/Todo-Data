import React, { Component } from 'react';
import './App.css';
import Modal from 'react-modal';
import { TodoRowHeader, TodoRow, SelectedTodo, Footer } from './components/todo';
import { addTodo, generateId, findById, updateTodos, toggleTodo, removeTodo, updateImportance, updatePercent, updateTime, updateTitle, updateDescription } from './lib/todoHelpers';
import { loadTodos, createTodo, saveTodo, destroyTodo } from './lib/todoService';
import { centeredModalStyles } from './components/modal/centered_modal_styles';
import { descriptionModalStyles } from './components/modal/description_modal_styles';


class App extends Component {

  state = {
    todos: [],
    selectedTodos: [],
    errorMessage: '',
    modalIsOpen: false,
    descripModalIsOpen: false,
    descripModalStyles: {},
    modalTitle: '',
    modalDescription: '',
    editTodoId: ''
  }

  componentDidMount() {
    // load todos from db.json and set them to "todos" in state
    loadTodos()
      .then(todos => {
        this.setState({ todos }, () => {
          // todo items with a selected property of true are set to "selectedTodos"
          let selectedTodos = this.state.todos.filter(todo => todo.selected);
          this.setState({ selectedTodos });
        })
      });
  }

  openModal = (todoId, type, event) => {
    // check which type of modal to open: titleModal or descriptionModal
    if (type === 'titleModal') {
      this.setState({
        modalIsOpen: true
      });
    } else if (type === 'descriptionModal') {
      // check client's screen size, anything smaller than 1415px wide
      // should render centeredModalStyles
      if (window.innerWidth <= 1415) {
        this.setState({
          descripModalStyles: centeredModalStyles,
          descripModalIsOpen: true,
          editTodoId: todoId,
        });
      } else {
        // client is using larger screen so set top of modal beneath click point
        descriptionModalStyles.content.left = event.clientX + 'px';
        descriptionModalStyles.content.top = (event.clientY + 98.5) + 'px';

        this.setState({
          descripModalStyles: descriptionModalStyles,
          descripModalIsOpen: true,
          editTodoId: todoId,
        });
      }
    }
  }

  closeModal = () => {
    // refresh state and close modals
    this.setState({
      modalIsOpen: false,
      descripModalIsOpen: false,
      modalTitle: '',
      errorMessage: '',
      editTodoId: ''
    });
  }

  handleRemove = () => {
    // only todos with a selected property of true will be removed
    this.state.selectedTodos.forEach(todo => {
      removeTodo(this.state.todos, todo.id);
      destroyTodo(todo.id);
    });

    // update todos in state to reflect changes
    const updatedTodos = this.state.todos.filter(todo => !todo.selected);
    this.setState({ todos: updatedTodos, selectedTodos: [] });
  }

  toggleSelected = id => {
    // given a todo's id, this method toggles the selected property
    // to true or false
    const todo = findById(id, this.state.todos);
    const toggled = toggleTodo(todo);
    const updatedTodos = updateTodos(this.state.todos, toggled);

    // update todos in state to reflect changes
    const selectedTodos = updatedTodos.filter(todo => todo.selected);
    this.setState({ todos: updatedTodos, selectedTodos });

    // update db.json
    saveTodo(toggled);
  }

  handleImportanceChange = (id, event) => {
    // given a todo's unique id as a param,
    // this method updates the importance property of a single todo item
    const newImportance = event.target.value;
    const todo = findById(id, this.state.todos);
    const updatedTodo = updateImportance(todo, newImportance);

    // update todos in state to reflect changes
    const updatedTodos = updateTodos(this.state.todos, updatedTodo);
    this.setState({ todos: updatedTodos });

    // update db.json
    saveTodo(updatedTodo);
  }

  handlePercentChange = (id, event) => {
    // given a todo's unique id as a param,
    // this method updates the percentComplete property of a single todo item
    // maximum is 100%
    const newPercent = event.target.value;
    if (newPercent <= 100) {
      const todo = findById(id, this.state.todos);
      const updatedTodo = updatePercent(todo, newPercent);

      // update todos in state to reflect changes
      const updatedTodos = updateTodos(this.state.todos, updatedTodo);
      this.setState({ todos: updatedTodos });

      // update db.json
      saveTodo(updatedTodo);
    }
  }

  handleTimeChange = (id, event) => {
    // given a todo's unique id as a param,
    // this method updates the time property of a single todo item
    const newHours = event.target.value;
    const todo = findById(id, this.state.todos);
    const updatedTodo = updateTime(todo, newHours);

    // update todos in state to reflect changes
    const updatedTodos = updateTodos(this.state.todos, updatedTodo);
    this.setState({ todos: updatedTodos });

    // update db.json
    saveTodo(updatedTodo);
  }

  changeDescription = () => {
    // method gets called from the description modal
    // pulls the todo's id from "this.state.editTodoId" - set in this.openModal
    // updates the description property of a single todo item
    const newDescription = this.state.modalDescription;
    const todo = findById(this.state.editTodoId, this.state.todos);
    const updatedTodo = updateDescription(todo, newDescription);

    // update todos in state to reflect changes
    const updatedTodos = updateTodos(this.state.todos, updatedTodo);
    this.setState({ todos: updatedTodos, modalDescription: '', editTodoId: '', descripModalIsOpen: false });

    // update db.json
    saveTodo(updatedTodo);
  }

  createNewTodo = (event) => {
    // initializes a new todo item with title set to this.state.modalTitle
    // is run when a user submits the form on the title modal
    // the creator property could be dynamic with a login system
    event.preventDefault();
    if (!this.state.modalTitle) {
      return this.handleEmptyTitle();
    }
    const newId = generateId();
    const newTodo = {
      "id": newId,
      title: this.state.modalTitle,
      importance: "low",
      creator: "Elmir",
      time: 0,
      percentComplete: 0,
      description: "",
      selected: false
    };

    // update todos in state to reflect changes
    const updatedTodos = addTodo(this.state.todos, newTodo);
    this.setState({
      todos: updatedTodos,
      modalIsOpen: false,
      modalTitle: '',
      errorMessage: ''
    });

    // update db.json
    createTodo(newTodo);
  }

  handleEmptyTitle = () => {
    // prevents a user from creating a todo with an empty title
    this.setState({
      errorMessage: 'Please enter a todo title'
    });
  }

  changeTitle = (id, event) => {
    // given a todo's unique id as a param,
    // this method updates the title property of a single todo item (max 10 char)
    const newTitle = event.target.value;
    if (newTitle.length < 11) {
      const todo = findById(id, this.state.todos);
      const updatedTodo = updateTitle(todo, newTitle);

      // update todos in state to reflect changes
      const updatedTodos = updateTodos(this.state.todos, updatedTodo);
      this.setState({ todos: updatedTodos, errorMessage: '' });

      // update db.json
      saveTodo(updatedTodo);
    }
  }

  handleTitleChange = (event) => {
    // updates modalTitle in state as a user types a new title
    // in the title modal (limit 10 characters)
    if (event.target.value.length > 10) {
      this.setState({
        errorMessage: 'Max length 10 characters'
      });
    } else {
      this.setState({
        errorMessage: '',
        modalTitle: event.target.value
      });
    }
  }

  handleEditDescription = (event) => {
    // updates "modalDescription" in state as a user types a new description
    // in the description modal (limit 50 characters)
    if (event.target.value.length > 50) {
      this.setState({
        errorMessage: 'Max length 50 characters'
      });
    } else {
      this.setState({
        errorMessage: '',
        modalDescription: event.target.value
      });
    }
  }



  render() {
    return (
      <div className="App">

        <div className="Todo-App">

          {/* Begin Title Modal */}
          <div id="titleModal">
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              style={centeredModalStyles}
              contentLabel="Example Modal" >

              <h1 id="modalTitle">Title</h1>

              {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}

              <form onSubmit={this.createNewTodo}>
                <input id="titleInput" value={this.state.modalTitle} onChange={this.handleTitleChange} />
              </form>

              <span id="titleCount" className="grey">
                {this.state.modalTitle.length} / 10
              </span>


              <div id="modalBtns">
                <button id="closeModal" onClick={this.closeModal}>cancel</button>
                <button id="saveModal" onClick={this.createNewTodo}>save</button>
              </div>
            </Modal>
          </div>
          {/* End Title Modal */}

          {/* Begin Description Modal */}
          <div id="descriptionModal">
            <Modal
              isOpen={this.state.descripModalIsOpen}
              onRequestClose={this.closeModal}
              style={this.state.descripModalStyles}
              contentLabel="Example Modal" >

              <h1 id="modalTitle">description</h1>

              {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}

              <form onSubmit={this.changeDescription}>
                <input id="titleInput" value={this.state.modalDescription} onChange={this.handleEditDescription} />
              </form>

              <span id="titleCount" className="grey">
                {this.state.modalDescription.length} / 50
              </span>
            </Modal>
          </div>
          {/* End Description Modal */}

          <SelectedTodo
            openModal={this.openModal}
            selectedTodos={this.state.selectedTodos}
            createNewTodo={this.createNewTodo}
            handleRemove={this.handleRemove}
          />

          <div id="tableContainer">
            <table>
              <tbody>
                <TodoRowHeader />
                {this.state.todos.map(todo => {
                  return (
                    <TodoRow
                      key={todo.id}
                      todo={todo}
                      handleToggle={this.toggleSelected}
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

          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
