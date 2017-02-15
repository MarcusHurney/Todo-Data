import React from 'react';

export const SelectedTodo = (props) => {
  if (props.selectedTodos.length) {
    return (
      <div className="selectedTodo">
        <div className="tableTitleDiv">
          <h1 className="tableTitle">{props.selectedTodos.length} item(s) selected</h1>
        </div>
        <div className="tableActionsDiv">
          <p onClick={props.handleRemove}>Delete Selected</p>
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
          <p id="plusBtn"onClick={props.openModal}>+</p>
        </div>
      </div>
    );
  }
};
