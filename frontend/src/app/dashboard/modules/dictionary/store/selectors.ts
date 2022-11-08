import {createFeatureSelector, createSelector} from '@ngrx/store'
import {AuthStateInterface} from "../types/authState.interface";

export const authFeatureSelector = createFeatureSelector<
  any,
  AuthStateInterface
>('auth')

export const isEnterTypeOfClientsSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.data
);

export const isLoadingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoading
);

