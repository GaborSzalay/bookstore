import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs/Rx';

import { BookCard } from '../model/book.card';
import { BookDetail } from '../model/book.detail';
import { BookService } from './book.service';

@Injectable()
export class ShoppingCartService {
    private shoppingCartKey = 'shoppingCart';
    constructor(private cookieService: CookieService, private bookService: BookService) {}

    addToShoppingCart(cartItemId: string): void {
        const encodedValue = this.cookieService.get(this.shoppingCartKey);
        if (encodedValue) {
            const cartItems = JSON.parse(window.atob(encodedValue));

            if (this.isNewItem(cartItems, cartItemId)) {
                cartItems.push(cartItemId);
                this.storeIds(cartItems);
            }
        } else {
            this.storeIds([cartItemId]);
        }
    }

    getShoppingCart(): Observable<BookDetail[]> {
        let result: Observable<BookDetail[]>;
        if (this.getCartIds().length > 0) {
            result = this.bookService.getBooks(this.getCartIds());
        } else {
            result = Observable.throw('Shopping cart is empty.');
        }
        return result;
    }

    removeItem(id: string): void {
        const ids = this.getCartIds();

        this.storeIds(ids.filter( currentId => currentId !== id ));
    }

    getShoppingCartSize(): number {
        return this.getCartIds() ? this.getCartIds().length : 0;
    }

    private isNewItem(ids: string[], newId: string): boolean {
        let newItem = true;

        ids.forEach(id => {
            if (id === newId) {
                newItem = false;
            }
        });

        return newItem;
    }

    private storeIds(ids: string[]): void {
        const encodedItems = window.btoa(JSON.stringify(ids));
        this.cookieService.put(this.shoppingCartKey, encodedItems);
    }

    private getCartIds(): string[] {
        const encodedValue = this.cookieService.get(this.shoppingCartKey);
        if (!encodedValue) { return []; }

        return JSON.parse(window.atob(encodedValue));
    }

}
