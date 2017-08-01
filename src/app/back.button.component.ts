import { Component, OnInit } from '@angular/core';

import { SearchHistoryService } from './search.history.service';

@Component({
    selector: 'app-back-button',
    templateUrl: './back.button.component.html',
    providers: [SearchHistoryService]
})
export class BackButtonComponent implements OnInit {
    private lastSearchedInput: string;

    constructor(private searchHistoryService: SearchHistoryService) { }

    ngOnInit() {
        this.lastSearchedInput = this.searchHistoryService.retrieveLastSearchInput();
    }
}
