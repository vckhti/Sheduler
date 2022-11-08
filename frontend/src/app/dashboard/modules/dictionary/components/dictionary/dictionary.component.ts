import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {isLoadingSelector} from "../../store/selectors";
import {filter, Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit, OnDestroy, AfterViewChecked {
  subscription: Subscription;
  isLoading: boolean = false;

  constructor(private store: Store, private changeDetector : ChangeDetectorRef) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription = this.store.pipe(
    select(isLoadingSelector)).subscribe(
      (value:boolean) => {
        this.isLoading = value;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewChecked(): void {
    //Устраняет ошибку NG0100: ExpressionChangedAfterItHasBeenCheckedError при отрисовки индикации загрузки
    this.changeDetector.detectChanges();
  }



}
