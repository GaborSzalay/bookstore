import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BookDetail } from './model/book.detail';
import { BookService } from './services/book.service';
import { ShoppingCartService } from './services/shopping.cart.service';

@Component({
    selector: 'app-book-detail',
    templateUrl: './book.detail.component.html',
    styleUrls: ['./book.detail.component.scss'],
    providers: [BookService, ShoppingCartService]
})
export class BookDetailComponent implements OnInit, OnDestroy {
    private sub: any;
    private bookDetail: BookDetail;
    private refreshShoppingCartIcon = false;

    constructor(private route: ActivatedRoute, private bookService: BookService, private shoppingCartService: ShoppingCartService) { }

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
        this.shoppingCartService.addToShoppingCart(id);
        this.refreshShoppingCartIcon = !this.refreshShoppingCartIcon;
    }
}
