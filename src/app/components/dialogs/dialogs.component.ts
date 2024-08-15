import {
  Component,
  effect,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { DialogsService } from '../../services/dialogs.service';

@Component({
  selector: 'app-dialogs',
  standalone: true,
  imports: [],
  templateUrl: './dialogs.component.html',
  styleUrl: './dialogs.component.css',
})
export class DialogsComponent {
  // INJECTABLES
  dialogsService = inject(DialogsService);

  // DECORATORS
  @ViewChild('okButton') okButton!: ElementRef<HTMLButtonElement>;

  // PROPERTIES
  showNotificationDialog: boolean = false;
  showConfirmationDialog: boolean = false;
  dialogTitle: string = '';
  dialogMessage: string = '';

  // METHODS

  // Lifecycle hooks and Contructor
  constructor() {
    //Signal effect methods. (They are executed once on init and every time the signal changes)
    effect(() => {
      this.showNotificationDialog =
        this.dialogsService.signalShowNotificationDialog();
      if (this.dialogsService.signalShowNotificationDialog()) {
        this.dialogTitle = this.dialogsService.dialogTitle;
        this.dialogMessage = this.dialogsService.dialogMessage;
      }
    });
    effect(() => {
      this.showConfirmationDialog =
        this.dialogsService.signalShowConfirmationDialog();
      if (this.dialogsService.signalShowConfirmationDialog()) {
        this.dialogTitle = this.dialogsService.dialogTitle;
        this.dialogMessage = this.dialogsService.dialogMessage;
      }
    });
  }

  // Other Methods

  /**
   * Dismisses the notification dialog by setting the `signalShowNotificationDialog` signal to `false`.
   *
   * This function does not take any parameters.
   * It does not return any value.
   */
  onClickDismiss(): void {
    this.dialogsService.signalShowNotificationDialog.set(false);
  }

  /**
   * Calls the onClickAccept method of the dialogsService.
   *
   * This function does not take any parameters.
   * It does not return any value.
   */
  onClickAccept(): void {
    this.dialogsService.onClickAccept();
  }

  /**
   * Cancels the confirmation dialog by setting the `signalShowConfirmationDialog` signal to `false`.
   *
   * This function does not take any parameters.
   * It does not return any value.
   */
  onClickCancel(): void {
    this.dialogsService.signalShowConfirmationDialog.set(false);
  }
}
