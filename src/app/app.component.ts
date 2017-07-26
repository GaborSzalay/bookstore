import { Component } from '@angular/core';

import { BookCard } from './book.card';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    bookCards: BookCard[];

    onSearched(bookCards) {
        this.bookCards = bookCards;
    }
}
