import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Board } from '../../types';
import { RecentlyViewedActions } from './viewed.actions';

export class RecentlyViewedStateModel {
  entities: Board[];
}

@State<RecentlyViewedStateModel>({
  name: 'recently',
  defaults: {
    entities: []
  }
})

@Injectable()
export class RecentlyViewedState {

  constructor() {
  }

  @Selector()
  static entities(state: RecentlyViewedStateModel) {
    return state.entities;
  }


  @Action(RecentlyViewedActions.Add)
  add({getState, setState}: StateContext<RecentlyViewedStateModel>, {board}: RecentlyViewedActions.Add): void {

    const state = getState();

    const isExist = (state.entities || []).findIndex(b => b.id === board.id);

    if (isExist > -1) {
      state.entities.splice(isExist);
    }

    if (board) {
      board.viewedAt = new Date();
    }

    setState({
      ...state,
      entities: [board, ...state.entities]
    });
  }
}
