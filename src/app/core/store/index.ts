
import * as fromApp from './app.reducer';

import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

export interface State {
  widgets: fromApp.State;
}

export const reducers: ActionReducerMap<State> = {
  widgets: fromApp.reducer
};


export const getWidgetsState = createFeatureSelector<fromApp.State>('widgets');

export const {
  selectAll: getAllWidgets
} = fromApp.adapter.getSelectors(getWidgetsState);
