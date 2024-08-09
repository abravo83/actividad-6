import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Iuser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  // DECORATORS
  @Input() user: Iuser = {} as Iuser;
  @Output() onFormSubmit = new EventEmitter();

  // PROPERTIES
  userForm: FormGroup = new FormGroup(
    {
      first_name: new FormControl(null, [Validators.required]),
      last_name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i),
      ]),
      image: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(https?:\/\/(?:www\.)?[\w\-]+(\.[\w\-]+)+\/[\w\-\/]+(\.(jpg|jpeg|png|gif|bmp|svg|webp))(\?[\w\-=&]*)?)$/i
        ),
      ]),
    },
    []
  );

  // METHODS

  // Lifecycle hooks
  ngOnInit(): void {
    if (this.user) {
      this.userForm.patchValue({ first_name: this.user.first_name });
      this.userForm.patchValue({ last_name: this.user.last_name });
      this.userForm.patchValue({ email: this.user.email });
      this.userForm.patchValue({ image: this.user.image });
    }
  }

  // Other Methods

  onSubmit() {
    this.onFormSubmit.emit(this.userForm.value);
  }
}
