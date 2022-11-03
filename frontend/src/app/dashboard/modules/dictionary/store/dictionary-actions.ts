import {createAction, props} from '@ngrx/store'
import {ActionTypes} from 'src/app/dashboard/modules/dictionary/store/actionTypes'

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

