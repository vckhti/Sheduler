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
  props<{typeOfClient: clientTypeInterface}>()
);

export const successAddTypeOfClientAction = createAction(
  ActionTypes.TYPEOFCLIENTS_ADD_SUCCESS,
  props<{newItem: clientTypeInterface}>()
);

export const addTypeOfClientsFailureAction = createAction(
  ActionTypes.TYPEOFCLIENTS_ADD_FAILURE,
  props<{errors: any}>()
);

export const deleteTypeOfClientAction = createAction(
  ActionTypes.TYPEOFCLIENTS_DELETE,
  props<{typeOfClient: clientTypeInterface}>()
);

export const successDeleteTypeOfClientAction = createAction(
  ActionTypes.TYPEOFCLIENTS_DELETE_SUCCESS
);

export const deleteTypeOfClientsFailureAction = createAction(
  ActionTypes.TYPEOFCLIENTS_DELETE_FAILURE,
  props<{errors: any}>()
);
