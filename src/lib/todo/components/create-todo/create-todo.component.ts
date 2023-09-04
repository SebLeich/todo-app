import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TodoFormGroup } from '../../types/todo-form-group.type';
import { Store } from '@ngrx/store';
import { addTodo } from '../../store/todo.actions';
import { Todo } from '../../types/todo.type';
import { Router } from '@angular/router';
import { v4 as generateGuid } from 'uuid';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTodoComponent {
	public formGroup: TodoFormGroup = new FormGroup({
		id: new FormControl<string>('', { nonNullable: true }),
		title: new FormControl<string | null>(null, { validators: Validators.required }),
		description: new FormControl<string | null>(null),
		isCompleted: new FormControl<boolean>(false, { nonNullable: true }),
	});

	constructor(private _store: Store, private _router: Router){ }

	public addTodo(): void {
		if(this.formGroup.invalid){
			return;
		}

		const identifier = generateGuid();
		this.formGroup.patchValue({ id: identifier });

		this._store.dispatch(addTodo(this.formGroup.value as Todo));
		this._router.navigate(['todo/modify', identifier]);
	}
}
