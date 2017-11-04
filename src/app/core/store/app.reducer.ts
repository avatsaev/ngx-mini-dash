import {Widget} from '../models/widget';
import * as appActions from './app.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

export interface State extends EntityState<Widget> {}

export const adapter: EntityAdapter<Widget> = createEntityAdapter<Widget>({
  sortComparer: false,
  selectId: (e) => e.id
});


const INIT_STATE: State = adapter.getInitialState();

export function reducer(state = INIT_STATE, {type, payload}: appActions.All): State {

  switch (type) {

    case appActions.ADD_WIDGET : {
      return {
        ...state,
        ...adapter.addOne(payload as Widget, state)
      }
    }

    case appActions.REMOVE_WIDGET : {
      return {
        ...state,
        ...adapter.removeOne(payload as string, state)
      }
    }

    case appActions.UPDATE_WIDGET_SUCCESS : {
      const widget = payload as Widget;
      return {
        ...state,
        ...adapter.updateOne({
          id: widget.id,
          changes: widget
        }, state)
      }
    }

    default: return state;
  }

}


