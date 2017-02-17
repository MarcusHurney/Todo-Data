import React from 'react';
import { partial } from '../../lib/utils';

export const SelectedTodo = (props) => {
  const openModal = partial(props.openModal, null, 'titleModal');

  if (props.selectedTodos.length) {
    return (
      <div className="selectedTodo blue-background">
        <div className="tableTitleDiv">
          <h1 id="selectedTitle" >{props.selectedTodos.length} item(s) selected</h1>
        </div>
        <div className="tableActionsDiv">
          <i className="addDelIcon material-icons grey"
            onClick={props.handleRemove}>delete</i>
          <i className="material-icons grey">more_vert</i>
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
          <i className="addDelIcon material-icons grey"
            onClick={openModal}>add</i>
          <i className="material-icons grey">more_vert</i>
        </div>
      </div>
    );
  }
};
