import {AfterContentInit, Component, Inject, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {clientTypeInterface} from "./dashboard/modules/dictionary/types/clientType.interface";
import {DictionaryService} from "./dashboard/modules/dictionary/services/dictionary.service";
import {select, Store} from "@ngrx/store";
import {filter, Observable, Subject, Subscription} from "rxjs";
import {isEnterTypeOfClientsSelector, isLoadingSelector} from "./dashboard/modules/dictionary/store/selectors";
import {isEnter2TypeOfClientsSelector} from "./store/selectors";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Project';
  subscriptions: Subscription;
  loading: boolean = false;
  $load: Observable<any>;

  constructor(
    private store: Store
  ) {
    this.subscriptions = new Subscription();
    this.$load = new Observable();
  }



  ngOnInit(): void {
    // setTimeout(() => {
    //   this.subscriptions = this.store.pipe(
    //     select(isEnter2TypeOfClientsSelector)/*,
    //     filter(Boolean)*/
    //   ).subscribe(
    //     (value: any) => {
    //
    //       console.log('vvv', value);
    //
    //
    //       //this.loading = value;
    //     }
    //   )
    // }, 2000);


  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }


}
