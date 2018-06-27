/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2018-06-27 20:35
 */

import React from 'react';

export default class TodoApp extends React.Component {

	render() {
		return (
			<div className="todoapp">
				<header className="header">
					<h1>todos</h1>
					{/*<input*/}
					{/*className="new-todo"*/}
					{/*placeholder="What needs to be done?"*/}
					{/*value={this.state.newTodo}*/}
					{/*onKeyDown={this.handleNewTodoKeyDown}*/}
					{/*onChange={this.handleChange}*/}
					{/*autoFocus={true}*/}
					{/*/>*/}
				</header>
			</div>
		);
	}
}
