import { Component, inject } from '@angular/core';
import { KeycloakService } from '../../../core/Services/Keycloak/keycloak.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export default class HeaderComponent {
  private keycloakService = inject(KeycloakService);

  async logout(){
    this.keycloakService.logout();
  }
}
