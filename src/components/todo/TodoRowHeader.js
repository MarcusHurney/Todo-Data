import React from 'react';

export const TodoRowHeader = () => {
  return (
    <tr id="todoRowHeader">
      <th>
        <input
          className="regular-checkbox"
          type="checkbox"
          checked={false} />
      </th>
      <th>Title</th>
      <th>Importance</th>
      <th>Creator</th>
      <th className="text-center">Time (hrs)</th>
      <th className="text-center">Complete (%)</th>
      <th><i id="descriptionIcon" className="material-icons sm-13 grey">chat</i> Description</th>
    </tr>
  );
};
