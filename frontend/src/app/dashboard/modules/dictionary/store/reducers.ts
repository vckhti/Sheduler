import {createReducer, on, Action} from '@ngrx/store'

import {AuthStateInterface} from 'src/app/dashboard/modules/dictionary/types/authState.interface'

import {

  enterToTypeOfClientsAction,

  fetchTypeOfClientsFailureAction,
   successFetchTypeOfClientsAction,

} from 'src/app/dashboard/modules/dictionary/store/dictionary-actions'


const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoggedIn: null,
  flag: null,
  data: null,
  errors: null

}

const authReducer = createReducer(
  initialState,
  on(
    enterToTypeOfClientsAction,
    (state , action): AuthStateInterface => ({
      ...state,
      errors: null
    })
  ),
  on(
    successFetchTypeOfClientsAction,
    (state , action): AuthStateInterface => ({
      ...state,
      data: action.data,
    })
  ),
on(
  fetchTypeOfClientsFailureAction,
  (state , action): AuthStateInterface => ({
    ...state,
    errors: action.errors,
  })
)
)

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action)
}
