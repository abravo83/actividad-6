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

  // METHODS

  // ? Lifecycle hooks

  constructor() {}

  // ? Other methods

  /**
   * Retrieves a list of users from the API, optionally paginated.
   *
   * @param {number} page - The page number to retrieve (optional)
   * @return {Observable<Iuser[] | Object>} An observable containing the list of users or an error object
   */
  getUsers(page?: number): Observable<Iuser[] | Object> {
    if (page) {
      return this.http.get(`${this.API_BASEURL}users?page=${page}`);
    } else {
      return this.http.get(`${this.API_BASEURL}users`);
    }
  }

  /**
   * Retrieves a user by ID from the API.
   *
   * @param {string} id - The ID of the user to retrieve
   * @return {Observable<Iuser | Object>} An observable containing the user or an error object
   */
  getUserById(id: string): Observable<Iuser | Object> {
    return this.http.get(`${this.API_BASEURL}users/${id}`);
  }

  /**
   * Creates a new user in the API.
   *
   * @param {Iuser} user - The user object to be created
   * @return {Observable<Iuser | Object>} An observable containing the newly created user or an error object
   */
  createNewUser(user: Iuser): Observable<Iuser | Object> {
    return this.http.post(`${this.API_BASEURL}users`, user);
  }

  /**
   * Updates an existing user in the API.
   *
   * @param {Iuser} user - The user object to be updated
   * @return {Observable<Iuser | Object>} An observable containing the updated user or an error object
   */
  updateUser(user: Iuser): Observable<Iuser | Object> {
    return this.http.put(`${this.API_BASEURL}users/${user._id}`, user);
  }

  /**
   * Deletes a user by ID from the API.
   *
   * @param {string} id - The ID of the user to delete
   * @return {Observable<Iuser | Object>} An observable containing the deleted user or an error object
   */
  deleteUserById(id: string): Observable<Iuser | Object> {
    return this.http.delete(`${this.API_BASEURL}users/${id}`);
  }

  /**
   * Prompts the user for deletion confirmation and handles the deletion of a user by ID.
   *
   * @param {string} id - The ID of the user to delete
   * @return {void} No return value
   */
  promtUserDeletion(id: string): void {
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
