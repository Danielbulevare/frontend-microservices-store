import { Component, inject, signal } from '@angular/core';
import { KeycloakService } from '../../../core/Services/Keycloak/keycloak.service';
import { CartSideBarService } from '../../../core/Services/CartSideBar/cart-side-bar.service';
import { CartService } from '../../../core/Services/Cart/cart.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export default class HeaderComponent {
  private productCarList = inject(CartService);
  private keycloakService = inject(KeycloakService);
  private cartSidebarService = inject(CartSideBarService);

  private isOpen = signal(false);

  public openCartSidebar(){
    this.isOpen.set(this.cartSidebarService.toggleSidebar());
  }

  async logout(){
    this.keycloakService.logout();
  }

  get getIsOpen():boolean{
    return this.isOpen();
  }

  get totalProducts(): number{
    return this.productCarList.totalProducts;
  }
}
