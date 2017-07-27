import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BookCard } from './book.card';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    private bookCards: BookCard[];
    private searchQuery: string;
    private sub: any;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.sub = this.route.queryParams.subscribe(this.fetchBookCards.bind(this));
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }    

    onSearched(bookCards) {
        this.bookCards = bookCards;
    }

    private fetchBookCards(params): void {
        this.searchQuery = params['query'];
    }    
}
