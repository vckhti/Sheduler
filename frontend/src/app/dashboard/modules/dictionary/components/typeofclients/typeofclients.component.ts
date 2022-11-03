import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {enterToTypeOfClientsAction} from "../../store/dictionary-actions";
import {select, Store} from "@ngrx/store";
import {Observable, Subject, Subscription, takeUntil} from "rxjs";
import {isEnterTypeOfClientsSelector} from "../../store/selectors";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DefaultDialogComponent} from "../default-dialog/default-dialog.component";

@Component({
  selector: 'app-typeofclients',
  templateUrl: './typeofclients.component.html',
  styleUrls: ['./typeofclients.component.scss']
})
export class TypeofclientsComponent implements OnInit, OnDestroy {
  $table: Observable<any>;
  subscriptions: Subscription;
  onDestroySubject$: Subject<boolean>;
  tableData: any[] = [];

  constructor(private dialog: MatDialog, private store: Store) {
    this.$table = new Observable<any>();
    this.subscriptions = new Subscription();
    this.onDestroySubject$ = new Subject();
  }

  ngOnInit(): void {
    this.store.dispatch(enterToTypeOfClientsAction());
    this.initializeListeners();
  }
  ngOnDestroy() {
    this.onDestroySubject$.next(true);
    this.onDestroySubject$.complete();
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

  addItem(): void {
    let dialogRef = this.dialog.open(DefaultDialogComponent, {
      data: ['Добавление клиента'],
      height: '400px',
      width: '600px',
    });
  }

}
