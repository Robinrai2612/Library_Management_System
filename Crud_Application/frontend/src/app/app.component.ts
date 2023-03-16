import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { BookService } from './service/books.service';
import { loadDatabase } from './store/books.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
  constructor(
    private store: Store<AppState>,
    private bookservice: BookService
  ) {
    this.bookservice.listBooks().subscribe((books) => {
      this.store.dispatch(loadDatabase({ books: books }));
    });
  }
}
