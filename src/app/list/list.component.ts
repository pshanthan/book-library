import { Component, OnInit } from '@angular/core';
import { signal } from '@angular/core';
import { Book } from '../../Book';
import { ListService } from '../list.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-list',
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  constructor(private listService: ListService) {}
  books = signal<Book[]>([]);
  ngOnInit(): void {
    this.getBooks();
  }
  getBooks() {
    this.listService.getBooks().subscribe((book) => this.books.set(book));
  }
}
