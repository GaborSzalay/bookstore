import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';

import { BookCard } from './model/book.card';

@Component({
    selector: 'app-book-list',
    templateUrl: './book.list.component.html',
    styleUrls: ['./book.list.component.scss']
})
export class BookListComponent implements OnChanges {
    @Input() private bookCards: BookCard[];
    @Output() private bookListOutput;

    constructor() {
        this.bookListOutput = new EventEmitter();
    }

    ngOnChanges() {}

    onBookClicked(): void {
        this.bookListOutput.emit();
    }
}
