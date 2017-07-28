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
            
            if (this.isNewItem(cartItems, cartItemId)) {
                cartItems.push(cartItemId);
                this.storeIds(cartItems);
            }
        } else {
            this.storeIds([cartItemId]);
        }
    }

    getShoppingCart(): Observable<BookDetail[]> {
        return this.bookService.getBooks(this.getCartIds());
    }

    removeItem(id: string): void {
        const ids = this.getCartIds();

        this.storeIds(ids.filter( currentId => currentId !== id ));
    }

    getShoppingCartSize(): number {
        return this.getCartIds().length;
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
        if (!encodedValue) { return; }

        return JSON.parse(window.atob(encodedValue));
    }

}
