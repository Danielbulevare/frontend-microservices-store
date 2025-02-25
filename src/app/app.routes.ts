import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'store',
        loadComponent: () => import('./Shared/components/header/header.component')
    },
    {
        path:'',
        redirectTo:'/store',
        pathMatch: 'full'
    }
];
