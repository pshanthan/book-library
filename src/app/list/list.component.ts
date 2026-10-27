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
@Component({
  selector: 'app-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  constructor(private listService: ListService) {}
  books = signal<Book[]>([]);
  editingId: number | null = null;
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
  onSubmit() {}
}
