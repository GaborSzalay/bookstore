import { SearchHistoryService } from './search.history.service'
import { CookieService } from 'ngx-cookie';


describe('SearchHistoryService', () => {
    const cookieServiceStub = {
        put: null,
        get: null
    } as CookieService;
    let searchHistoryService;
    let putCookieServiceSpy;
    let getCookieServiceSpy;

    beforeEach(() => {
        putCookieServiceSpy = spyOn(cookieServiceStub, 'put');
        getCookieServiceSpy = spyOn(cookieServiceStub, 'get');
        searchHistoryService = new SearchHistoryService(cookieServiceStub);
    });

    describe('storeLastSearchInput', () => {
        it('call cookie service with the encoded input', () => {
            //GIVEN in beforeEach
            //WHEN
            searchHistoryService.storeLastSearchInput('test input');
            //THEN
            expect(putCookieServiceSpy).toHaveBeenCalledWith('lastSearch', 'test%20input');
        });
    });

    describe('retrieveLastSearchInput', () => {
        it('get search input from cookie service', () => {
            //GIVEN
            getCookieServiceSpy.and.returnValue('test input');
            //WHEN
            const lastSearchInput = searchHistoryService.retrieveLastSearchInput();
            //THEN
            expect(getCookieServiceSpy).toHaveBeenCalledWith('lastSearch');
            expect(lastSearchInput).toEqual('test input')
        });
    });
});
