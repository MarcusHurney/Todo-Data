import React from 'react';

export const SelectedTodo = (props) => {
  if (props.selectedTodos.length) {
    return (
      <div>
        <h1>{props.selectedTodos.length} items selected</h1>
        <h1 onClick={props.handleRemove}>Delete Selected</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Add Todo</h1>
        <h1 onClick={props.openModal}>+</h1>
      </div>
    );
  }
};
