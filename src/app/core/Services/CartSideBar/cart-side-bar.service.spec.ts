import { TestBed } from '@angular/core/testing';

import { CartSideBarService } from './cart-side-bar.service';

describe('CartSideBarService', () => {
  let service: CartSideBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartSideBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
