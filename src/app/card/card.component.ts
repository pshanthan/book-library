import { Component, EventEmitter } from '@angular/core';
import { Book } from '../../Book';
import { Input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() book!: Book;
  @Output() delete = new EventEmitter<number()>
 }
