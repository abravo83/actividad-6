import { Component, inject } from '@angular/core';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { UsersService } from '../../services/users.service';
import { Iuser } from '../../interfaces/iuser.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogsService } from '../../services/dialogs.service';

@Component({
  selector: 'app-updateuser',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './updateuser.component.html',
  styleUrl: './updateuser.component.css',
})
export class UpdateuserComponent {
  // INJECTABLES
  usersService = inject(UsersService);
  dialogsService = inject(DialogsService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  // PROPERTIESç
  id: string = '';
  user: Iuser = {} as Iuser;

  // METHODS

  //? Lifecycle hooks
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

  //? Other methods

  /**
   * Handles the submission of the user form, updating the user data and displaying a notification.
   *
   * @param {any} event - The event triggered by the form submission.
   * @return {void}
   */
  onFormSubmitted(event: any): void {
    const updatedUserData = event;
    this.usersService.updateUser(updatedUserData).subscribe({
      next: (responde) => {
        this.dialogsService.dialogTitle = 'Datos actualizados';
        this.dialogsService.dialogMessage =
          'Los datos del usuario han sido actualizados.';
        this.dialogsService.signalShowNotificationDialog.set(true);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error(error);
        this.dialogsService.dialogTitle = 'Error';
        this.dialogsService.dialogMessage =
          'Algo ha fallado en la actualización. Inténtelo de nuevo más tarde.';
        this.dialogsService.signalShowNotificationDialog.set(true);
      },
    });
  }
}
