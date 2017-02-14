import React, { Component, PropTypes } from 'react';
import { partial } from '../../lib/utils';

export class TodoRow extends Component {

  render() {
    const { title, importance, id, selected, creator, time, percentComplete, description } = this.props.todo;

    const handleImportanceChange = partial(this.props.handleImportanceChange, id);
    const handlePercentChange = partial(this.props.handlePercentChange, id);
    const handleToggle = partial(this.props.handleToggle, id);
    const handleTimeChange = partial(this.props.handleTimeChange, id);
    const changeTitle = partial(this.props.changeTitle, id);

    return (
      <tr>
        <td>
          <input
            type="checkbox"
            checked={selected}
            onChange={handleToggle} />
        </td>
        <td>
          <input
            value={title}
            onChange={changeTitle}
          />
        </td>
        <td>
          <select value={importance} onChange={handleImportanceChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </td>
        <td>{creator}</td>
        <td>
          <input
            value={time}
            onChange={handleTimeChange}
          />
          minutes
        </td>
        <td>
          <input
            value={percentComplete}
            onChange={handlePercentChange}
          />
          %
        </td>
        <td>
          <input
            value={description}
          />
        </td>
        <td>Pencil</td>
      </tr>
    )
  }
}

TodoRow.propTypes = {
  handleImportanceChange: PropTypes.func.isRequired
};
