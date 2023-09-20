import { createAction } from '@ngrx/store';
import { Comment } from '../types/comment.type';

export const addComment = createAction(
    '[Comment] Add comment',
    (comment: Comment) => ({ comment })
);

export const deleteComment = createAction(
    '[Comment] Delete comments',
    (comment: Comment) => ({ comment })
);

export const setComments = createAction(
    '[Comment] Set comments',
    (comments: Comment[]) => ({ comments })
);

export const updateComment = createAction(
    '[Comment] Update comment',
    (comment: Comment) => ({ comment })
);
