import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TodoFormGroup } from '../../types/todo-form-group.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { firstValueFrom, map, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectTodo } from '../../store/todo.selectors';
import { deleteTodo, updateTodo } from '../../store/todo.actions';
import { Todo } from '../../types/todo.type';
import { showAnimation } from 'src/lib/animations/show-fast.animation';

@Component({
	selector: 'app-edit-todo',
	templateUrl: './edit-todo.component.html',
	styleUrls: ['./edit-todo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [ showAnimation ]
})
export class EditTodoComponent implements OnInit {
	public formGroup: TodoFormGroup = new FormGroup({
		id: new FormControl('', { nonNullable: true }),
		index: new FormControl(0, { nonNullable: true }),
		created: new FormControl(new Date(), { nonNullable: true }),
		title: new FormControl<string | null>(null),
		description: new FormControl<string | null>(null),
		isCompleted: new FormControl(false, { nonNullable: true }),
	});

	public todoId$ = this._route.params.pipe(map((params) => params.id ?? null));
	public todo$ = this._route.params.pipe(switchMap((params) => this._store.select(selectTodo(params.id))));
	public todoName$ = this.todo$.pipe(map((todo) => todo?.title ?? ''));

	constructor(private _router: Router, private _route: ActivatedRoute, private _store: Store, private _destroyRef: DestroyRef, private _changeDetectorRef: ChangeDetectorRef) { }

	public async deleteTodo(): Promise<void> {
		const todo = await firstValueFrom(this.todo$);
		if(!todo){
			return;
		}

		this._store.dispatch(deleteTodo(todo));
		this._router.navigate(['todo/list']);
	}

	public ngOnInit(): void {
		this.todo$
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((todo) => {
				if(!todo){
					return;
				}

				this.formGroup.patchValue(todo, { emitEvent: true });
				this._changeDetectorRef.detectChanges();
			});
	}

	public saveTodo(): void {
		this._store.dispatch(updateTodo(this.formGroup.value as Todo));
	
		this._router.navigate(['todo/list']);
	}
}
