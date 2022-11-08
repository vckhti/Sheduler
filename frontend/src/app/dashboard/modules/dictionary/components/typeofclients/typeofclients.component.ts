import {Component, Inject, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {deleteTypeOfClientAction, enterToTypeOfClientsAction} from "../../store/dictionary-actions";
import {select, Store} from "@ngrx/store";
import {Observable, Subject, Subscription, takeUntil} from "rxjs";
import {isEnterTypeOfClientsSelector} from "../../store/selectors";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DefaultDialogComponent} from "../default-dialog/default-dialog.component";
import {clientTypeInterface} from "../../types/clientType.interface";
import {DictionaryService} from "../../services/dictionary.service";

@Component({
  selector: 'app-typeofclients',
  templateUrl: './typeofclients.component.html',
  styleUrls: ['./typeofclients.component.scss']
})
export class TypeofclientsComponent implements OnInit, OnDestroy, OnChanges {
  $table: Observable<any>;
  subscriptions: Subscription;
  subscriptionForDelete: Subscription;
  onDestroySubject$: Subject<boolean>;
  tableData: any[] = [];

  constructor(
    private dialog: MatDialog,
    private store: Store,
    private dictionaryService: DictionaryService
  ) {
    this.$table = new Observable<any>();
    this.subscriptions = new Subscription();
    this.subscriptionForDelete = new Subscription();
    this.onDestroySubject$ = new Subject();
  }

  ngOnInit(): void {
    this.store.dispatch(enterToTypeOfClientsAction());
    this.initializeListeners();
  }
  ngOnDestroy() {
    this.onDestroySubject$.next(true);
    this.onDestroySubject$.complete();
    this.subscriptionForDelete.unsubscribe();
  }

  initializeListeners(): void {
    this.subscriptions.add(
      this.store.pipe(
        select(isEnterTypeOfClientsSelector),
        takeUntil(this.onDestroySubject$)
      ).subscribe(
        (tr: any) => {
          if (tr) {
            console.log('trr', tr);
            this.tableData = tr.data;
          }
        }
      )
    );
  }

  deleteClientType(clientType: clientTypeInterface): void {
    /*this.subscriptionForDelete = this.dictionaryService.deleteClient(clientType).subscribe((res) => {
      console.log('res', res);
    });*/
    this.store.dispatch(deleteTypeOfClientAction({typeOfClient: clientType}));
  }

  editClientType(clientType: (clientTypeInterface | null)): void {
    if (clientType) {
      let dialogRef = this.dialog.open(DefaultDialogComponent, {
        data: [clientType],
        height: '300px',
        width: '600px',
      });
    } else if (clientType === null) {
      const emptyType = {
        id: null,
        type: ''
      }
      let dialogRef = this.dialog.open(DefaultDialogComponent, {
        data: emptyType,
        height: '300px',
        width: '600px',
      });
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
  }

}
