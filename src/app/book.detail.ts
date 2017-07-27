import { BookCard } from './book.card';

export class BookDetail extends BookCard {
    smallImage: string;

    constructor(bookCard: BookCard) { 
        super()
        this.id = bookCard.id;
        this.title = bookCard.title;
        this.subtitle = bookCard.subtitle;
        this.authors = bookCard.authors;
        this.selfLink = bookCard.selfLink;
        this.thumbnail = bookCard.thumbnail;
    };
}
