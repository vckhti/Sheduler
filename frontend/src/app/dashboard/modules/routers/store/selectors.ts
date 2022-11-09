import {createFeatureSelector, createSelector} from '@ngrx/store'
import {RoutersStateInterface} from "../types/routersState.interface";

export const authFeatureSelector = createFeatureSelector<
  any,
  RoutersStateInterface
>('routers')

export const isEnterTypeOfClientsSelector = createSelector(
  authFeatureSelector,
  (routersState: RoutersStateInterface) => routersState.data
);

export const isLoadingSelector = createSelector(
  authFeatureSelector,
  (routersState: RoutersStateInterface) => routersState.isLoading
);

