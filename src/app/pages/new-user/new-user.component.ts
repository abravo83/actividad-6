import { Component, inject } from '@angular/core';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { UsersService } from '../../services/users.service';
import { Iuser } from '../../interfaces/iuser.interface';
import { Router } from '@angular/router';
import { DialogsService } from '../../services/dialogs.service';

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
  dialogsService = inject(DialogsService);
  router = inject(Router);

  // METHODS

  onFormSubmitted(event: any) {
    console.log(event);
    const newUser = event;
    this.usersService.createNewUser(newUser).subscribe({
      next: (responde) => {
        this.dialogsService.dialogTitle = 'Registro exitoso';
        this.dialogsService.dialogMessage =
          'El nuevo usuario ha sido registrado correctamente.';
        this.dialogsService.signalshowNotificationDialog.set(true);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error(error);
        this.dialogsService.dialogTitle = 'Error';
        this.dialogsService.dialogMessage =
          'Algo ha fallado en el registro. Inténtelo de nuevo más tarde.';
        this.dialogsService.signalshowNotificationDialog.set(true);
      },
    });
  }
}
