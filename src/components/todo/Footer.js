import React from 'react';

export const Footer = () => {
  return (
    <div id="footer">
      <div id="footerArrows">
        <span><i className="material-icons grey">keyboard_arrow_left</i></span>
        <span><i className="material-icons grey">keyboard_arrow_right</i></span>
      </div>
      <div id="footerContent">
        <span>Rows Per Page: 10</span>
        <span>1-10 of 100</span>
      </div>

    </div>
  );
};
