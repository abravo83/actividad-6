import { Component, inject } from '@angular/core';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { UsersService } from '../../services/users.service';
import { Iuser } from '../../interfaces/iuser.interface';
import { ActivatedRoute } from '@angular/router';

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
  activatedRoute = inject(ActivatedRoute);

  // PROPERTIESç
  id: string = '';
  user: Iuser = {} as Iuser;

  // METHODS

  // Lifecycle hooks
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['_id'];

      if (this.id) {
        this.usersService
          .getUserById(this.id)
          .subscribe((user: Iuser | any) => {
            this.user = user;
            console.log(this.user);
          });
      }
    });
  }

  // router = inject(Router);

  onFormSubmitted(event: any) {
    console.log(event);
    const newUserData = event;
    // this.usersService.createNewUser(newUserData).subscribe({
    //   next: (responde) => {
    //     alert('registro exitoso');
    //     // this.router.navigate(['/home']);
    //   },
    //   error: (error) => {
    //     console.error(error);
    //     alert(`ocurrio un error ${error}`);
    //   },
    // });
  }
}
