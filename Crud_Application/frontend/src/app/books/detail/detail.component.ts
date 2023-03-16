import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Book } from 'src/app/books';
import { BookService } from 'src/app/service/books.service';
import { deleteBookaction } from 'src/app/store/books.action';
import { selectAllBook } from 'src/app/store/books.selector';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  books: Book[] = [];
  constructor(
    private bookService: BookService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {}

  books$: Observable<Book[]> = this.store.select(selectAllBook);

  editBook(book: any) {
    this.router.navigate(['/edit'], {
      queryParams: {
        _id: book._id,
      },
    });
  }

  deleteBook(_id: string) {
    this.bookService.deleteBook(_id).subscribe((value) => {
        //console.log(value._id);
        this.store.dispatch(deleteBookaction({ bookId: value._id! }));
      });
  }
}
