import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from './model/user-profile';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private _keycloak: Keycloak | undefined;
  private _profile: UserProfile | undefined;

  get profile(): UserProfile | undefined {
    return this._profile;
  }

  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:8181',
        realm: 'microservices-store-realm',
        clientId: 'bsn',
      });
    }
    return this._keycloak;
  }

  constructor() {}

  async init(): Promise<void> {
    const authenticated: boolean = await this.keycloak?.init({
      onLoad: 'login-required',
    });

    if (authenticated) {
      this._profile = (await this.keycloak.loadUserProfile()) as UserProfile; //Carga la info. del usuario

      //No es necesario guardar el token en el perfil, pero se hará por cuestiones
      //educativas por si un dia lo llegas a necesitar
      this._profile.token = this.keycloak?.token;
    }
  }

  login(): Promise<void> {
    //Este método llamará al inicio de sesion desde Keycloak
    return this.keycloak?.login();
  }

  logout(): Promise<void> {
    //Ciera la sesión y redirige al usuario a la página raíz
    return this.keycloak?.logout({ redirectUri: 'http://localhost:4200' });
  }
}
