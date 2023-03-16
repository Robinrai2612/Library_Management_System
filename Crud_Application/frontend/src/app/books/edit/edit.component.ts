import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { find } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Book } from 'src/app/books';
import { BookService } from 'src/app/service/books.service';
import { updateBookaction } from 'src/app/store/books.action';
import { selectAllBook } from 'src/app/store/books.selector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  _id!: string;
  book!: Book;
  isbn!: String;
  title!: String;
  author!: String;
  description!: String;
  published_year!: { type: Number; min: 1945; max: 2019 };
  publisher!: String;
  updated_date!: { type: Date };

  constructor(
    private store: Store<AppState>,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this._id = params['_id'];
    });

   // let x = 0;
    this.store.select(selectAllBook).subscribe((books) => {
      // for (let b of books) {
      //   if (b._id === this._id) break;
      //   x++;
      // }
      const book: Book = books.filter((book) => book._id === this._id)[0];

      this.title = book.title!;
      this.author = book.author!;
      this.isbn = book.isbn!;
      this.description = book.description!;
      this.publisher = book.publisher!;
      this.published_year = <{ type: Number; min: 1945; max: 2019 }>(
      book.published_year!
      );
    });
  }
  //     console.log('inside get Book', books);

  //     // this.title = <string>value.title;
  //     // this.description = <string>value.description;
  //     // this.isbn = <string>value.isbn;
  //     // this.author = <string>value.author;
  //     // this.publisher = <string>value.publisher;
  //     // this.book = value;

  updatebook(): void {
    const reqBody: Book = {
      _id: this._id,
      isbn: this.isbn,
      title: this.title,
      description: this.description,
      author: this.author,
      published_year: this.published_year,
      publisher: this.publisher,
      updated_date: this.updated_date,
    };

    this.bookService.updateBook(reqBody).subscribe((value) => {
      console.log(value);
      this.store.dispatch(updateBookaction({ book: value }));
      this.router.navigateByUrl('/');
    });
  }
}
