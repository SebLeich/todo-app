import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TodoFormGroup } from '../../types/todo-form-group.type';
import { startWith, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectTodo } from '../../store/todo.selectors';

@Component({
	selector: 'app-edit-todo',
	templateUrl: './edit-todo.component.html',
	styleUrls: ['./edit-todo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTodoComponent {
	public formGroup: TodoFormGroup = new FormGroup({
		id: new FormControl<string>('', { nonNullable: true }),
		title: new FormControl<string | null>(null),
		description: new FormControl<string | null>(null),
		isCompleted: new FormControl<boolean>(false, { nonNullable: true }),
	});

	public todo$ = this._route.params.pipe(switchMap((params) => this._store.select(selectTodo(params.id))));
	public todoName$ = this.formGroup.controls.title.valueChanges.pipe(startWith(this.formGroup.controls.title.value));

	constructor(private _route: ActivatedRoute, private _store: Store) { }


}