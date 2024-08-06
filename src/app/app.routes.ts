import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'main',
    component: MainComponent,
    children: [{ path: 'home', component: HomeComponent }],
  },
];
