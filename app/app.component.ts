import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    styles: [`
        .button-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            max-width: 600px;
            margin: 0 auto; /* Center the container */
        }
        
        a {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-grow: 1;
            height: 50px;
            background-color: green;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin-right: 10px;
        }
    `],
    template: `<div>
                    <nav>
                        <div class="button-container">
                            <a routerLink="">Главная</a>
                            <a routerLink="/about">О сайте</a>
                            <a routerLink="/basket">Корзина</a>
                        </div>
                    </nav>
                    <router-outlet></router-outlet>
            </div>`
})
export class AppComponent { }