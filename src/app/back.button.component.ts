import { Component, OnInit } from '@angular/core';

import { SearchHistoryService } from './services/search.history.service';

@Component({
    selector: 'app-back-button',
    templateUrl: './back.button.component.html',
    styleUrls: ['./back.button.component.scss'],
    providers: [SearchHistoryService]
})
export class BackButtonComponent implements OnInit {
    lastSearchedInput: string;

    constructor(private searchHistoryService: SearchHistoryService) { }

    ngOnInit() {
        this.lastSearchedInput = this.searchHistoryService.retrieveLastSearchInput();
    }
}
