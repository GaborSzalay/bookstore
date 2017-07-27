import { Component, Input, OnChanges } from '@angular/core';

import { BookCard } from './book.card';

@Component({
    selector: 'app-book-list',
    templateUrl: './book.list.component.html',
    styleUrls: ['./book.list.component.scss']
})
export class BookListComponent implements OnChanges {
    @Input() bookCards: BookCard[];

    ngOnChanges() {

    }
}
