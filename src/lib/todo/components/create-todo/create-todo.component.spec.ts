import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTodoComponent } from './create-todo.component';
import { TodoModule } from '../../todo.module';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreateTodoComponent', () => {
  let component: CreateTodoComponent;
  let fixture: ComponentFixture<CreateTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTodoComponent ],
      imports: [
        StoreModule.forRoot(),
        RouterTestingModule,
        TodoModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
