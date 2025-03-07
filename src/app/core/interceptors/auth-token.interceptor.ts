import { HttpInterceptorFn } from '@angular/common/http';
import { KeycloakService } from '../Services/Keycloak/keycloak.service';
import { inject } from '@angular/core';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloakService = inject(KeycloakService);

  const token = keycloakService.keycloak.token; //Obtiene el token de Keycloak una vez logueado el usuario

    if (token) {
      //Clona la solicitud y agrega el token a las cabeceras
      const clonedRequest = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });

      return next(clonedRequest); //Pasar la solicitud clonada
    }
  

  return next(req);
};
