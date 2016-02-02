import React from 'react';

export const Todo = ( {onClick, completed, text} ) => (
    <li
        className={completed ? 'is-todo-complete' : ''}
        onClick={onClick}
    >
        {text}
    </li>
);

export default Todo;
