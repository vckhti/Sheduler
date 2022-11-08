import {createFeatureSelector, createSelector} from '@ngrx/store'
import {AuthStateInterface} from "../dashboard/modules/dictionary/types/authState.interface";

export const authFeatureSelector = createFeatureSelector<
  any,
  AuthStateInterface
>('auth')

export const isEnter2TypeOfClientsSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoading
);


