import React from "react";
import ListView from "../listview";
import TableView from "../tableview";
import Controller from "../controller";
import CreateTodoForm from "../create-todo-form";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import shortid from "shortid";

class Todos extends React.Component {
  state = {
    todos: [
      {
        id: "1",
        text: "main todo text",
        description: "simple description",
        time: new Date(),
        isComplete: false,
        isSelect: false,
      },
      {
        id: "2",
        text: "Eyakub",
        description: "simple description",
        time: new Date(),
        isComplete: false,
        isSelect: false,
      },
      {
        id: "3",
        text: "new task",
        description: "simple description",
        time: new Date(),
        isComplete: false,
        isSelect: false,
      },
    ],
    isOpenTodoForm: false,
    searchTerm: "",
    view: "list",
    filter: 'all',
  };

  toggleSelect = (todoId) => {
    const todos = [...this.state.todos];
    const todo = todos.find((tId) => tId.id === todoId);
    todo.isSelect = !todo.isSelect;
    this.setState({ todos });
  };

  toggleComplete = (todoId) => {
    const todos = [...this.state.todos];
    const todo = todos.find((tId) => tId.id === todoId);
    todo.isComplete = !todo.isComplete;
    this.setState({ todos });
  };

  // Todo create modal open or not
  toggleForm = () => {
    this.setState({
      isOpenTodoForm: !this.state.isOpenTodoForm,
    });
  };

  handleSearch = (value) => {
    this.setState({ searchTerm: value });
  };

  performSearch = () => {
    return this.state.todos.filter((todo) =>
      todo.text.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );
  };

  performFilter = (todos) => {
    const {filter} = this.state
    if(filter === 'completed'){
      return todos.filter(todo => todo.isComplete)
    } else if (filter === 'running'){
      return todos.filter(todo => !todo.isComplete)
    } else{
      return todos;
    }
  };

  createTodo = (todo) => {
    todo.id = shortid.generate();
    todo.time = new Date();
    todo.isComplete = false;
    todo.isSelect = false;

    // immutable way ???
    // ... spread operator
    const todos = [todo, ...this.state.todos];
    this.setState({ todos });
    this.toggleForm();
  };

  handleFilter = (filter) => {
    this.setState({filter})
  };

  changeView = (event) => {
    this.setState({
      view: event.target.value,
    });
  };

  clearSelected = () => {
    const todos = this.state.todos.filter(todo => !todo.isSelect)
    this.setState({todos})
  };

  clearCompleted = () => {
    const todos = this.state.todos.filter(todo => !todo.isComplete)
    this.setState({todos})
  };

  reset = () => {
    this.setState({
      filter: 'all',
      searchTerm: '',
      view: 'list',
      isOpenTodoForm: false,
    })
  };

  getView = () => {
    let todos = this.performSearch();
    todos = this.performFilter(todos);
    return this.state.view === "list" ? (
      <ListView
        todos={todos}
        toggleSelect={this.toggleSelect}
        toggleComplete={this.toggleComplete}
      />
    ) : (
      <TableView
        todos={todos}
        toggleSelect={this.toggleSelect}
        toggleComplete={this.toggleComplete}
      />
    );
  };

  render() {
    return (
      <div>
        <h1 className="display-2 text-center mb-5">Stack Todos</h1>
        <Controller
          term={this.state.searchTerm}
          view={this.state.view}
          handleSearch={this.handleSearch}
          handleFilter={this.handleFilter}
          toggleForm={this.toggleForm}
          changeView={this.changeView}
          clearSelected={this.clearSelected}
          clearCompleted={this.clearCompleted}
          reset={this.reset}
        />
        <div>{this.getView()}</div>
        <Modal isOpen={this.state.isOpenTodoForm} toggle={this.toggleForm}>
          <ModalHeader toggle={this.toggleForm}>
            Create New Task Item
          </ModalHeader>
          <ModalBody>
            <CreateTodoForm createTodo={this.createTodo} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Todos;
