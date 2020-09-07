import { Board } from '../../types';

export namespace BoardActions {

  enum ActionTypes {
    CREATE = '[Board] Create',
    SET_SELECTED = '[Board] Set Selected',
    RESET_SELECTED = '[Board] Reset Selected'
  }
  export class Create {
    static readonly type = ActionTypes.CREATE;

    constructor(
      public payload: Board
    ) {
    }
  }

  export class SetSelected {
    static readonly type = ActionTypes.SET_SELECTED;

    constructor(
      public payload: Board
    ) {
    }
  }

  export class ResetSelected {
    static readonly type = ActionTypes.RESET_SELECTED;

    constructor() {
    }
  }

}
