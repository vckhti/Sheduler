import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DictionaryService} from "../../services/dictionary.service";
import {Store} from "@ngrx/store";
import {Subject, Subscription} from "rxjs";
import {clientTypeInterface} from "../../types/clientType.interface";
import {
  addTypeOfClientAction,
  deleteTypeOfClientAction,
  enterToTypeOfClientsAction
} from "../../store/dictionary-actions";

@Component({
  selector: 'app-default-dialog',
  templateUrl: './default-dialog.component.html',
  styleUrls: ['./default-dialog.component.scss']
})
export class DefaultDialogComponent implements OnInit, OnDestroy {
  clientTypeId: number | null = null;
  clientTypeName: string = '';
  subscriptions: Subscription;
  subscriptions2: Subscription;
  onDestroySubject$: Subject<boolean>;

  constructor(
    public dialogRef: MatDialogRef<DefaultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: [clientTypeInterface],
    private dictionaryService: DictionaryService,
    private store: Store
  ) {
    this.subscriptions = new Subscription();
    this.subscriptions2 = new Subscription();
    this.onDestroySubject$ = new Subject();
  }

  ngOnInit(): void {
    if (this.data[0]?.id) {
      this.clientTypeName = this.data[0].type;
      this.clientTypeId = this.data[0].id;
    }
  }

  ngOnDestroy() {
    this.onDestroySubject$.next(true);
    this.onDestroySubject$.complete();
    this.subscriptions.unsubscribe();
  }

  saveClient(): void {
    if (this.clientTypeId === null) {
      const typeOfClient: clientTypeInterface = {
        id: null,
        type: this.clientTypeName
      }

      this.store.dispatch(addTypeOfClientAction({typeOfClient: typeOfClient}));
      this.closeWindow();
      //this.store.dispatch(enterToTypeOfClientsAction());
    } else {
      const typeOfClient: clientTypeInterface = {
        id: this.clientTypeId,
        type: this.clientTypeName
      }
      this.store.dispatch(addTypeOfClientAction({typeOfClient: typeOfClient}));
      this.closeWindow();

      //this.store.dispatch(enterToTypeOfClientsAction());
    }

  }

  closeWindow() {
    this.dialogRef.close(null);
  }

  confirmDelete(): void {
    const thisTypeOfClient: clientTypeInterface = {
      id: this.clientTypeId,
      type: this.clientTypeName
    }
    this.store.dispatch(deleteTypeOfClientAction({typeOfClient: thisTypeOfClient}));
    this.closeWindow();

  }

}
