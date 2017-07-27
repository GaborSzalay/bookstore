import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BookCard } from './book.card';
import { SearchOutput } from './search.output';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    private bookCards: BookCard[];
    private bookClicked: number;
    private searchQuery: string;
    private searchInput: string;
    private sub: any;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.sub = this.route.queryParams.subscribe(this.fetchBookCards.bind(this));
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }    

    onSearched(searchOutput: SearchOutput) {
        this.bookCards = searchOutput.bookCards;
        this.searchInput = searchOutput.searchInput;
    }

    onBookClicked() {
        console.log(this.searchInput);
    }

    private fetchBookCards(params): void {
        this.searchQuery = params['query'];
    }    
}
