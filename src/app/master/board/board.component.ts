import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { BoardActions, BoardState, RecentlyViewedActions } from '../../shared/states';
import { Board } from '../../shared/types';
import { FormBuilder } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  board: Board;

  constructor(
    private _router: Router,
    private _store: Store,
    private _fb: FormBuilder,
    private _ms: NzModalService
  ) {
  }

  ngOnInit(): void {
    this.board = this._store.selectSnapshot(BoardState.selected);
    if (!this.board) {
      this._router.navigate(['dashboard'])
        .then(
          () => {
            this._store.dispatch(new BoardActions.ResetSelected());
          }
        );

      return;
    }

    this._store.dispatch(new RecentlyViewedActions.Add(this.board));
  }

  ngOnDestroy(): void {
    this._store.dispatch(new BoardActions.ResetSelected());
  }

  onBack(): void {
    this._router.navigate(['dashboard']);
  }
}
