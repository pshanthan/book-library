import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../Book';
@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private httpClient: HttpClient) {}
  apiUrl = 'http://localhost:3000/books';
  getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.apiUrl);
  }
  deleteBook(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
  updateBook(book: Book): Observable<Book> {
    return this.httpClient.put<Book>(`${this.apiUrl}/${book.id}`, book);
  }
  addBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(`${this.apiUrl}`, book);
  }
}
