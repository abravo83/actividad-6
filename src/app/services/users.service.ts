import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iuser } from '../interfaces/iuser.interface';
import { DialogsService } from './dialogs.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // ENVIROMENT VARIABLES
  API_BASEURL = environment.API_BASEURL;

  // INJECTABLES
  http = inject(HttpClient);
  dialogService = inject(DialogsService);
  router = inject(Router);

  constructor() {}

  getUsers(page?: number): Observable<Iuser[] | Object> {
    if (page) {
      return this.http.get(`${this.API_BASEURL}users?page=${page}`);
    } else {
      return this.http.get(`${this.API_BASEURL}users`);
    }
  }

  getUserById(id: string): Observable<Iuser | Object> {
    return this.http.get(`${this.API_BASEURL}users/${id}`);
  }

  createNewUser(user: Iuser): Observable<Iuser | Object> {
    return this.http.post(`${this.API_BASEURL}users`, user);
  }

  updateUser(user: Iuser): Observable<Iuser | Object> {
    return this.http.put(`${this.API_BASEURL}users/${user._id}`, user);
  }

  deleteUserById(id: string): Observable<Iuser | Object> {
    return this.http.delete(`${this.API_BASEURL}users/${id}`);
  }

  promtUserDeletion(id: string) {
    if (window.confirm('¿Estas seguro de borrar este usuario?')) {
      this.deleteUserById(id).subscribe({
        next: (response) => {
          // window.alert('Usuario borrado correctamente');
          this.dialogService.dialogTitle = 'Usuario borrado';
          this.dialogService.dialogMessage = 'Usuario borrado correctamente';
          this.dialogService.signalshowNotificationDialog.set(true);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error(err);
          // window.alert('Error al borrar el usuario');
          this.dialogService.dialogTitle = 'Error';
          this.dialogService.dialogMessage =
            'Error al intentar borrar el usuario. Inténtelo de nuevo más tarde';
          this.dialogService.signalshowNotificationDialog.set(true);
        },
      });
    }
  }
}
