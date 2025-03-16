import { Component, inject, OnInit, signal } from '@angular/core';
import HeaderComponent from '../Shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { CartSidebarComponent } from '../Shared/components/cart-sidebar/cart-sidebar.component';
import { CartSideBarService } from '../core/Services/CartSideBar/cart-side-bar.service';
import { MenuSidebarComponent } from '../Shared/components/menu-sidebar/menu-sidebar/menu-sidebar.component';
import { MenuSidebarService } from '../core/Services/Menu-sideBar/menu-sidebar.service';

@Component({
  selector: 'app-microservice-store',
  imports: [
    HeaderComponent,
    RouterOutlet,
    CartSidebarComponent,
    MenuSidebarComponent,
  ],
  templateUrl: './microservice-store.component.html',
  styleUrl: './microservice-store.component.css',
})
export default class MicroserviceStoreComponent implements OnInit {
  private cartSidebarService = inject(CartSideBarService);
  private menuSidebarService = inject(MenuSidebarService);

  ngOnInit(): void {
    this.isCartSidebarOpen;
    this.isMenuSidebarOpen;
  }

  get isCartSidebarOpen(): boolean {
    return this.cartSidebarService.getOpen;
  }

  get isMenuSidebarOpen(): boolean {
    return this.menuSidebarService.getOpen;
  }
}
