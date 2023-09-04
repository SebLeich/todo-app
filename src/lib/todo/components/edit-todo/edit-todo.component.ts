import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TodoFormGroup } from '../../types/todo-form-group.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, startWith, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectTodo } from '../../store/todo.selectors';
import { updateTodo } from '../../store/todo.actions';
import { Todo } from '../../types/todo.type';

@Component({
	selector: 'app-edit-todo',
	templateUrl: './edit-todo.component.html',
	styleUrls: ['./edit-todo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTodoComponent implements OnInit {
	public formGroup: TodoFormGroup = new FormGroup({
		id: new FormControl<string>('', { nonNullable: true }),
		title: new FormControl<string | null>(null),
		description: new FormControl<string | null>(null),
		isCompleted: new FormControl<boolean>(false, { nonNullable: true }),
	});

	public todo$ = this._route.params.pipe(switchMap((params) => this._store.select(selectTodo(params.id))));
	public todoName$ = this.todo$.pipe(map((todo) => todo?.title ?? ''));

	constructor(private _router: Router, private _route: ActivatedRoute, private _store: Store, private _destroyRef: DestroyRef) { }

	public ngOnInit(): void {
		this.todo$
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((todo) => {
				if(!todo){
					this._router.navigate(['/todo/create']);
					return;
				}

				this.formGroup.patchValue(todo, { emitEvent: true });
			});
	}

	public saveTodo(): void {
		this._store.dispatch(updateTodo(this.formGroup.value as Todo));
	}
}
