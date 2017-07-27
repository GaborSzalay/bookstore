import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { BookCard } from './book.card';
import { BookDetail } from './book.detail';

@Injectable()
export class BookService implements OnInit {

    constructor(private http: Http) {}

    ngOnInit(): void {}

    getBook(id: string): Observable<BookDetail> {
        return this.http.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
            .map((res: Response) => {
                const bookDetail: BookDetail = new BookDetail(this.createBookCard(res.json()));
                return bookDetail;
            });
    }    

    searchBooks(searchInput: string): Observable<BookCard[]> {
        return this.http.get(this.getGoogleBooksUrl(searchInput))
            .map((res: Response) => {
                const responseObject: any = res.json();

                return responseObject.totalItems ? responseObject.items.map(this.createBookCard) : [];
            });
    }

    private getGoogleBooksUrl(searchInput: string): string {
        const booksApiKey: string = "AIzaSyCJ2JGaSCgLqiOfaLJW8ul6oVmXc3WTcjw";
        const encodedSearchInput: string = encodeURI(searchInput);
        return `https://www.googleapis.com/books/v1/volumes?q=${encodedSearchInput}&startIndex=0&maxResults=10&key=${booksApiKey}`;
    }

    private createBookCard(item: any): BookCard {
        const bookCard = new BookCard();

        bookCard.id = item.id;
        bookCard.selfLink = item.selfLink;
        bookCard.title = item.volumeInfo.title;
        bookCard.subtitle = item.volumeInfo.subtitle;
        bookCard.authors = item.volumeInfo.authors;

        if (item.volumeInfo.imageLinks) {
            bookCard.thumbnail = item.volumeInfo.imageLinks.smallThumbnail;
        }
        return bookCard;
    }

}
