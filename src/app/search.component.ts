import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

import { BookService } from './book.service';
import { BookCard } from './book.card';
import { SearchOutput } from './search.output';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    providers: [BookService]
})
export class SearchComponent implements OnChanges {
    searchControl: FormControl;
    @Input() searchQuery: string;
    @Output() searchOutput;

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
        if (searchInput.length > 0) {
            this.bookService.searchBooks(searchInput).subscribe(this.notifyBookSearchSubscribers.bind(this, searchInput));
        } else {
            this.notifyBookSearchSubscribers.call(this, []);
        }
    }

    private notifyBookSearchSubscribers(searchInput: string, bookCards: BookCard[]): void {
        this.searchOutput.emit(new SearchOutput(bookCards, searchInput));
    }
}
