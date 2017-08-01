import { async, ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { BackButtonComponent } from './back.button.component';
import { RouterLinkStubDirective, Router } from './testing/router-stubs';
import { SearchHistoryService } from './services/search.history.service';
import { CookieService } from 'ngx-cookie';

let comp: BackButtonComponent;
let fixture: ComponentFixture<BackButtonComponent>;

const SearchHistoryServiceStub = {
        retrieveLastSearchInput: null
} as SearchHistoryService;

const CookieServiceStub = {
        get: (key) => 'testLastSearchInputValue'
} as CookieService;

describe('BackButtonComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BackButtonComponent, RouterLinkStubDirective
            ],
            providers: [
                { provide: SearchHistoryService, useValue: SearchHistoryServiceStub },
                { provide: CookieService, useValue: CookieServiceStub }
            ]
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(BackButtonComponent);
                comp = fixture.componentInstance;
            });
    }));

    it('can instantiate it', () => {
        expect(comp).not.toBeNull();
    });

    it('call search history service for last search input', fakeAsync(() => {
        comp.ngOnInit();
        fixture.detectChanges();
        expect(fixture.componentInstance.lastSearchedInput).toEqual('testLastSearchInputValue');
    }));
});
