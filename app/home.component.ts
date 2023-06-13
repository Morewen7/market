import { Component, ViewChild, ElementRef } from '@angular/core';
import { BasketService } from '../../src/app/service/basket.service';

export class Item {
    purchase: string;
    done: boolean;
    price: number;

    constructor(purchase: string, price: number) {
        this.purchase = purchase;
        this.price = price;
        this.done = false;
    }
}

@Component({
    selector: 'home-app',
    styles: [
      `
        .slide {
          max-width: 50pf;
        }
  
        .card-title {
          font-size: 1.2rem;
          font-weight: bold;
        }
  
        .card-text {
          font-size: 1.1rem;
        }
  
        .form-check-label {
          font-size: 1.1rem;
        }
  
        .is-valid {
          border-color: green !important;
        }
      `
    ],
    template: `
      <div class="page-header">
        <h1> Список покупок </h1>
      </div>
  
      <form (ngSubmit)="addItem()" #itemForm="ngForm">

        <div class="form-group">
            <label for="purchase">Название товара:</label>
            <input type="text" class="form-control" id="purchase" name="purchase" [(ngModel)]="text" required
                #purchaseInput (ngModelChange)="isNameValid = purchaseInput.value.trim().length > 0" [ngClass]="{'is-valid': isNameValid}">
            <div [hidden]="isNameValid" class="alert alert-danger">
                Название товара обязательно для заполнения
            </div>
        </div>

        <div class="form-group">
            <label for="price">Цена:</label>
            <input type="number" class="form-control" id="price" name="price" [(ngModel)]="price" required min="1">
            <div [hidden]="itemForm.controls.price.valid" class="alert alert-danger">
                Цена обязательна для заполнения
            </div>
        </div>

        <button type="submit" class="btn btn-primary" [disabled]="!itemForm.form.valid">Добавить товар</button>

      </form>
  
      <div *ngFor="let item of items" [highlight]="item.done" class="slide">
        <img src="/assets/image/1.jpg" class="card-img-top" alt="..." />
        <h5 class="card-title">{{ item.purchase }}</h5>
        <p class="card-text">Цена: {{ item.price }}</p>
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="{{ item.purchase }}"
            [(ngModel)]="item.done"
            (click)="toggleDone(item)"
          />
          <label class="form-check-label" for="{{ item.purchase }}">Добавить в корзину</label>
        </div>
      </div>
  
      <button (click)="addToBasket()">Добавить выбранные товары в корзину</button>
    `,
  })
export class HomeComponent {
    @ViewChild('purchaseInput') purchaseInput: ElementRef;

    text: string = '';
    price: number = null;
    isNameValid: boolean = false;

    items: Item[] =
    [
        { purchase: "Хлеб", done: false, price: 15.9},
        { purchase: "Масло", done: false, price: 60},
        { purchase: "Картофель", done: true, price: 22.6},
        { purchase: "Сыр", done: false, price: 310}
    ];
    
    addItem() {
        this.items.push({ purchase: this.text, price: this.price, done: false });
        this.text = '';
        this.price = null;
        this.isNameValid = false;
    }

    toggleDone(item) {
        item.done = !item.done;
    }

    basketItems: Item[] = [];

    constructor(private basketService: BasketService) { }
    
    addToBasket() {
        this.basketItems = this.items.filter(item => item.done);
        const totalPrice = this.basketItems.reduce((acc, item) => acc + item.price, 0);
        console.log("Added to basket:", this.basketItems);
        console.log("Total price:", totalPrice);
    
        this.basketService.addToBasket(this.basketItems);
        window.alert('Товар добавлен в корзину!');
    }
}