import { Component, inject } from '@angular/core';
import { Iuser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // INJECTABLES
  usersService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  // PROPERTIES
  users: Iuser[] = [];
  page: number = 1;
  lastPage: number = 2;

  /**
   * Inicializa el componente.
   * Si el parámetro 'page' se encuentra presente, se actualiza el componente con los datos de la pagina solicitada.
   * Si el parámetro 'page' no se encuentra presente, se actualiza el componente con todos los datos.
   *
   * @return {void} Esta función no devuelve ningun valor.
   */
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['page']) {
        this.page = params['page'];
        this.usersService.getUsers(params['page']).subscribe((users: any) => {
          this.users = users.results as Iuser[];
          this.lastPage = users.total_pages;
        });
      } else {
        this.usersService.getUsers().subscribe((users: any) => {
          this.users = users.results as Iuser[];
        });
      }
    });
  }

  /**
   * Función que comprueba si la URL actual coincide con la URL proporcionada.
   *
   * @param {string} url - La URL a comprobar.
   * @return {boolean} Verdadero si la URL actual coincide con la URL proporcionada, de lo contrario falso.
   */
  esRutaActiva(url: string): boolean {
    return this.router.url === url;
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

  /**
   * Navega a la página siguiente.
   *
   * @return {void} Sin valor de retorno.
   */
  goToNextPage(): void {
    if (typeof this.page !== 'undefined') {
      if (this.page < 2) {
        this.router.navigate(['/home', this.page + 1]);
      }

      if (this.page > this.lastPage) {
        this.page = this.lastPage;
        this.router.navigate(['/home', this.lastPage]);
      } else {
        this.router.navigate(['/home', 2]);
      }
    }
  }

  /**
   * Navega a la página anterior.
   *
   * @return {void} Sin valor de retorno.
   */
  goToPreviousPage(): void {
    if (typeof this.page !== 'undefined') {
      if (this.page > 1) {
        this.router.navigate(['/home', this.page - 1]);
      }

      if (this.page < 1) {
        this.page = 1;
        this.router.navigate(['/home', 1]);
      }
    } else {
      this.router.navigate(['/home', 1]);
    }
  }
}
