import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlContainer } from "@angular/forms";
import { TodoFormGroup } from '../../types/todo-form-group.type';

@Component({
	selector: 'app-todo-form',
	templateUrl: './todo-form.component.html',
	styleUrls: ['./todo-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent {
	constructor(private _controlContainer: ControlContainer){ }

	public get formGroup(): TodoFormGroup {
		return this._controlContainer.control as TodoFormGroup;
	}
}
