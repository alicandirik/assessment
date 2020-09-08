import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Board, Card, Table } from '../../../shared/types';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BoardActions, BoardState } from '../../../shared/states';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() tables: Table[];

  form: FormGroup;
  showOnDrag = false;
  showInput = false;
  board: Board;
  removeOldCard = false;

  constructor(
    private _fb: FormBuilder,
    private _store: Store
  ) {
  }

  ngOnInit() {
    this.form = this._createForm();
    this.board = this._store.selectSnapshot(BoardState.selected);
  }

  drop(event: CdkDragDrop<Card[]>): void {
    this.showOnDrag = true;

    if (event.previousContainer === event.container) {
      this.removeOldCard = false;
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.removeOldCard = true;

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    this.board.tables = this.tables;

    this._store.dispatch(new BoardActions.SetSelected(this.board));
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
    this.tables.push({
      name: this.form.get('title').value,
      showInput: false,
      cards: []
    });

    this.board.tables = this.tables;

    this._store.dispatch(new BoardActions.SetSelected(this.board));
    this.showInput = false;
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
    )
  }

  onAddCard(table: Table): void {
    table.cards.push({
      title: this.form.get('title').value,
      color: 'blue',
      tag: [],
      comment: ''
    })

    table.showInput = false;
  }

  private _createForm(title?: string): FormGroup {
    return this._fb.group({
      'title': new FormControl(title, Validators.required)
    })
  }
}
