import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import Redux from 'redux';

import { store } from './todoStore/store.js';

const FilterLink = ( {filter, currentFilter, children} ) => {
  var linkClick = function(e) {
    e.preventDefault();
    store.dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter
    });
  }

  var link;
  if (currentFilter === filter) {
    link = children;
  } else {
    link = <a href='#' onClick={linkClick}>{children}</a>
  }

  return (
    <span className="filterLink">{link}</span>
  )
}

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

    return (
      <div>
        <input ref={c=>this.formInput=c} />
        <button onClick={addBtnClick}>Add Todo</button>
        <TodoList todos={visibleTodos} onTodoClick={todoClick} />
        <p>
          Show:
          <FilterLink filter='SHOW_ALL' currentFilter={visibilityFilter}>All</FilterLink>
          <FilterLink filter='SHOW_ACTIVE' currentFilter={visibilityFilter}>Active</FilterLink>
          <FilterLink filter='SHOW_COMPLETED' currentFilter={visibilityFilter}>Completed</FilterLink>
        </p>
      </div>
    )
  }
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
