import {createReducer, on, Action} from '@ngrx/store'

import {AuthStateInterface} from 'src/app/dashboard/modules/dictionary/types/authState.interface'

import {
  addTypeOfClientAction, addTypeOfClientsFailureAction, deleteTypeOfClientAction, deleteTypeOfClientsFailureAction,
  enterToTypeOfClientsAction,
  fetchTypeOfClientsFailureAction, successAddTypeOfClientAction, successDeleteTypeOfClientAction,
  successFetchTypeOfClientsAction,

} from 'src/app/dashboard/modules/dictionary/store/dictionary-actions'


const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoggedIn: null,
  isLoading: false,
  flag: null,
  data: null,
  errors: null

}

const authReducer = createReducer(
  initialState,
  on(
    enterToTypeOfClientsAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: true,
      errors: null
    })
  ),
  on(
    successFetchTypeOfClientsAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      data: action.data,
    })
  ),
  on(
    fetchTypeOfClientsFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      errors: action.errors,
    })
  ),
  on(
    addTypeOfClientAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    successAddTypeOfClientAction,
    (state, action): AuthStateInterface => ({
        ...state,
        isLoading: false,
        //добавить последний элемент в стор
        // (action.newItem)
      }
    )
  ),
  on(
    addTypeOfClientsFailureAction,
    (state, action): AuthStateInterface => ({
        ...state,
        errors: action.errors,
      }
    )
  ),
  on(
    deleteTypeOfClientAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    successDeleteTypeOfClientAction,
    (state, action): AuthStateInterface => ({
        ...state,
        isLoading: false,
        //удалить последний элемент из стора

      }
    )
  ),
  on(
    deleteTypeOfClientsFailureAction,
    (state, action): AuthStateInterface => ({
        ...state,
        errors: action.errors,
      }
    )
  ),

)

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action)
}
