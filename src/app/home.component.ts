import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BookCard } from './book.card';
import { SearchOutput } from './search.output';
import { SearchHistoryService } from './services/search.history.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    providers: [SearchHistoryService]
})
export class HomeComponent implements OnInit, OnDestroy {
    private bookCards: BookCard[];
    private searchQuery: string;
    private searchInput: string;
    private sub: any;

    constructor(private route: ActivatedRoute, private searchHistoryService: SearchHistoryService) {
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
        this.searchHistoryService.storeLastSearchInput(this.searchInput);
    }

    private fetchBookCards(params): void {
        this.searchQuery = params['query'];
    }
}
