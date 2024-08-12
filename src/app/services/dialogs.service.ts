import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogsService {
  // SIGNALS
  signalShowConfirmationDialog: WritableSignal<boolean> = signal(false);

  // METHODS

  constructor() {}
}
