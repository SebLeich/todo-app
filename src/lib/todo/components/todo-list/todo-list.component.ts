import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Todo } from '../../types/todo.type';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectTodos } from '../../store/todo.selectors';
import { deleteTodo, setTodos } from '../../store/todo.actions';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { firstValueFrom } from 'rxjs';
import { SortingService } from 'src/lib/sorting/services/sorting.service';
import { ITodoLoadingIndicator, TODO_LOADING_INDICATOR } from '../../interfaces/todo-loading-indicator.interface';
import { showAnimation } from 'src/lib/animations/show.animation';

@Component({
	selector: 'app-todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [ showAnimation ]
})
export class TodoListComponent {
	public todos$ = this._store.select(selectTodos);

	constructor(@Inject(TODO_LOADING_INDICATOR) public todoLoadingIndicator: ITodoLoadingIndicator, private _router: Router, private _store: Store, private _sortingService: SortingService) { }

	public deleteTodo(todo: Todo): void {
		this._store.dispatch(deleteTodo(todo));
	}

	public async drop({ currentIndex, previousIndex }: { currentIndex: number, previousIndex: number, item: CdkDrag<Todo> }) {
		const sortedTodos = await firstValueFrom(this._store.select(selectTodos));
		const todos = this._sortingService.sort(sortedTodos, previousIndex, currentIndex);

		this._store.dispatch(setTodos(todos));
	}

	public showDetails(todo: Todo): void {
		this._router.navigate(['todo/modify', todo.id]);
	}
}
