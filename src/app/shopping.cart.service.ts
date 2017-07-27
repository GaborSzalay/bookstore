import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs/Rx';

import { BookCard } from './book.card';
import { BookDetail } from './book.detail';
import { BookService } from './book.service';

@Injectable()
export class ShoppingCartService {
    private shoppingCartKey = 'shoppingCart';
    constructor(private cookieService: CookieService, private bookService: BookService) {}

    addToShoppingCart(cartItemId: string): void {
        const encodedValue = this.cookieService.get(this.shoppingCartKey);
        if (encodedValue) {
            const cartItems = JSON.parse(window.atob(encodedValue));
            let newItem = true;
            cartItems.forEach(id => {
                if (id === cartItemId) {
                    newItem = false;
                }
            });

            if (newItem) {
                cartItems.push(newItem);
                const encodedItems = window.btoa(JSON.stringify(cartItems))
                this.cookieService.put(this.shoppingCartKey, encodedItems);
            }
        } else {
            const encodedFirstId = window.btoa(JSON.stringify([cartItemId]));
            this.cookieService.put(this.shoppingCartKey, encodedFirstId)
        }
    }

    getShoppingCart(): Observable<BookDetail[]> {
        const encodedValue = this.cookieService.get(this.shoppingCartKey);
        if (!encodedValue) return;

        const ids = JSON.parse(window.atob(encodedValue));
        return this.bookService.getBooks(ids);
    }

}
