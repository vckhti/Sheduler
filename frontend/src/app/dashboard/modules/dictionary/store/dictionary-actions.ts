import {createAction, props} from '@ngrx/store'
import {ActionTypes} from 'src/app/dashboard/modules/dictionary/store/actionTypes'
import {clientTypeInterface} from "../types/clientType.interface";

export const enterToTypeOfClientsAction = createAction(
  ActionTypes.TYPEOFCLIENTS_ENTER
);

export const successFetchTypeOfClientsAction = createAction(
  ActionTypes.TYPEOFCLIENTS_FETCH_SUCCESS,
  props<{data: any}>()
);

export const fetchTypeOfClientsFailureAction = createAction(
  ActionTypes.TYPEOFCLIENTS_FETCH_FAILURE,
  props<{errors: any}>()
);

export const addTypeOfClientAction = createAction(
  ActionTypes.TYPEOFCLIENTS_ADD,
  props<{typeOfClient: string}>()
);

export const successAddTypeOfClientAction = createAction(
  ActionTypes.TYPEOFCLIENTS_ADD_SUCCESS,
  props<{newItem: clientTypeInterface}>()
);

