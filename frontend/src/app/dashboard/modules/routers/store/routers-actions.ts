import {createAction, props} from '@ngrx/store'
import {ActionTypes} from "./actionTypes";
import {responseDataInterface} from "../../../../shared/types/responseData.interface";

export const enterToTypeOfClientsAction = createAction(
  ActionTypes.ROUTERS_ENTER
);

export const successFetchTypeOfClientsAction = createAction(
  ActionTypes.ROUTERS_FETCH_SUCCESS,
  props<{data: responseDataInterface}>()
);

export const fetchTypeOfClientsFailureAction = createAction(
  ActionTypes.ROUTERS_FETCH_FAILURE,
  props<{errors: any}>()
);

export const addTypeOfClientAction = createAction(
  ActionTypes.ROUTERS_ADD,
  props<{typeOfClient: any}>()
);

export const successAddTypeOfClientAction = createAction(
  ActionTypes.ROUTERS_ADD_SUCCESS,
  props<{newItem: any}>()
);

export const addTypeOfClientsFailureAction = createAction(
  ActionTypes.ROUTERS_ADD_FAILURE,
  props<{errors: any}>()
);

export const deleteTypeOfClientAction = createAction(
  ActionTypes.ROUTERS_DELETE,
  props<{typeOfClient: any}>()
);

export const successDeleteTypeOfClientAction = createAction(
  ActionTypes.ROUTERS_DELETE_SUCCESS
);

export const deleteTypeOfClientsFailureAction = createAction(
  ActionTypes.ROUTERS_DELETE_FAILURE,
  props<{errors: any}>()
);
