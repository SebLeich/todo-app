import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFormComponent } from './todo-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { TodoModule } from '../../todo.module';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoFormComponent],
      imports: [
        StoreModule.forRoot(),
        RouterTestingModule,
        TodoModule
      ],
      providers: [
        {
          provide: ControlContainer, useValue: {
            control: new FormGroup({
              id: new FormControl('', { nonNullable: true }),
              index: new FormControl(0, { nonNullable: true }),
              created: new FormControl(new Date(), { nonNullable: true }),
              title: new FormControl<string | null>(null),
              description: new FormControl<string | null>(null),
              isCompleted: new FormControl(false, { nonNullable: true }),
            })
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
