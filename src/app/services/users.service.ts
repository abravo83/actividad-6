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
    this.dialogService.dialogTitle = '¿Estas seguro de borrar este usuario?';
    this.dialogService.dialogMessage = 'Esta acción no se puede deshacer.';
    this.dialogService.signalShowConfirmationDialog.set(true);

    this.dialogService.showConfirmationDialog(
      '¿Estás seguro de borrar este usuario?',
      'Esta acción no se puede deshacer.',
      () => {
        this.deleteUserById(id).subscribe({
          next: (response) => {
            this.dialogService.signalShowConfirmationDialog.set(false);
            this.dialogService.dialogTitle = 'Usuario borrado';
            this.dialogService.dialogMessage = 'Usuario borrado correctamente';
            this.dialogService.signalShowNotificationDialog.set(true);
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.error(err);
            this.dialogService.signalShowConfirmationDialog.set(false);
            this.dialogService.dialogTitle = 'Error';
            this.dialogService.dialogMessage =
              'Error al intentar borrar el usuario. Inténtelo de nuevo más tarde';
            this.dialogService.signalShowNotificationDialog.set(true);
          },
        });
      }
    );
  }
}
