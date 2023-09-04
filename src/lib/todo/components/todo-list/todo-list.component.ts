import { ChangeDetectionStrategy, Component } from '@angular/core';
import { of } from 'rxjs';
import { Todo } from '../../types/todo.type';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectTodos } from '../../store/todo.selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
	public todos$ = this._store.select(selectTodos);

	constructor(private _router: Router, private _store: Store){ }

	public showDetails(todo: Todo): void {
		this._router.navigate(['todo/modify', todo.id]);
	}
}
