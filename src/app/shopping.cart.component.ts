import { Component, OnInit } from '@angular/core';

import { BookDetail } from './model/book.detail';
import { ShoppingCartService } from './services/shopping.cart.service';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping.cart.component.html',
    styleUrls: ['./shopping.cart.component.scss'],
    providers: [ShoppingCartService]
})
export class ShoppingCartComponent implements OnInit {
    private bookDetails: BookDetail[];
    private emptyCart = false;

    constructor(private shoppingCartService: ShoppingCartService) { }

    ngOnInit() {
        this.refreshCart();
    }

    removeItem(id: string): void {
        this.shoppingCartService.removeItem(id);
        this.refreshCart();
    }

    private refreshCart(): void {
        this.shoppingCartService.getShoppingCart().subscribe(books => {
            this.bookDetails = books;
        }, error => {
            this.emptyCart = true;
            this.bookDetails = [];
        });
    }
}
