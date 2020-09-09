import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Board, Card, Table } from '../../../shared/types';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BoardActions, BoardState } from '../../../shared/states';
import { Subject } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  private _updateBoard$: Subject<Board> = new Subject<Board>();

  form: FormGroup;
  board: Board;
  showOnDrag = false;
  showInput = false;

  @Input() tables: Table[] = [];

  constructor(
    private _fb: FormBuilder,
    private _store: Store,
    private _ms: NzModalService
  ) {
  }

  ngOnInit() {
    this.form = this._createForm();
    this.board = this._store.selectSnapshot(BoardState.selected);

    this._updateBoard$
      .asObservable()
      .subscribe(
        (board) => {
          this.tables = board.tables;
          this._store.dispatch(new BoardActions.SetSelected(board));
        }
      );
  }

  drop(event: CdkDragDrop<Card[]>): void {
    this.showOnDrag = true;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    this.board.tables = this.tables;
    this._updateBoard$.next(this.board);
  }

  /*
  *
  * LIST
  *
  * */
  onCreateList(): void {
    this.tables
      .forEach(
        (table) => table.showInput = false
      );

    this.form = this._createForm();
    this.showInput = true;
  }

  onAddList(): void {
    this.showOnDrag = true;

    this.tables.push({
      name: this.form.get('title').value,
      showInput: false,
      cards: []
    });

    this.board.tables = this.tables;

    this._updateBoard$.next(this.board);
    this.showInput = false;
  }

  onDeleteList(idx: number): void {
    this._ms.confirm({
      nzTitle: 'Delete List',
      nzContent: 'Confirm delete action',
      nzOnOk: () => {
        this.tables.splice(idx);
        this.board.tables = this.tables;
        this._updateBoard$.next(this.board);
      }
    });
  }

  /*
  *
  * CARD
  *
  * */
  onCreateCard(table: Table): void {
    this.form = this._createForm();
    this.tables.forEach(
      (t) => {
        if (t !== table) {
          t.showInput = false;
          return;
        }

        t.showInput = true;
      }
    );
  }

  onAddCard(table: Table): void {
    table.cards.push({
      title: this.form.get('title').value,
      color: 'blue',
      tag: [],
      comment: ''
    });

    table.showInput = false;
  }

  private _createForm(title?: string): FormGroup {
    return this._fb.group({
      'title': new FormControl(title, Validators.required)
    });
  }
}
