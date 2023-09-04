import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { TodoFormGroup } from '../../types/todo-form-group.type';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTodoComponent {
	public formGroup: TodoFormGroup = new FormGroup({
		id: new FormControl<string>('', { nonNullable: true }),
		title: new FormControl<string | null>(null),
		description: new FormControl<string | null>(null),
		isCompleted: new FormControl<boolean>(false, { nonNullable: true }),
	});
}
