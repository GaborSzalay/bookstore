import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { BookService } from './book.service';
import { BookCard } from './book.card';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    providers: [BookService]
})
export class SearchComponent {
    searchControl: FormControl;
    @Output() searchOutput;

    constructor(private bookService: BookService) {
        this.searchControl = new FormControl();
        this.searchControl.valueChanges.subscribe(this.handleSearchInputChange.bind(this));
        this.searchOutput = new EventEmitter<BookCard[]>();
    }

    private handleSearchInputChange(searchInput: string): void {
        if (searchInput.length > 0) {
            this.bookService.searchBooks(searchInput).subscribe(this.notifyBookSearchSubscribers.bind(this));
        } else {
            this.notifyBookSearchSubscribers.call(this, []);
        }
    }

    private notifyBookSearchSubscribers(bookCards: BookCard[]): void {
        this.searchOutput.emit(bookCards);
    }
}
