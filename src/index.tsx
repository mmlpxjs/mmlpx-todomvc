/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2018-06-27 20:32
 */

import React from 'react';
import ReactDOM from 'react-dom';
import 'todomvc-app-css/index.css';
import 'todomvc-common/base.css';
import TodoApp from './TodoApp';

ReactDOM.render(
	<TodoApp/>,
	document.body.querySelector('main'),
);
