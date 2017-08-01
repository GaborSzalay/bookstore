import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';

import { BookCard } from '../model/book.card';
import { BookDetail } from '../model/book.detail';

@Injectable()
export class SearchHistoryService {

    constructor(private cookieService: CookieService) {}

    storeLastSearchInput(searchInput: string): void {
        this.cookieService.put('lastSearch', encodeURI(searchInput));
    }

    retrieveLastSearchInput(): string {
        return this.cookieService.get('lastSearch');
    }

}
