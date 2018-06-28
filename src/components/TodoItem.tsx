/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2018-06-28 14:51
 */

import { bind } from 'lodash-decorators';
import React, { KeyboardEvent } from 'react';
import { Todo } from '../models/Todo';

interface Props {
	todo: Todo;
	editing: boolean;
	onToggle: (todo: Todo) => void;
	onDestroy: (todo: Todo) => void;
	onUpdate: (todo: Todo) => void;
	onEdit: (todo: Todo, editing: boolean) => void;
}

type States = {
	editingText: string;
};

export default class TodoItem extends React.Component<Props, States> {

	state = {
		editingText: this.props.todo.title,
	};

	@bind()
	handleChange(event: any) {
		this.setState({ editingText: event.target.value });
	}

	@bind()
	handleSubmit(todo: Todo) {
		const value = this.state.editingText.trim();
		if (value) {
			if (value !== todo.title) {
				this.props.onUpdate({ ...todo, title: value });
				this.setState({ editingText: value });
			}
			this.props.onEdit(todo, false);
		} else {
			this.props.onDestroy(todo);
		}
	}

	@bind()
	handleKeyDown(event: KeyboardEvent<HTMLInputElement>, todo: Todo) {
		if (event.key === 'Enter') {
			this.handleSubmit(todo);
		} else if (event.key === 'Escape') {
			this.setState({ editingText: todo.title });
			this.props.onEdit(todo, false);
		}

	}

	render() {

		const { todo, editing, onToggle, onDestroy, onEdit } = this.props;
		const { editingText } = this.state;

		return (
			<li className={`${todo.completed ? 'completed' : ''} ${editing ? 'editing' : ''}`}>
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						checked={todo.completed}
						onChange={() => onToggle(todo)}
					/>
					<label onDoubleClick={() => onEdit(todo, true)}>
						{todo.title}
					</label>
					<button className="destroy" onClick={() => onDestroy(todo)}/>
				</div>
				<input
					className="edit"
					value={editingText}
					onBlur={() => this.handleSubmit(todo)}
					onChange={this.handleChange}
					onKeyDown={event => this.handleKeyDown(event, todo)}
				/>
			</li>
		);

	}

}
