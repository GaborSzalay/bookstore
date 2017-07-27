import { Component, OnInit } from '@angular/core';

import { BookDetail } from './book.detail';
import { ShoppingCartService } from './shopping.cart.service';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping.cart.component.html',
    styleUrls: ['./shopping.cart.component.scss'],
    providers: [ShoppingCartService]
})
export class ShoppingCartComponent implements OnInit {
    private bookDetails: BookDetail[];

    constructor(private shoppingCartService: ShoppingCartService) { }

    ngOnInit() {
        this.bookDetails = this.shoppingCartService.getShoppingCart();
    }
}
