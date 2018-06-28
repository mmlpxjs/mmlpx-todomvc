/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2018-06-27 20:43
 */

import { Store } from 'mmlpx';
import { action, observable } from 'mobx';
import { Todo } from '../models/Todo';

@Store
export default class TodosStore {

	private uid = 0;

	@observable
	list: Todo[] = [];

	@action
	addTodo(title: string) {
		this.list.push({
			title,
			completed: false,
			id: this.uid++,
		});
	}

	@action
	removeTodo(todo: Todo) {
		this.list.splice(this.list.findIndex(v => todo.id === v.id), 1);
	}

	@action
	updateTodo(todo: Todo) {
		this.list.splice(this.list.findIndex(v => todo.id === v.id), 1, todo);
	}

	@action.bound
	toggleAll(completed: boolean) {
		this.list.forEach(todo => todo.completed = completed);
	}

}
