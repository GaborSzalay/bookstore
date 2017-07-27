import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';

import { BookCard } from './book.card';

@Component({
    selector: 'app-book-list',
    templateUrl: './book.list.component.html',
    styleUrls: ['./book.list.component.scss']
})
export class BookListComponent implements OnChanges {
    @Input() private bookCards: BookCard[];
    @Output() private bookListOutput;
    private bookClickedCounter = 0;

    constructor() {
        this.bookListOutput = new EventEmitter<number>();
    }

    ngOnChanges() {}

    onBookClicked(): void {
        this.bookListOutput.emit(++this.bookClickedCounter);
    }
}
