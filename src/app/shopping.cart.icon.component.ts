import { Component, OnInit, Input } from '@angular/core';

import { ShoppingCartService } from './shopping.cart.service';

@Component({
    selector: 'app-shopping-cart-icon',
    templateUrl: './shopping.cart.icon.component.html',
    styleUrls: ['./shopping.cart.icon.component.scss'],
    providers: [ShoppingCartService]
})
export class ShoppingCartIconComponent implements OnInit {
    private numberOfCartItems: number;
    @Input() reverseColor: boolean;
    
    constructor(private shoppingCartService: ShoppingCartService) { }

    ngOnInit() {
        this.numberOfCartItems = this.shoppingCartService.getShoppingCartSize();
    }
}
