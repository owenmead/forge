import React from 'react';

export const Todo = ( {onClick, completed, text} ) => (
  <li onClick={onClick} className={ completed ? 'is-todo-complete' : '' }>
    {text}
  </li>
);

export default Todo;
