import {createReducer, on, Action} from '@ngrx/store'
import {RoutersStateInterface} from "../types/routersState.interface";
import {
  addTypeOfClientAction, addTypeOfClientsFailureAction, deleteTypeOfClientAction, deleteTypeOfClientsFailureAction,
  enterToTypeOfClientsAction,
  fetchTypeOfClientsFailureAction, successAddTypeOfClientAction, successDeleteTypeOfClientAction,
  successFetchTypeOfClientsAction
} from "./routers-actions";

const initialState: RoutersStateInterface = {
  isLoggedIn: null,
  isLoading: false,
  data: null,
  errors: null

}

const authReducer = createReducer(
  initialState,
  on(
    enterToTypeOfClientsAction,
    (state, action): RoutersStateInterface => ({
      ...state,
      isLoading: true,
      errors: null
    })
  ),
  on(
    successFetchTypeOfClientsAction,
    (state, action): RoutersStateInterface => ({
      ...state,
      isLoading: false,
      data: action.data,
    })
  ),
  on(
    fetchTypeOfClientsFailureAction,
    (state, action): RoutersStateInterface => ({
      ...state,
      errors: action.errors,
    })
  ),
  on(
    addTypeOfClientAction,
    (state): RoutersStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    successAddTypeOfClientAction,
    (state, action): RoutersStateInterface => ({
        ...state,
        isLoading: false,
        //добавить последний элемент в стор
        // (action.newItem)
      }
    )
  ),
  on(
    addTypeOfClientsFailureAction,
    (state, action): RoutersStateInterface => ({
        ...state,
        errors: action.errors,
      }
    )
  ),
  on(
    deleteTypeOfClientAction,
    (state): RoutersStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    successDeleteTypeOfClientAction,
    (state, action): RoutersStateInterface => ({
        ...state,
        isLoading: false,
        //удалить последний элемент из стора

      }
    )
  ),
  on(
    deleteTypeOfClientsFailureAction,
    (state, action): RoutersStateInterface => ({
        ...state,
        errors: action.errors,
      }
    )
  ),

)

export function reducers(state: RoutersStateInterface, action: Action) {
  return authReducer(state, action)
}
