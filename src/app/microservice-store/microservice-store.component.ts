import { Component } from '@angular/core';
import HeaderComponent from '../Shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-microservice-store',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './microservice-store.component.html',
  styleUrl: './microservice-store.component.css',
})
export default class MicroserviceStoreComponent {}
