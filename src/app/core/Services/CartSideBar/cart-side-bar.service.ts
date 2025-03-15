import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartSideBarService {
  private isOpen = signal(false);
  constructor() {}

  toggleSidebar(): boolean {
    this.isOpen.update(value => !value);
    return this.isOpen();
  }

  get getOpen():boolean{
    return this.isOpen();
  }
}
