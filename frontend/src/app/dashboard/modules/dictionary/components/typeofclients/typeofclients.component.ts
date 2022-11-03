import {Component, OnDestroy, OnInit} from '@angular/core';
import {enterToTypeOfClientsAction} from "../../store/dictionary-actions";
import {select, Store} from "@ngrx/store";
import {Observable, Subject, Subscription, takeUntil} from "rxjs";
import {isEnterTypeOfClientsSelector} from "../../store/selectors";

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

  constructor(private store: Store) {
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
}
