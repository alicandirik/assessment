import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { BoardActions } from './board.actions';
import { Board } from '../../types';
import { generateID } from '../../utils';

export class BoardStateModel {
  entities: Board[];
  selected: Board;
}

@State<BoardStateModel>({
  name: 'board',
  defaults: {
    entities: [],
    selected: null
  }
})

@Injectable()
export class BoardState {

  constructor() {
  }

  @Selector()
  static entities(state: BoardStateModel) {
    return state.entities;
  }

  @Selector()
  static selected(state: BoardStateModel) {
    return state.selected;
  }

  @Action(BoardActions.Create)
  createBoard({getState, setState}: StateContext<BoardStateModel>, {payload}: BoardActions.Create): void {
    const state = getState();

    payload.id = generateID(10);
    payload.createdAt = new Date();
    payload.creator = 'Ali Can Dirik';

    setState({
      ...state,
      entities: [...state.entities, payload],
      selected: payload
    });
  }

  @Action(BoardActions.SetSelected)
  setSelected({getState, setState}: StateContext<BoardStateModel>, {payload}: BoardActions.SetSelected): void {
    const state = getState();

    setState({
      ...state,
      selected: payload
    });
  }

  @Action(BoardActions.ResetSelected)
  resetSelected({getState, setState}: StateContext<BoardStateModel>): void {
    const state = getState();

    setState({
      ...state,
      selected: null
    });
  }
}
