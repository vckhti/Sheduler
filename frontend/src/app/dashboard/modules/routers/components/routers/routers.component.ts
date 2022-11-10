import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {select, Store} from "@ngrx/store";

import {DefaultDialogComponent} from "../default-dialog/default-dialog.component";
import {Observable, Subject, Subscription, switchMap, takeUntil} from "rxjs";
import {DictionaryService} from "../../services/dictionary.service";
import {isEnterTypeOfClientsSelector} from "../../store/selectors";
import {enterToTypeOfClientsAction} from "../../store/routers-actions";

@Component({
  selector: 'app-routers',
  templateUrl: './routers.component.html',
  styleUrls: ['./routers.component.scss']
})
export class RoutersComponent implements OnInit, OnDestroy {
  $table: Observable<any>;
  subscriptions: Subscription;
  subscriptionForDelete: Subscription;
  onDestroySubject$: Subject<boolean>;
  tableData: any[] = [];
  filterById: number | null;
  filterByRouterName: string = '';
  filterByIp: string = '';
  askRouter: boolean;


  constructor(
    private dialog: MatDialog,
              private store: Store,
              private dictionaryService: DictionaryService,
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

  ngOnDestroy(): void {
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
            console.log('Routers trr', tr);
            this.tableData = tr.data;
          }
        }
      )
    );
  }


  editClientType(clientType: (any | null)): void {
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

  filterByValues(): void {

    if (this.askRouter) {
      this.tableData = this.tableData.filter(item => item.askRouter === this.askRouter);
    }else if (this.filterByIp.length > 0) {
      this.tableData = this.tableData.filter(
        item =>
          item.routerIp.toUpperCase().includes(this.filterByIp.toUpperCase())
      );
      console.log(this.tableData);
    } else if (this.filterById) {
      this.tableData = this.tableData.filter(
        item =>
          item.routerId.toString().toUpperCase().includes(this.filterById?.toString().toUpperCase())
      );
    } else if (this.filterByRouterName.length > 0) {
      this.tableData = this.tableData.filter(
        item =>
          item.routerName.toUpperCase().includes(this.filterByRouterName.toUpperCase())
      );
    } else {
      this.store.dispatch(enterToTypeOfClientsAction())
    }





  }

}
