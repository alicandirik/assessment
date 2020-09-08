import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { BoardActions, BoardState, RecentlyViewedState } from '../../shared/states';
import { Observable} from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { Board } from '../../shared/types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  form: FormGroup;
  colors = [
    {
      name: 'green',
      checked: false
    },
    {
      name: 'blue',
      checked: false
    },
    {
      name: 'volcano',
      checked: false
    },
    {
      name: 'magenta',
      checked: false
    }
  ];

  @ViewChild('modal', {static: false}) modal: TemplateRef<any>;
  @Select(BoardState.entities) boards$: Observable<Board[]>;
  @Select(RecentlyViewedState.entities) recently$: Observable<Board[]>;

  constructor(
    private _router: Router,
    private _store: Store,
    private _ms: NzModalService,
    private _fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form = this._createForm();
  }

  onSelect(board: Board): void {
    this._router.navigate([`board/${board.id}`])
      .then(
        () => this._store.dispatch(new BoardActions.SetSelected(board))
      );
  }

  openModal(): void {
    this._ms.create({
      nzTitle: 'Board Preferences',
      nzContent: this.modal,
      nzMask: true,
      nzMaskClosable: true,
      nzFooter: null
    });
  }

  onSelectColor(idx: number): void {
    this.colors.forEach(
      (color, i) => {
        if (i === idx) {
          color.checked = true;
          this.form.get('color').patchValue(color.name);
          return;
        }

        color.checked = false;
      }
    );
  }

  onCreate(): void {
    const board: Board = {
      ...this.form.getRawValue(),
      tables: []
    }
    this._store.dispatch(new BoardActions.Create(board));

    const s = this._store.selectSnapshot(BoardState.selected);

    this._router.navigate([`board/${s.id}`])
      .then(
        () => {
          this.form.reset();
          this._ms.closeAll();
        }
      );
  }

  private _createForm(): FormGroup {
    return this._fb.group({
      name: new FormControl(null, Validators.required),
      color: new FormControl(null, Validators.required)
    });
  }
}
