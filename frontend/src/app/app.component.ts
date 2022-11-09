import { Component, OnInit} from '@angular/core';
import { Store} from "@ngrx/store";
import {Observable, Subscription} from "rxjs";


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
