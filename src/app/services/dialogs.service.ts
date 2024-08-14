import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogsService {
  // SIGNALS
  signalshowNotificationDialog: WritableSignal<boolean> = signal(false);

  // PROPERTIES
  dialogTitle: string = '';
  dialogMessage: string = '';

  // METHODS

  constructor() {}
}
