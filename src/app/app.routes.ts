import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'microservice-store',
    loadComponent: () =>
      import('./microservice-store/microservice-store.component'),
    children: [
      {
        path: 'store/:page',
        loadComponent: () =>
          import('./microservice-store/pages/store/store.component'),
        pathMatch: 'full',
      },
      {
        path: 'products/:page',
        loadComponent: () => import('./microservice-store/pages/list-products/list-products.component'),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/microservice-store/store/0',
    pathMatch: 'full',
  },
];
