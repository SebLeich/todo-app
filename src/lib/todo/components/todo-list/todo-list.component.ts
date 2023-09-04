import { Component } from '@angular/core';
import { of } from 'rxjs';
import { Todo } from '../../types/todo.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
	public todos$ = of([
		{ id: '1', title: 'my todo' } as Todo,
		{ id: '2', title: 'another todo' } as Todo
	]);

	constructor(private _router: Router){ }

	public showDetails(todo: Todo): void {
		this._router.navigate(['../edit', todo.id]);
	}
}
