import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { UserComponent } from './pages/user/user.component';
import { UpdateuserComponent } from './pages/updateuser/updateuser.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'home/:page', component: HomeComponent },
  { path: 'user/:_id', component: UserComponent },
  { path: 'newuser', component: NewUserComponent },
  { path: 'updateuser/:_id', component: UpdateuserComponent },
  { path: '**', redirectTo: '/home' },
];
