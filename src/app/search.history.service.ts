import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';

import { BookCard } from './book.card';
import { BookDetail } from './book.detail';

@Injectable()
export class SearchHistoryService {

    constructor(private cookieService: CookieService) {}

    storeLastSearchInput(searchInput: string): void {
        this.cookieService.put('lastSearch', searchInput);
    }

    retrieveLastSearchInput(): string {
        return this.cookieService.get('lastSearch');
    }

}
