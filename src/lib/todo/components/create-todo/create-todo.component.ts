import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { TodoFormGroup } from '../../types/todo-form-group.type';
import { Store } from '@ngrx/store';
import { addTodo } from '../../store/todo.actions';
import { Todo } from '../../types/todo.type';
import { Router } from '@angular/router';
import { v4 as generateGuid } from 'uuid';
import { firstValueFrom } from 'rxjs';
import { selectNextIndex } from '../../store/todo.selectors';
import { showAnimation } from 'src/lib/animations/show.animation';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [showAnimation],
})
export class CreateTodoComponent {
	public formGroup: TodoFormGroup = new FormGroup({
		id: new FormControl('', { nonNullable: true }),
		index: new FormControl(0, { nonNullable: true }),
		created: new FormControl(new Date(), { nonNullable: true }),
		title: new FormControl<string | null>(null),
		description: new FormControl<string | null>(null),
		isCompleted: new FormControl(false, { nonNullable: true }),
	});

	constructor(private _store: Store, private _router: Router){ }

	public async addTodo(): Promise<void> {
		if(this.formGroup.invalid){
			return;
		}

		const id = generateGuid(), 
			index = await firstValueFrom(this._store.select(selectNextIndex));

		this.formGroup.patchValue({ id, index });

		this._store.dispatch(addTodo(this.formGroup.value as Todo));
		this._router.navigate(['todo/list']);
	}
}
