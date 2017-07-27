import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchComponent } from './search.component';
import { BookListComponent } from './book.list.component';
import { BookDetailComponent } from './book.detail.component';

const appRoutes: Routes = [
  {
    path: 'detail/:id',
    component: BookDetailComponent,
    data: { id: 'id' }
  },
  {
    path: '',
    component: BookListComponent
  }
];
@NgModule({
    declarations: [
        AppComponent,
        SearchComponent,
        BookListComponent,
        BookDetailComponent
    ],
    imports: [
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
    bootstrap: [AppComponent]
})
export class AppModule { }
