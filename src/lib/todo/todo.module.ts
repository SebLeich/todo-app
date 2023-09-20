import { NgModule, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { RouterModule } from '@angular/router';
import { InputModule } from '../input/input.module';
import { MarkdownEditorModule } from '../markdown-editor/markdown-editor.module';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';
import { StoreModule } from '@ngrx/store';
import { reducer, featureKey } from './store/todo.reducer';
import { Store } from '@ngrx/store';
import { selectTodos } from './store/todo.selectors';
import { Todo } from './types/todo.type';
import { setTodos } from './store/todo.actions';
import { DatabaseModule } from '../database/database.module';
import { DatabaseService } from '../database/services/database.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SortingModule } from '../sorting/sorting.module';
import { CommentModule } from '../comment/comment.module';
import { ITodoLoadingIndicator, TODO_LOADING_INDICATOR } from './interfaces/todo-loading-indicator.interface';
import { lastValueFrom, timer } from 'rxjs';


@NgModule({
  declarations: [
    CreateTodoComponent,
    EditTodoComponent,
    TodoFormComponent,
    TodoListComponent,
  ],
  imports: [
    DragDropModule,

    CommentModule,

    CommonModule,
    ReactiveFormsModule,

    InputModule,
    MarkdownEditorModule,

    DatabaseModule,
    SortingModule,

    StoreModule.forFeature(featureKey, reducer),

    RouterModule.forChild([
      { path: 'create', component: CreateTodoComponent },
      { path: 'modify/:id', component: EditTodoComponent },
      { path: 'list', component: TodoListComponent },
      { path: '**', redirectTo: 'list' }
    ]),
  ],
  providers: [
    { provide: TODO_LOADING_INDICATOR, useExisting: TodoModule }
  ]
})
export class TodoModule implements ITodoLoadingIndicator {
  public todosLoaded = signal(false);
  public todosLoading = signal(false);

  constructor(private _store: Store, private _databaseService: DatabaseService){
    this._initTodos();
  }

  private async _initTodos(): Promise<void> {
    this.todosLoading.set(true);
    await lastValueFrom(timer(1000));

    const todos: Todo[] = await this._databaseService.getAllAsync<Todo>('todos');
    this._store.dispatch(setTodos(todos));
    this.todosLoading.set(false);
    this.todosLoaded.set(true);

    this.todosLoaded();

    this._store.select(selectTodos).subscribe(async todos => await this._databaseService.setDataAsync('todos', todos));
  }
}
