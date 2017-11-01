import {CryptoWidget, WeatherWidget, Widget} from '../models/widget';
import {Action} from '@ngrx/store';

export const ADD_WIDGET = '[Widget] add';
export const REMOVE_WIDGET = '[Widget] remove';
export const UPDATE_WIDGET = '[Widget] update';
export const UPDATE_WIDGET_SUCCESS = '[Widget] update success';

export class AddWidget implements Action {
  readonly type = ADD_WIDGET;
  constructor(public payload: Widget) {};
}


export class RemoveWidget implements Action {
  readonly type = REMOVE_WIDGET;
  constructor(public payload: string) {};
}

export class UpdateWidget implements Action {
  readonly type = UPDATE_WIDGET;
  constructor(public payload: Widget) {};
}

export class UpdateWidgetSuccess implements Action {
  readonly type = UPDATE_WIDGET_SUCCESS;
  constructor(public payload: Partial<Widget | CryptoWidget | WeatherWidget>) {};
}

export type All =
  AddWidget
  | RemoveWidget
  | UpdateWidget
  | UpdateWidgetSuccess;
