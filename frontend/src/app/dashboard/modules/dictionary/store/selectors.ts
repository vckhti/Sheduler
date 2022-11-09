import {createFeatureSelector, createSelector} from '@ngrx/store'
import {TypeOfClientStateInterface} from "../types/authState.interface";

export const authFeatureSelector = createFeatureSelector<
  any,
  TypeOfClientStateInterface
>('typeofclient')

export const isEnterTypeOfClientsSelector = createSelector(
  authFeatureSelector,
  (authState: TypeOfClientStateInterface) => authState.data
);

export const isLoadingSelector = createSelector(
  authFeatureSelector,
  (authState: TypeOfClientStateInterface) => authState.isLoading
);

