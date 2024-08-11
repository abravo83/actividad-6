import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iuser } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // ENVIROMENT VARIABLES
  API_BASEURL = environment.API_BASEURL;

  // INJECTABLES
  http = inject(HttpClient);

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
          window.alert('Usuario borrado correctamente');
        },
        error: (err) => {
          console.error(err);
          window.alert('Error al borrar el usuario');
        },
      });
    }
  }
}
