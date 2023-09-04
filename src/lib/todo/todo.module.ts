import { NgModule } from '@angular/core';
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
import { reducer as TodoReducer } from './store/todo.reducer';



@NgModule({
  declarations: [
    CreateTodoComponent,
    EditTodoComponent,
    TodoFormComponent,
    TodoListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    InputModule,
    MarkdownEditorModule,

    StoreModule.forFeature('todo', TodoReducer),

    RouterModule.forChild([
      { path: 'create', component: CreateTodoComponent },
      { path: 'edit/:id', component: EditTodoComponent },
      { path: 'list', component: TodoListComponent },
    ]),
  ]
})
export class TodoModule { }
