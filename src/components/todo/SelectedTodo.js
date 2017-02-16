import React from 'react';

export const SelectedTodo = (props) => {
  if (props.selectedTodos.length) {
    return (
      <div className="selectedTodo blue-background">
        <div className="tableTitleDiv">
          <h1 id="selectedTitle" >{props.selectedTodos.length} item(s) selected</h1>
        </div>
        <div className="tableActionsDiv">
          <i
            id="addIcon"
            className="material-icons grey"
            onClick={props.handleRemove}>delete</i>
        </div>
      </div>
    );
  } else {
    return (
      <div className="selectedTodo">
        <div className="tableTitleDiv">
          <h1 className="tableTitle">Add Todo</h1>
        </div>
        <div className="tableActionsDiv">
          <i
            id="addIcon"
            className="material-icons grey"
            onClick={props.openModal}>add</i>
        </div>
      </div>
    );
  }
};
