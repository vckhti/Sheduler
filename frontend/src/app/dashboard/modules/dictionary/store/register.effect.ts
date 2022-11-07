import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap, tap} from 'rxjs/operators'
import {HttpErrorResponse} from '@angular/common/http'

import {
  addTypeOfClientAction,
  enterToTypeOfClientsAction, successAddTypeOfClientAction, successFetchTypeOfClientsAction,
} from 'src/app/dashboard/modules/dictionary/store/dictionary-actions'
import {DictionaryService} from "../services/dictionary.service";
import {of} from "rxjs";
import {fetchTypeOfClientsFailureAction} from "src/app/dashboard/modules/dictionary/store/dictionary-actions";

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(enterToTypeOfClientsAction),
      switchMap((v) => {
        return this.dictionaryService.fetchRegions().pipe(
          map((response: any) => {
            return successFetchTypeOfClientsAction({data: response})
          }),
          tap((r) => console.log('r', r))
        )
      }),
      catchError((errorResponse:any) => {
        return of(
          fetchTypeOfClientsFailureAction({errors: errorResponse})
        )
      })
    )
  )

  addAndEditTypeOfClients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTypeOfClientAction),
      switchMap((typeOfClient: any) => {
       return this.dictionaryService.addClient(typeOfClient.typeOfClient).pipe(
          map((response: any) => {
            console.log('resp21:', response);
            return successAddTypeOfClientAction({newItem: response.data.data})
          }),
          tap((r) => console.log('r', r))
        )
      }),
      catchError((errorResponse:any) => {
        return of(
          fetchTypeOfClientsFailureAction({errors: errorResponse})
        )
      })
    )
  )


  constructor(private actions$: Actions, private dictionaryService: DictionaryService) {
  }
}
