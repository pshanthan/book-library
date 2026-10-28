import { Component, OnInit } from '@angular/core';
import { signal } from '@angular/core';
import { Book } from '../../Book';
import { ListService } from '../list.service';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-list',
  imports: [CommonModule, ReactiveFormsModule, CardComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  constructor(private listService: ListService) {}
  books = signal<Book[]>([]);
  editingId: number | null = null;
  searchControl = new FormControl('', { nonNullable: true });
  bookForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    author: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    pages: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    publishedDate: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    read: new FormControl(false, {
      nonNullable: true,
      validators: Validators.required,
    }),
  });
  ngOnInit(): void {
    this.getBooks();
  }
  getBooks() {
    this.listService.getBooks().subscribe((book) => this.books.set(book));
  }
  startEdit(b: Book) {
    this.editingId = b.id ?? null;
    this.bookForm.patchValue({
      title: b.title,
      author: b.author,
      pages: String(b.pages),
      publishedDate: b.publishedDate,
      read: b.read,
    });
  }
  onSubmit() {
    const raw = this.bookForm.getRawValue();
    const transformedBook: Book = {
      title: raw.title,
      author: raw.author,
      pages: Number(raw.pages),
      publishedDate: raw.publishedDate,
      read: raw.read,
    };
    if (this.editingId) {
      transformedBook.id = this.editingId;
      this.listService.updateBook(transformedBook).subscribe((updated) => {
        this.books.update((list) =>
          list.map((b) => (b.id === updated.id ? updated : b)),
        );
      });
    } else {
      this.listService.addBook(transformedBook).subscribe((created) => {
        this.books.update((list) => [...list, created]);
      });
    }
    this.editingId = null;
    this.bookForm.reset();
  }
  deleteBook(id: number) {
    this.listService.deleteBook(id).subscribe(() => {
      this.books.update((list) => list.filter((b) => b.id !== id));
    });
  }
}
