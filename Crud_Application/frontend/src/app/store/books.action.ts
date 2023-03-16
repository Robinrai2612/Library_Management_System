import { createAction, props } from '@ngrx/store';
import { Book } from '../books';
export const addBookaction = createAction(
  '[ADD_BOOK] Add Book',
  props<{ book: Book }>()
);
export const updateBookaction = createAction(
  '[UPDATE_BOOK] Update Book',
  props<{ book: Book }>()
);
export const deleteBookaction = createAction(
  '[DELETE_BOOK] Delete Book',
  props<{ bookId: string }>()
);
export const loadDatabase = createAction(
  '[LOAD DB TO STORE] App Component',
  props<{ books: Book[] }>()
);
