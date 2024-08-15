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

  ngAfterViewInit() {
    if (this.dialogsService.signalShowNotificationDialog()) {
      this.focusOkButton();
    }
  }

  // Other Methods

  onClickDismiss(): void {
    this.dialogsService.signalShowNotificationDialog.set(false);
  }

  onClickAccept(): void {
    this.dialogsService.onClickAccept();
  }

  onClickCancel(): void {
    this.dialogsService.signalShowConfirmationDialog.set(false);
  }

  focusOkButton(): void {
    if (this.okButton?.nativeElement) {
      setTimeout(() => {
        this.okButton.nativeElement.focus();
      }, 100);
    }
  }
}
