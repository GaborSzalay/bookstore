import { ShoppingCartService } from './shopping.cart.service'
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs/Rx';
import { BookService } from './book.service';
import { BookDetail } from './book.detail';

describe('shoppingCartService', () => {
    const cookieServiceStub = {
        put: null,
        get: null
    } as CookieService;
    const bookServiceStub = {
        getBooks: null
    } as BookService;

    let shoppingCartService;
    let putCookieServiceSpy;
    let getCookieServiceSpy;
    let getBookServiceSpy;

    beforeEach(() => {
        putCookieServiceSpy = spyOn(cookieServiceStub, 'put');
        getCookieServiceSpy = spyOn(cookieServiceStub, 'get');
        getBookServiceSpy = spyOn(bookServiceStub, 'getBooks');
        shoppingCartService = new ShoppingCartService(cookieServiceStub, bookServiceStub);
    });

    describe('addToShoppingCart', () => {
        it('should store the first id', () => {
            // GIVEN
            getCookieServiceSpy.and.returnValue(undefined);
            // WHEN
            shoppingCartService.addToShoppingCart('test id');
            // THEN
            expect(getCookieServiceSpy).toHaveBeenCalledWith('shoppingCart');
            expect(putCookieServiceSpy).toHaveBeenCalledWith('shoppingCart', 'WyJ0ZXN0IGlkIl0=');
        });

        it('should add a new id to the list of existing ids', () => {
            // GIVEN
            getCookieServiceSpy.and.returnValue('WyJ3SGxEekhudDZ4MEMiXQ');
            // WHEN
            shoppingCartService.addToShoppingCart('test id');
            // THEN
            expect(getCookieServiceSpy).toHaveBeenCalledWith('shoppingCart');
            expect(putCookieServiceSpy).toHaveBeenCalledWith('shoppingCart', 'WyJ3SGxEekhudDZ4MEMiLCJ0ZXN0IGlkIl0=');
        });

        it('should not add an existing id to the list of ids', () => {
            // GIVEN
            getCookieServiceSpy.and.returnValue('WyJ0ZXN0IGlkIl0=');
            // WHEN
            shoppingCartService.addToShoppingCart('test id');
            // THEN
            expect(getCookieServiceSpy).toHaveBeenCalledWith('shoppingCart');
            expect(putCookieServiceSpy).not.toHaveBeenCalled();
        });
    });

    describe('getShoppingCart', () => {
        it('should retrieve the non-empty shopping cart', () => {
            // GIVEN
            const bookServiceObservable = {} as Observable<BookDetail[]>;
            getCookieServiceSpy.and.returnValue('WyJ0ZXN0IGlkIl0=');
            getBookServiceSpy.and.returnValue(bookServiceObservable);
            // WHEN
            const actualShoppingCartObservable = shoppingCartService.getShoppingCart();
            // THEN
            expect(getCookieServiceSpy).toHaveBeenCalledWith('shoppingCart');
            expect(getBookServiceSpy).toHaveBeenCalledWith([ 'test id' ]);
            expect(actualShoppingCartObservable).toBe(bookServiceObservable);
        });

        it('should throw error in case of empty shopping cart', () => {
            // GIVEN
            getCookieServiceSpy.and.returnValue(undefined);
            // WHEN
            const actualShoppingCartObservable = shoppingCartService.getShoppingCart();
            // THEN
            expect(getCookieServiceSpy).toHaveBeenCalledWith('shoppingCart');
            expect(actualShoppingCartObservable.error).toEqual('Shopping cart is empty.');
        });
    });

    describe('removeItem', () => {
        it('should remove the given id from the existing ones', () => {
            // GIVEN
            getCookieServiceSpy.and.returnValue('WyJ3SGxEekhudDZ4MEMiLCJ0ZXN0IGlkIl0=');
            // WHEN
            shoppingCartService.removeItem('test id');
            // THEN
            expect(getCookieServiceSpy).toHaveBeenCalledWith('shoppingCart');
            expect(putCookieServiceSpy).toHaveBeenCalledWith('shoppingCart', 'WyJ3SGxEekhudDZ4MEMiXQ==');
        });
    });
});
