import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BookCard } from './book.card';

@Component({
    selector: 'app-book-detail',
    templateUrl: './book.detail.component.html',
    styleUrls: ['./book.detail.component.scss']
})
export class BookDetailComponent {
    bookCards: BookCard[];
    id: string;
    private sub: any;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }        
}
