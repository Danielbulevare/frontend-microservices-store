import { Injectable } from '@angular/core';
import { CartSideBarService } from '../CartSideBar/cart-side-bar.service';

@Injectable({
  providedIn: 'root',
})
export class MenuSidebarService extends CartSideBarService {}
