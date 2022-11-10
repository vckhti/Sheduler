import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap, tap} from 'rxjs/operators'

import {
  addTypeOfClientAction, addTypeOfClientsFailureAction,
  deleteTypeOfClientAction, deleteTypeOfClientsFailureAction,
  enterToTypeOfClientsAction,
  successAddTypeOfClientAction,
  successDeleteTypeOfClientAction,
  successFetchTypeOfClientsAction,
} from 'src/app/dashboard/modules/dictionary/store/dictionary-actions'
import {DictionaryService} from "../services/dictionary.service";
import {of} from "rxjs";
import {fetchTypeOfClientsFailureAction} from "src/app/dashboard/modules/dictionary/store/dictionary-actions";
import {Store} from "@ngrx/store";
import {typeOfClientResponseInterface} from "../types/typeOfClientResponse.interface";

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(enterToTypeOfClientsAction),
      switchMap((v) => {
        return this.dictionaryService.fetchRegions().pipe(
          switchMap((response: typeOfClientResponseInterface) => {
            return this.dictionaryService.sortByType(response)
          }),
          map((response: typeOfClientResponseInterface) => {
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
              return successAddTypeOfClientAction({newItem: response.data.data})
            }),
            tap(() => this.store.dispatch(enterToTypeOfClientsAction()))
          )
        }
        return this.dictionaryService.editClient(typeOfClient.typeOfClient).pipe(
          map((response: any) => {
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

  deleteTypeOfClients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTypeOfClientAction),
      switchMap((typeOfClient: any) => {
        return this.dictionaryService.deleteClient(typeOfClient.typeOfClient).pipe(
          map(() => {
            return successDeleteTypeOfClientAction()
          }),
          tap((r) => this.store.dispatch(enterToTypeOfClientsAction()))
        )
      }),
      catchError((errorResponse: any) => {
        return of(
          deleteTypeOfClientsFailureAction({errors: errorResponse})
        )
      })
    )
  )


  constructor(private actions$: Actions, private dictionaryService: DictionaryService, private store: Store) {
  }
}
