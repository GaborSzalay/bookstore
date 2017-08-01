import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterOutletStubComponent } from './testing/router-stubs';

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent & TestModule', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent, RouterOutletStubComponent
            ]
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(AppComponent);
                comp = fixture.componentInstance;
            });
    }));

    it('can instantiate it', () => {
        expect(comp).not.toBeNull();
    });

    it('can find router-outlet on template', () => {
        const routerOutletDirective = fixture.debugElement.queryAll(By.directive(RouterOutletStubComponent));
        expect(routerOutletDirective[0].name).toEqual('router-outlet');
    });
});
