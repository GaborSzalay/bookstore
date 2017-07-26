import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {
    searchControl: FormControl;

    constructor() {
        this.searchControl = new FormControl();
        this.searchControl.valueChanges.subscribe((value) => {
            console.log('changed: ' + value)
        });
    }

}
