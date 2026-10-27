import { Component, EventEmitter } from '@angular/core';
import { Book } from '../../Book';
import { Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() book!: Book;
  @Output() delete = new EventEmitter<number>();
}
