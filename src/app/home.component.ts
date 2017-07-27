import { Component } from '@angular/core';

import { BookCard } from './book.card';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    bookCards: BookCard[];

    onSearched(bookCards) {
        this.bookCards = bookCards;
    }
}
