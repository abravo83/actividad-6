import { Component, effect, inject } from '@angular/core';
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

  // PROPERTIES
  showNotificationDialog: boolean = false;
  dialogTitle: string = '';
  dialogMessage: string = '';

  // METHODS

  // Lifecycle hooks and Contructor
  constructor() {
    effect(() => {
      this.showNotificationDialog =
        this.dialogsService.signalshowNotificationDialog();
      this.dialogTitle = this.dialogsService.dialogTitle;
      this.dialogMessage = this.dialogsService.dialogMessage;
    });
  }

  ngOnInit(): void {
    this.dialogTitle = this.dialogsService.dialogTitle;
    this.dialogMessage = this.dialogsService.dialogMessage;
  }

  // Other Methods

  onClickDismiss(): void {
    this.dialogsService.signalshowNotificationDialog.set(false);
  }
}
