import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectComments } from '../store/comment.selectors';

@Pipe({
  name: 'todoAttachements'
})
export class TodoAttachementsPipe implements PipeTransform {

  constructor(private _store: Store){ }

  public transform(todoId: string): Observable<number> {
    return this._store.select(selectComments(todoId)).pipe(map((comments) => comments.length));
  }

}
