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
  usersServive = inject(UsersService);

  // PROPERTIES
  id: string = '';
  user: Iuser = {} as Iuser;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['_id'];

      if (this.id) {
        this.usersServive
          .getUserById(this.id)
          .subscribe((user: Iuser | any) => {
            this.user = user;
          });
      }
    });
  }
}
