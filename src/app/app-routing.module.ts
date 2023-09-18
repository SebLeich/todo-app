import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'todo', loadChildren: () => import('../lib/todo/todo.module').then(module => module.TodoModule) },
  { path: '**', redirectTo: 'todo' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
