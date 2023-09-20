import { ChangeDetectionStrategy, Component, Injector, Input, OnChanges, SimpleChanges, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectComments, selectNextIndex } from '../../store/comment.selectors';
import { addComment, deleteComment, setComments } from '../../store/comment.actions';
import { FormControl } from '@angular/forms';
import { defer, firstValueFrom, switchMap } from 'rxjs';
import { v4 as generateGuid } from 'uuid';
import { Comment } from '../../types/comment.type';
import { toObservable } from '@angular/core/rxjs-interop';
import { PanZoomConfig } from 'ngx-panzoom';
import potpack from 'potpack';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CommentListComponent implements OnChanges {
  @Input() public todoId!: string | undefined;

  public comments$ = defer(() => toObservable(this._todoId, { injector: this._injector }).pipe(switchMap(todoId => this._store.select(selectComments(todoId)))));

  public formControl = new FormControl<string>('');
  public panZoomConfig: PanZoomConfig = new PanZoomConfig();

  private _todoId = signal<string | undefined>(undefined);

  constructor(private _store: Store, private _injector: Injector) { }

  public clear(){
    this.formControl.reset();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['todoId']) {
      this._todoId.set(changes['todoId'].currentValue);
    }
  }

  public removeComment(comment: Comment) {
    this._store.dispatch(deleteComment(comment));
  }

  public async postComment(): Promise<void> {
    const nextIndex = await firstValueFrom(this._store.select(selectNextIndex));
    const comment = {
      todoId: this.todoId ?? '',
      content: this.formControl.value,
      created: new Date(),
      index: nextIndex,
      id: generateGuid(),
      title: null,
      x: 0,
      y: 0,
    };
    this._store.dispatch(addComment(comment));

    this.formControl.reset();

    const comments = await firstValueFrom(this.comments$);
    const boxes = comments.map(comment => {
      const domElement = document.getElementById(comment.id);
      return {
        h: (domElement?.offsetHeight ?? 0) + 20,
        w: (domElement?.offsetWidth ?? 0) + 20,
        x: 0,
        y: 0,
        comment: comment
      }
    });

    potpack(boxes);
    this._store.dispatch(setComments(boxes.map(box => ({ ...box.comment, x: box.x, y: box.y }))));
  }
}
