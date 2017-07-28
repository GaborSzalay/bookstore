import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { ShoppingCartService } from './shopping.cart.service';

@Component({
    selector: 'app-shopping-cart-icon',
    templateUrl: './shopping.cart.icon.component.html',
    styleUrls: ['./shopping.cart.icon.component.scss'],
    providers: [ShoppingCartService]
})
export class ShoppingCartIconComponent implements OnInit, OnChanges {
    private numberOfCartItems: number;
    @Input('reverseColor') reverseColor: boolean;
    @Input('refreshShoppingCartIcon') refreshShoppingCartIcon: boolean;

    constructor(private shoppingCartService: ShoppingCartService) { }

    ngOnInit() {
        this.numberOfCartItems = this.shoppingCartService.getShoppingCartSize();
    }

    ngOnChanges() {
        this.numberOfCartItems = this.shoppingCartService.getShoppingCartSize();
    }
}
