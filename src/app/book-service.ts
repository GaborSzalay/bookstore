import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { BookCard } from './book-card';

@Injectable()
export class BookService implements OnInit {
    googleApiUrl: string;

    constructor(private http: Http) {
        this.googleApiUrl = "https://www.googleapis.com/books/v1/volumes?q=harry%20potter&startIndex=0&maxResults=10&key=AIzaSyCJ2JGaSCgLqiOfaLJW8ul6oVmXc3WTcjw";
    }

    ngOnInit(): void {

    }

    searchBooks(searchInput: string): Observable<BookCard[]> {
        return this.http.get(this.googleApiUrl)
            .map((res: Response) => {
                return res.json().items.map(this.createBookCard);
            });
    }

    createBookCard(item: any): BookCard {
        const bookCard = new BookCard();

        bookCard.id = item.id;
        bookCard.selfLink = item.selfLink;
        bookCard.title = item.volumeInfo.title;
        bookCard.subtitle = item.volumeInfo.subtitle;
        bookCard.authors = item.volumeInfo.authors;
        bookCard.thumbnail = item.volumeInfo.imageLinks.smallThumbnail;
        return bookCard;
    }

}
