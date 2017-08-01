import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

import { BookService } from './services/book.service';
import { BookCard } from './model/book.card';
import { SearchOutput } from './model/search.output';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    providers: [BookService]
})
export class SearchComponent implements OnChanges {
    private searchControl: FormControl;
    @Input() private searchQuery: string;
    @Output() private searchOutput;
    private timer = 0;

    constructor(private bookService: BookService) {
        this.searchControl = new FormControl();
        this.searchControl.valueChanges.subscribe(this.handleSearchInputChange.bind(this));
        this.searchOutput = new EventEmitter<BookCard[]>();
    }

    ngOnChanges() {
        if (this.searchQuery) {
            this.searchControl.setValue(decodeURI(this.searchQuery));
        }
    }

    private handleSearchInputChange(searchInput: string): void {
        this.delaySearching(this.doSearchInputChange.bind(this, searchInput), 400);
    }

    private doSearchInputChange(searchInput: string): void {
        if (searchInput.length > 0) {
            this.bookService.searchBooks(searchInput).subscribe(this.notifyBookSearchSubscribers.bind(this, searchInput));
        } else {
            this.notifyBookSearchSubscribers.call(this, []);
        }
    }

    private delaySearching(callback, ms) {
        clearTimeout(this.timer);
        this.timer = setTimeout(callback, ms);
    }

    private notifyBookSearchSubscribers(searchInput: string, bookCards: BookCard[]): void {
        this.searchOutput.emit(new SearchOutput(bookCards, searchInput));
    }
}
