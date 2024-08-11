import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Iuser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  // INJECTABLES
  activatedRoute = inject(ActivatedRoute);
  usersService = inject(UsersService);

  // PROPERTIES
  id: string = '';
  user: Iuser = {} as Iuser;

  // METHODS

  // Lifecycle hooks

  /**
   * Inicializa el componente.
   *
   * @return {void} Esta función no devuelve ningun valor.
   */
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['_id'];

      if (this.id) {
        this.usersService
          .getUserById(this.id)
          .subscribe((user: Iuser | any) => {
            this.user = user;
          });
      }
    });
  }

  /**
   * Función que gestiona la eliminación de un usuario.
   *
   * @param {string | undefined} id - El identificador del usuario a eliminar.
   * @return {void} Sin valor de retorno.
   */
  confirmRemoveUser(id: string | undefined): void {
    if (id) {
      this.usersService.promtUserDeletion(id);
    }
  }
}
