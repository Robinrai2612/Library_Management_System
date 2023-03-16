import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BookService } from 'src/app/service/books.service';
import { addBookaction } from 'src/app/store/books.action';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  title!: string;
  description!: string;
  isbn!: String;
  author!: String;
  published_year!: { type: Number; min: 1945; max: 2019 };
  publisher!: String;
  updated_date!: { type: Date };

  constructor(
    private store: Store,
    private bookService: BookService,
    private router: Router
  ) {}

  onSubmit(): void {
    const reqBody = {
      title: this.title,
      description: this.description,
      isbn: this.isbn,
      author: this.author,
      published_year: this.published_year,
      publisher: this.publisher,
    };
    this.bookService.addBook(reqBody).subscribe((value: any) => {
      this.store.dispatch(addBookaction({ book: value }));
    });

    this.router.navigate(['/']);
  }
}
