import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {select, Store} from "@ngrx/store";

import {DefaultDialogComponent} from "../default-dialog/default-dialog.component";
import {Observable, Subject, Subscription, switchMap, takeUntil} from "rxjs";
import {DictionaryService} from "../../services/dictionary.service";
import {isEnterTypeOfClientsSelector} from "../../store/selectors";
import {enterToTypeOfClientsAction} from "../../store/routers-actions";
import {ActivatedRoute, Params, Router} from "@angular/router";

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

  currentPage: number;
  tempArray: any[] = [];
  limit: number = 13;
  public totalPageForPagination: number;
  baseUrl: string;
  queryParamsSubscription: Subscription;


  constructor(
    private dialog: MatDialog,
              private store: Store,
              private dictionaryService: DictionaryService,
              private router: Router,
              private route: ActivatedRoute,
  ) {
    this.$table = new Observable<any>();
    this.subscriptions = new Subscription();
    this.subscriptionForDelete = new Subscription();
    this.queryParamsSubscription = new Subscription();
    this.onDestroySubject$ = new Subject();
  }

  ngOnInit(): void {
    this.currentPage = 1;
    this.store.dispatch(enterToTypeOfClientsAction());
    this.initializeListeners();

  }

  ngOnDestroy(): void {
    this.onDestroySubject$.next(true);
    this.onDestroySubject$.complete();
    this.subscriptionForDelete.unsubscribe();
    this.queryParamsSubscription.unsubscribe();
  }
  initializeValues(): void {
    this.baseUrl = this.router.url.split('?')[0];
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = Number(params['page'] || '1')
      }
    );


    this.subscriptions.add(
      this.store.pipe(
        select(isEnterTypeOfClientsSelector),
        takeUntil(this.onDestroySubject$)
      ).subscribe(
        (tr: any) => {
          if (tr) {
            this.tableData = tr.data;
            this.paginate();

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
      this.paginate();
    }else if (this.filterByIp.length > 0) {
      this.tableData = this.tableData.filter(
        item =>
          item.routerIp.toUpperCase().includes(this.filterByIp.toUpperCase())
      );
      this.paginate();
    } else if (this.filterById) {
      this.tableData = this.tableData.filter(
        item =>
          item.routerId.toString().toUpperCase().includes(this.filterById?.toString().toUpperCase())
      );
      this.paginate();
    } else if (this.filterByRouterName.length > 0) {
      this.tableData = this.tableData.filter(
        item =>
          item.routerName.toUpperCase().includes(this.filterByRouterName.toUpperCase())
      );
      this.paginate();
    } else {
      this.store.dispatch(enterToTypeOfClientsAction())

    }
  }

  handleCurrentPage(event: string): void {
    this.currentPage = parseInt(event);
    this.paginate();
  }

  paginate(): void {
    this.tempArray = [];
    this.totalPageForPagination = this.tableData.length;

    for (let i = 0; i < (this.limit * this.currentPage); i++) {
      if (this.tableData[i]) {
        this.tempArray.push(this.tableData[i]);
      }
    }
    this.tempArray.splice(0, this.limit * (this.currentPage - 1));


  }

}
