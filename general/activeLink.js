import React from 'react';

export const ActiveLink = ( {isActive, onClick, children} ) => {
  var linkClick = function(e) {
    e.preventDefault();
    onClick();
  }

  return (
      <span className="filterLink">
        {isActive ?
            <a
                href="#"
                onClick={linkClick}
            >{children}</a>
        : children}
      </span>
  )
}

export default ActiveLink;
