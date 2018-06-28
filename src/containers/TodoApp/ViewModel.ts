/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2018-06-27 23:07
 */

import { inject, ViewModel } from 'mmlpx';
import { action, computed, observable } from 'mobx';
import { Todo } from '../../models/Todo';
import TodosStore from '../../stores/TodosStore';

type Filter = 'all' | 'active' | 'completed';

@ViewModel
export default class TodoAppViewModel {

	@inject()
	private readonly todosStore: TodosStore;

	@observable
	inputtingTodo = '';

	@observable
	editingTodoId: number | null;

	@observable
	filter: Filter = 'all';

	@computed
	get allCompleted(): boolean {
		return this.todosStore.list.every(todo => todo.completed);
	}

	@computed
	get activeTodos() {
		return this.todosStore.list.filter(todo => !todo.completed);
	}

	@computed
	get completedTodos() {
		return this.todosStore.list.filter(todo => todo.completed);
	}

	@computed
	get visibleTodos() {
		switch (this.filter) {
			case 'all':
				return this.todosStore.list;

			case 'active':
				return this.activeTodos;

			case 'completed':
				return this.completedTodos;
		}
	}

	@action.bound
	changeFilter(filter: Filter) {
		this.filter = filter;
	}

	@action.bound
	onEdit(todo: Todo, editing: boolean) {
		this.editingTodoId = editing ? todo.id : null;
	}

	@action.bound
	onInputChange(changedInput: string) {
		this.inputtingTodo = changedInput.trim();
	}

	@action.bound
	addTodo() {
		if (this.inputtingTodo) {
			this.todosStore.addTodo(this.inputtingTodo);
			this.inputtingTodo = '';
		}
	}

	@action.bound
	removeTodo(todo: Todo) {
		this.todosStore.removeTodo(todo);
	}

	@action.bound
	updateTodo(todo: Todo) {
		this.todosStore.updateTodo(todo);
	}

	@action.bound
	toggleAll() {
		this.todosStore.toggleAll(!this.allCompleted);
	}

	@action.bound
	clearCompleted() {
		const todos = [...this.todosStore.list];
		todos.forEach(todo => {
			if (todo.completed) this.todosStore.removeTodo(todo);
		});
	}

}
