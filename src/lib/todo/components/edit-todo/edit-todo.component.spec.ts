import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTodoComponent } from './edit-todo.component';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { TodoModule } from '../../todo.module';

describe('EditTodoComponent', () => {
  let component: EditTodoComponent;
  let fixture: ComponentFixture<EditTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTodoComponent ],
      imports: [
        StoreModule.forRoot(),
        RouterTestingModule,
        TodoModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
