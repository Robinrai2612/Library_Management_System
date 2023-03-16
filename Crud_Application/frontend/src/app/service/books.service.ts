import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_BOOK, LIST_BOOK } from '../graphql/graphql.queries';
import { Observable, map } from 'rxjs';
import { Book } from '../books';
import {
  ADD_BOOK,
  DELETE_BOOK,
  UPDATE_BOOK,
} from '../graphql/graphql.mutation';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  deleteBookaction(_id: any) {
    throw new Error('Method not implemented.');
  }
  addBookaction(reqBody: {
    title: string;
    description: string;
    isbn: String;
    author: String;
    published_year: { type: Number; min: 1945; max: 2019 };
    publisher: String;
  }) {
    throw new Error('Method not implemented.');
  }
  constructor(private apollo: Apollo) {}

  listBooks(): Observable<Book[]> {
    return this.apollo.query({ query: LIST_BOOK }).pipe(
      map((result: any) => {
        return result.data.books;
      })
    );
  }

  getBookById(id: string): Observable<Book> {
    console.log('inside get Book of service', id);
    return this.apollo
      .query({
        query: GET_BOOK,
        variables: {
          id,
        },
      })
      .pipe(
        map((result: any) => {
          console.log('bhbhewfhrkrgbrbvk.rbvkfsvbscjvbsvblfwvb', result);
          return result.data.book;
        })
      );
  }

  addBook(reqBody: Book): Observable<Book> {
    return this.apollo
      .mutate({
        mutation: ADD_BOOK,
        variables: {
          isbn: reqBody.isbn,
          title: reqBody.title,
          author: reqBody.author,
          description: reqBody.description,
          published_year: reqBody.published_year,
          publisher: reqBody.publisher,
        },
      })
      .pipe(
        map((result: any) => {
          console.log(result.data.addBook);
          return result.data.addBook;
        })
      );
  }

  updateBook(reqBody: Book): Observable<Book> {
    return this.apollo
      .mutate({
        mutation: UPDATE_BOOK,
        variables: {
          id: reqBody._id,
          isbn: reqBody.isbn,
          title: reqBody.title,
          author: reqBody.author,
          description: reqBody.description,
          published_year: reqBody.published_year,
          publisher: reqBody.publisher,
        },
      })
      .pipe(
        map((result: any) => {
          return result.data.updateBook;
        })
      );
  }

  deleteBook(id: String): Observable<Book> {
    console.log('bksbfjhfbhfbhbghbgkglaslkbegbfeje', id);
    return this.apollo
      .mutate({
        mutation: DELETE_BOOK,
        variables: {
          id,
        },
      })
      .pipe(
        map((result: any) => {
          return result.data.removeBook;
        })
      );
  }
}
