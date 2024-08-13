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
  showConfirmationDialog: boolean = false;

  constructor() {
    effect(() => {
      this.showConfirmationDialog =
        this.dialogsService.signalShowConfirmationDialog();
    });
  }
}
