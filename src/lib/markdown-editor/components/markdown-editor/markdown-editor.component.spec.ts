import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownEditorComponent } from './markdown-editor.component';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule } from '@angular/forms';

describe('MarkdownEditorComponent', () => {
  let component: MarkdownEditorComponent;
  let fixture: ComponentFixture<MarkdownEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarkdownEditorComponent],
      imports: [
        ReactiveFormsModule,
        
        QuillModule.forRoot()
      ]
    });
    fixture = TestBed.createComponent(MarkdownEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
