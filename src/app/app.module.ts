import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { DATABASE_CONFIG } from 'src/lib/database/constants/database-config.injection-token';
import { Todo } from 'src/lib/todo/types/todo.type';
import { Comment } from 'src/lib/comment/types/comment.type';
import { NavbarModule } from 'src/lib/navbar/navbar.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,

    NavbarModule,

    StoreModule.forRoot()
  ],
  providers: [{
    provide: DATABASE_CONFIG,
    useValue: {
      'comments': (['id', 'index','created', 'content'] as (keyof Comment)[]).join(','),
      'todos': (['id', 'index','created','description','isCompleted','title'] as (keyof Todo)[]).join(','),
    }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
