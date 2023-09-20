import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { Store, StoreModule } from '@ngrx/store';
import { featureKey, reducer } from './store/comment.reducer';
import { DatabaseService } from '../database/services/database.service';
import { setComments } from './store/comment.actions';
import { selectComments } from './store/comment.selectors';
import { Comment } from './types/comment.type';
import { InputModule } from '../input/input.module';
import { MarkdownEditorModule } from '../markdown-editor/markdown-editor.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgLetModule } from 'ng-let';
import { NgxPanZoomModule } from 'ngx-panzoom';
import { TodoAttachementsPipe } from './pipes/todo-attachements.pipe';



@NgModule({
  declarations: [
    CommentListComponent,
    TodoAttachementsPipe
  ],
  exports: [
    CommentListComponent,
    TodoAttachementsPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgLetModule,
    NgxPanZoomModule,

    InputModule,
    MarkdownEditorModule,

    StoreModule.forFeature(featureKey, reducer),
  ]
})
export class CommentModule {
  constructor(private _store: Store, private _databaseService: DatabaseService){
    this._initComments();
  }

  private async _initComments(): Promise<void> {
    const comments: Comment[] = await this._databaseService.getAllAsync<Comment>('comments');
    this._store.dispatch(setComments(comments));
    this._store.select(selectComments()).subscribe(async comments => await this._databaseService.setDataAsync('comments', comments));
  }
}
