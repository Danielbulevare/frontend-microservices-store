import { Component, inject, OnInit, signal } from '@angular/core';
import HeaderComponent from '../Shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { CartSidebarComponent } from '../Shared/components/cart-sidebar/cart-sidebar.component';
import { CartSideBarService } from '../core/Services/CartSideBar/cart-side-bar.service';

@Component({
  selector: 'app-microservice-store',
  imports: [HeaderComponent, RouterOutlet, CartSidebarComponent],
  templateUrl: './microservice-store.component.html',
  styleUrl: './microservice-store.component.css',
})
export default class MicroserviceStoreComponent implements OnInit {
  ngOnInit(): void {
    this.isOpen;
  }
  private cartSidebarService = inject(CartSideBarService);
    
    get isOpen():boolean{
      return this.cartSidebarService.getOpen;
    }
}
