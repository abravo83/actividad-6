import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
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
          /^(https?:\/\/(?:www\.)?[\w\-]+(\.[\w\-]+)+(\/[\w\-\/]*)?(\?[\w\-@.=&]*)?)$/i
        ),
      ]),
    },
    []
  );

  // METHODS

  // Lifecycle hooks
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && changes['user'].currentValue) {
      this.userForm.addControl('_id', new FormControl(this.user._id));

      this.userForm.patchValue({
        _id: this.user._id,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        image: this.user.image,
      });
    }
  }

  // Other Methods

  onSubmit() {
    this.onFormSubmit.emit(this.userForm.value);
  }
}
