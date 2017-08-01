import { BookCard } from './book.card';

export class SearchOutput {
    bookCards: BookCard[];
    searchInput: string;

    constructor(bookCards: BookCard[], searchInput: string) {
        this.bookCards = bookCards;
        this.searchInput = searchInput;
    };
}
