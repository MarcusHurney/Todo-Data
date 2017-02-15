import React from 'react';

export const TodoRowHeader = () => {
  return (
    <tr id="todoRowHeader">
      <th>Select</th>
      <th>Title</th>
      <th>Importance</th>
      <th>Creator</th>
      <th className="text-center">Time</th>
      <th className="text-center">Complete</th>
      <th>Description</th>
    </tr>
  );
};
