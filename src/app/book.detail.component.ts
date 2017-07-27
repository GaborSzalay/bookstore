import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BookDetail } from './book.detail';
import { BookService } from './book.service';
import { SearchHistoryService } from './search.history.service';

@Component({
    selector: 'app-book-detail',
    templateUrl: './book.detail.component.html',
    styleUrls: ['./book.detail.component.scss'],
    providers: [BookService, SearchHistoryService]
})
export class BookDetailComponent implements OnInit, OnDestroy {
    private sub: any;
    private bookDetail: BookDetail;
    private lastSearchedInput: string;

    constructor(private route: ActivatedRoute, private bookService: BookService, private searchHistoryService: SearchHistoryService) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(this.fetchBook.bind(this));
        this.lastSearchedInput = this.searchHistoryService.retrieveLastSearchInput();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private fetchBook(params): void {
        this.bookService.getBook(params['id']).subscribe( bookDetail => {
            this.bookDetail = bookDetail;
        });
    }

    private addToCart(id: string): void {

    }
}
