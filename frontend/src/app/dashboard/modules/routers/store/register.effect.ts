import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap, tap} from 'rxjs/operators'

import {
  addTypeOfClientAction, addTypeOfClientsFailureAction,
  enterToTypeOfClientsAction,
  successAddTypeOfClientAction,
  successFetchTypeOfClientsAction,fetchTypeOfClientsFailureAction
} from 'src/app/dashboard/modules/routers/store/routers-actions'
import {DictionaryService} from "../services/dictionary.service";
import {of} from "rxjs";
import {Store} from "@ngrx/store";
import {responseDataInterface} from "../../../../shared/types/responseData.interface";

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(enterToTypeOfClientsAction),
      switchMap((v) => {
        return this.dictionaryService.fetchRegions().pipe(
          map((response: responseDataInterface) => {
            console.log('for normalaze:', response);
            return successFetchTypeOfClientsAction({data: response})
          })/*,
          tap((r) => console.log('r', r))*/
        )
      }),
      catchError((errorResponse: any) => {
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
        if (!typeOfClient?.typeOfClient?.id) {
          return this.dictionaryService.addClient(typeOfClient.typeOfClient).pipe(
            map((response: any) => {
              console.log('r1:', response);
              return successAddTypeOfClientAction({newItem: response.data.data})
            }),
            tap(() => this.store.dispatch(enterToTypeOfClientsAction()))
          )
        }
        return this.dictionaryService.editClient(typeOfClient.typeOfClient).pipe(
          map((response: any) => {
            console.log('r2:', response);
            return successAddTypeOfClientAction({newItem: response.data.data})
          }),
          tap(() => this.store.dispatch(enterToTypeOfClientsAction()))
        )

      }),
      catchError((errorResponse: any) => {
        return of(
          addTypeOfClientsFailureAction({errors: errorResponse})
        )
      })
    )
  )


  constructor(private actions$: Actions, private dictionaryService: DictionaryService, private store: Store) {
  }
}
