import { BookState } from './store/books.state';

export interface AppState {
  readonly library: BookState;
}
