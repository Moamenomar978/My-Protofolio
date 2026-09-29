import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home-page').then((m) => m.HomePage),
    title: 'Moamen Fathy | Frontend Developer',
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services-page').then((m) => m.ServicesPage),
    title: 'Services | Moamen Fathy',
  },
  {
    path: 'cv',
    loadComponent: () => import('./pages/cv/cv-page').then((m) => m.CvPage),
    title: 'CV | Moamen Fathy',
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
    title: 'Sign In',
  },
  {
    path: 'user',
    loadComponent: () => import('./features/user/profile/profile').then((m) => m.Profile),
    title: 'My Profile',
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/dashboard/dashboard').then((m) => m.Dashboard),
    canActivate: [authGuard],
    title: 'Admin Dashboard',
  },
  { path: '**', redirectTo: '' },
];
