import { Board } from '../../types';

export namespace RecentlyViewedActions {

  enum ActionTypes {
    ADD = '[Recently Viewed] ADD'
  }

  export class Add {
    static readonly type = ActionTypes.ADD;

    constructor(
      public board: Board
    ) {
    }
  }

}
