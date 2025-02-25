import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroserviceStoreComponent } from './microservice-store.component';

describe('MicroserviceStoreComponent', () => {
  let component: MicroserviceStoreComponent;
  let fixture: ComponentFixture<MicroserviceStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MicroserviceStoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicroserviceStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
