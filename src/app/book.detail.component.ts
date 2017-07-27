import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';

import { BookDetail } from './book.detail';
import { BookService } from './book.service';

@Component({
    selector: 'app-book-detail',
    templateUrl: './book.detail.component.html',
    styleUrls: ['./book.detail.component.scss'],
    providers: [BookService, CookieService]
})
export class BookDetailComponent {
    private sub: any;
    private bookDetail: BookDetail;

    constructor(private route: ActivatedRoute, private bookService: BookService, private cookieService: CookieService) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(this.fetchBook.bind(this));
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }        

    private fetchBook(params): void {
        this.bookService.getBook(params['id']).subscribe( bookDetail => {
            this.bookDetail = bookDetail;
        });
    }

    private addToCart(id: string): void {
        this.cookieService.put('shoppingCart', id);
    }
}
