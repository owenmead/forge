import React from 'react';
import ReactDOM from 'react-dom';

import { store } from './todoStore/store.js';
import { TodoApp } from './todos/TodoApp.js'

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
