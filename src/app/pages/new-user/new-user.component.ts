import { Component, inject } from '@angular/core';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { UsersService } from '../../services/users.service';
import { Iuser } from '../../interfaces/iuser.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css',
})
export class NewUserComponent {
  // INJECTABLES
  usersService = inject(UsersService);
  router = inject(Router);

  // METHODS

  onFormSubmitted(event: any) {
    console.log(event);
    const newUser = event;
    this.usersService.createNewUser(newUser).subscribe({
      next: (responde) => {
        alert('registro exitoso');
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error(error);
        alert(`ocurrio un error ${error}`);
      },
    });
  }
}
