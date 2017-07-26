import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BookService } from './book.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    providers: [BookService]
})
export class SearchComponent {
    searchControl: FormControl;

    constructor(private bookService: BookService) {
        this.searchControl = new FormControl();
        this.searchControl.valueChanges.subscribe((searchInput: string) => {
            this.bookService.searchBooks(searchInput).subscribe( response  => { console.log(response) });
        });
    }

}
