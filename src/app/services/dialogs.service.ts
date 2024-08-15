import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogsService {
  // SIGNALS
  signalShowNotificationDialog: WritableSignal<boolean> = signal(false);
  signalShowConfirmationDialog: WritableSignal<boolean> = signal(false);

  // PROPERTIES
  dialogTitle: string = '';
  dialogMessage: string = '';

  callbackForConfirmation: Function = () => {};

  // METHODS

  constructor() {}

  /**
   * Muestra un diálogo de confirmación con el título y mensaje dados.
   *
   * @param {string} titulo - El título del diálogo de confirmación.
   * @param {string} mensaje - El mensaje que se mostrará en el diálogo de confirmación.
   * @param {Function} callback - La función que se ejecutará cuando el usuario confirme el diálogo.
   */
  showConfirmationDialog(title: string, message: string, callback: Function) {
    this.dialogTitle = title;
    this.dialogMessage = message;
    this.signalShowConfirmationDialog.set(true);

    // Save callback on the service to execute when/if the user confirms the dialog
    this.callbackForConfirmation = callback;
  }

  /**
   * Handles the confirmation dialog's accept button click event.
   *
   * Executes the callback function saved in the service when the user confirms the dialog.
   *
   * @return {void} No return value.
   */
  onClickAccept() {
    this.callbackForConfirmation();
  }
}
