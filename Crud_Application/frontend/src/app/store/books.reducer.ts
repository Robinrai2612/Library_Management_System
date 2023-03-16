import { createReducer, on } from '@ngrx/store';
import {
  addBookaction,
  deleteBookaction,
  loadDatabase,
  updateBookaction,
} from './books.action';
import { BookState } from './books.state';

export const initialState: BookState = {
  books: [],
};

export const bookreducer = createReducer(
  initialState,
  on(addBookaction, (state, { book }) => ({
    ...state,
    books: [...state.books, book],
  })),

  on(updateBookaction, (state, { book }) => {
    console.log(book);
    const library = [...state.books];
    const tempbooks = library.filter((n) => n._id !== book._id);
    console.log(...tempbooks, book);
    return {
      ...state,
      books: [...tempbooks, book],
    };
  }),

  on(deleteBookaction, (state, { bookId }) => ({
    ...state,
    books: state.books.filter((i) => i._id !== bookId),
  })),
  on(loadDatabase, (state, { books }) => {
    return {
      ...state,
      books: books,
    };
  })
);
