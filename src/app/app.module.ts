import { BrowserModule } from '@angular/platform-browser';
import { CookieModule } from 'ngx-cookie';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { SearchComponent } from './search.component';
import { BookListComponent } from './book.list.component';
import { BookDetailComponent } from './book.detail.component';
import { ShoppingCartComponent } from './shopping.cart.component';
import { BackButtonComponent } from './back.button.component';
import { ShoppingCartIconComponent } from './shopping.cart.icon.component';

import { BookService } from './services/book.service';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'detail/:id',
        component: BookDetailComponent,
        data: { id: 'id' }
    },
    {
        path: 'shopping-cart',
        component: ShoppingCartComponent
    }
];
@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SearchComponent,
        BookListComponent,
        BookDetailComponent,
        ShoppingCartComponent,
        BackButtonComponent,
        ShoppingCartIconComponent
    ],
    imports: [
        CookieModule.forRoot(),
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true }
        ),
        BrowserModule,
        HttpModule,
        JsonpModule,
        FormsModule,
        ReactiveFormsModule
    ],
    bootstrap: [AppComponent],
    providers: [BookService]
})
export class AppModule { }
