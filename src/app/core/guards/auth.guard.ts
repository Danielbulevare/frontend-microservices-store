import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { KeycloakService } from '../Services/Keycloak/keycloak.service';

export const authGuard: CanActivateFn = (route, state) => {
  /*
  Valida si no estamos autenticados, lo vamos a redireccionar al login
  */

  const keycloakService = inject(KeycloakService);
  const router = inject(Router);

  if (keycloakService.keycloak?.isTokenExpired()) {
    router.navigate(['/login']);
    return false;
  }
  
  return true;
};
