import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';

import { BookCard } from './book.card';
import { BookDetail } from './book.detail';

@Injectable()
export class ShoppingCartService {

    constructor(private cookieService: CookieService) {}

    addToShoppingCart(cartItem: BookDetail): void {

    }

    getShoppingCart(): BookDetail[] {
        const sampleBookCard = new BookCard;
        sampleBookCard.id = 'sampleId';
        return [new BookDetail(sampleBookCard)];
    }

}
