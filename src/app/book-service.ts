import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class BookService implements OnInit {
    googleApiUrl: string;

    constructor(private http: Http) {
        this.googleApiUrl = "https://www.googleapis.com/books/v1/volumes?q=harry%20potter&startIndex=0&maxResults=10&key=AIzaSyCJ2JGaSCgLqiOfaLJW8ul6oVmXc3WTcjw";
    }

    ngOnInit(): void {

    }

    searchBooks(): Observable<any> {
        return this.http.get(this.googleApiUrl)
            .map((res: Response) => {
                console.log('sent');
                return res.json();
            });
    }

}
