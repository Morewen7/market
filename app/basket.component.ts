import { Component } from '@angular/core';
import { HomeComponent, Item } from './home.component';
import { BasketService } from '../../src/app/service/basket.service';

@Component({
    selector: 'basket-app',
    styles: [`
        h3 {
            color: green;
        }
        li {
            color: green;
        }
    `],
    template: `
        <h3>Корзина</h3>
        <ul>
            <li *ngFor="let item of basketItems">
                {{ item.purchase }} - {{ item.price }}
            </li>
        </ul>
    `,
    providers: [HomeComponent]
})

export class BasketComponent { 
    basketItems: Item[] = [];

    constructor(private basketService: BasketService) {
        this.basketItems = basketService.basketItems;
      }
}