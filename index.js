import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import Redux from 'redux';

import { store } from './todoStore/store.js';

const Todo = ( {onClick, completed, text} ) => (
  <li onClick={onClick} className={ completed ? 'is-todo-complete' : '' }>
    {text}
  </li>
);

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
);

const getVisibleTodos = (
  todos,
  filter
) => {
  switch(filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
  }
}

let nextTodoId = 0;
class TodoApp extends Component {
  render() {
    const {
      todos,
      visibilityFilter
    } = this.props;

    const visibleTodos = getVisibleTodos(todos, visibilityFilter);

    var todoClick = id=>store.dispatch({type: 'TOGGLE_TODO', id});
    var addBtnClick = () => {
      if (this.formInput.value === '') {
        return;
      }
      store.dispatch({
        type: 'ADD_TODO',
        text: this.formInput.value,
        id: nextTodoId++
      });
      this.formInput.value = '';
      this.formInput.focus();
    };

    var links = [
      {name: 'All', filter: 'SHOW_ALL'},
      {name: 'Active', filter: 'SHOW_ACTIVE'},
      {name: 'Completed', filter: 'SHOW_COMPLETED'}
    ];

    return (
      <div>
        <input ref={c=>this.formInput=c} />
        <button onClick={addBtnClick}>Add Todo</button>
        <TodoList todos={visibleTodos} onTodoClick={todoClick} />
        <p>
          Show:
          {links.map(link=>
            <ActiveLink
              isActive={visibilityFilter !== link.filter}
              onClick={() => store.dispatch({
                type: 'SET_VISIBILITY_FILTER',
                filter: link.filter
              })}>{link.name}</ActiveLink>
          )}
        </p>
      </div>
    )
  }
}

const ActiveLink = ( {isActive, onClick, children} ) => {
  var linkClick = function(e) {
    e.preventDefault();
    onClick();
  }

  return (
    <span className="filterLink">
      {isActive ? <a href='#' onClick={linkClick}>{children}</a> : children}
    </span>
  )
}

const render = () => {
  ReactDOM.render(
    <TodoApp
      {...store.getState()}
    />,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();
