import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { BookState } from './books.state';

export const selectBooks = (state: AppState) => state.library;

export const selectAllBook = createSelector(
  selectBooks,
  (state: BookState) => state.books
);

