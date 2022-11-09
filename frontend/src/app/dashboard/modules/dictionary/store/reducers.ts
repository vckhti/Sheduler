import {createReducer, on, Action} from '@ngrx/store'

import {

  TypeOfClientStateInterface
} from 'src/app/dashboard/modules/dictionary/types/authState.interface'

import {
  addTypeOfClientAction, addTypeOfClientsFailureAction, deleteTypeOfClientAction, deleteTypeOfClientsFailureAction,
  enterToTypeOfClientsAction,
  fetchTypeOfClientsFailureAction, successAddTypeOfClientAction, successDeleteTypeOfClientAction,
  successFetchTypeOfClientsAction,

} from 'src/app/dashboard/modules/dictionary/store/dictionary-actions'


const initialState: TypeOfClientStateInterface = {
  isLoggedIn: null,
  isLoading: false,
  data: null,
  errors: null

}

const authReducer = createReducer(
  initialState,
  on(
    enterToTypeOfClientsAction,
    (state, action): TypeOfClientStateInterface => ({
      ...state,
      isLoading: true,
      errors: null
    })
  ),
  on(
    successFetchTypeOfClientsAction,
    (state, action): TypeOfClientStateInterface => ({
      ...state,
      isLoading: false,
      data: action.data,
    })
  ),
  on(
    fetchTypeOfClientsFailureAction,
    (state, action): TypeOfClientStateInterface => ({
      ...state,
      errors: action.errors,
    })
  ),
  on(
    addTypeOfClientAction,
    (state): TypeOfClientStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    successAddTypeOfClientAction,
    (state, action): TypeOfClientStateInterface => ({
        ...state,
        isLoading: false,
        //добавить последний элемент в стор
        // (action.newItem)
      }
    )
  ),
  on(
    addTypeOfClientsFailureAction,
    (state, action): TypeOfClientStateInterface => ({
        ...state,
        errors: action.errors,
      }
    )
  ),
  on(
    deleteTypeOfClientAction,
    (state): TypeOfClientStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    successDeleteTypeOfClientAction,
    (state, action): TypeOfClientStateInterface => ({
        ...state,
        isLoading: false,
        //удалить последний элемент из стора

      }
    )
  ),
  on(
    deleteTypeOfClientsFailureAction,
    (state, action): TypeOfClientStateInterface => ({
        ...state,
        errors: action.errors,
      }
    )
  ),

)

export function reducers(state: TypeOfClientStateInterface, action: Action) {
  return authReducer(state, action)
}
