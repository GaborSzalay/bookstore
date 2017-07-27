import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BookDetail } from './book.detail';
import { BookService } from './book.service';

@Component({
    selector: 'app-book-detail',
    templateUrl: './book.detail.component.html',
    styleUrls: ['./book.detail.component.scss'],
    providers: [BookService]
})
export class BookDetailComponent {
    private sub: any;
    private bookDetail: BookDetail;

    constructor(private route: ActivatedRoute, private bookService: BookService) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(this.fetchBook.bind(this));
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }        

    private fetchBook(params): void {
        this.bookService.getBook(params['id']).subscribe( bookDetail => {
            this.bookDetail = bookDetail;
        });
    }
}
