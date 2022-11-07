import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {clientTypeInterface} from "./dashboard/modules/dictionary/types/clientType.interface";
import {DictionaryService} from "./dashboard/modules/dictionary/services/dictionary.service";
import {Store} from "@ngrx/store";
import {Observable, Subject, Subscription} from "rxjs";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
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
    /*this.subscriptions = this.store.select(isLoadingSelector).subscribe(
      (value: any) => {
        console.log('vvv',value);
        this.loading = value;
      }
    )*/

  }

  ngOnDestroy(): void {
   //this.subscriptions.unsubscribe()
  }
}
