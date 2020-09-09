import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Board, Card } from '../../../../shared/types';
import { NzModalService } from 'ng-zorro-antd';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { BoardActions, BoardState } from '../../../../shared/states';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {

    private _destroyer$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    private _updateBoard$: Subject<Board> = new Subject<Board>();

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
    board: Board;
    tags = [];
    showConfirm = false;

    @ViewChild('modal', {static: false}) modal: TemplateRef<any>;
    @Input() card: Card;
    @Input() cardIndex: number;
    @Input() tableIndex: number;

    constructor(
        private _ms: NzModalService,
        private _fb: FormBuilder,
        private _store: Store
    ) {
    }

    ngOnInit() {
        this._updateBoard$
            .asObservable()
            .pipe(
                takeUntil(this._destroyer$)
            )
            .subscribe(
                (board) => this._store.dispatch(new BoardActions.SetSelected(board))
            );

        this._ms
            .afterAllClose
            .pipe(
                takeUntil(this._destroyer$)
            )
            .subscribe(
                () => this.showConfirm = false
            )
    }

    ngOnDestroy() {
        this._destroyer$.next(true);
        this._destroyer$.complete();
    }

    onDetail(): void {
        this.form = this._createForm(this.card);
        this.board = this._store.selectSnapshot(BoardState.selected);
        this.tags = this.card.tag;
        const color = this.colors.filter(c => c.name === this.card.color)[0];
        color.checked = true;

        this._ms.create({
            nzTitle: 'Card Detail',
            nzContent: this.modal,
            nzMask: true,
            nzMaskClosable: false,
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

    onAddTag(): void {
        const tag = this.form.get('tag').value;
        this.card.tag.push(tag);
        this.form.get('tag').reset();
    }

    removeTag(idx: number): void {
        this.card.tag[idx].slice(idx);
    }

    onSave(): void {
        const value = this.form.getRawValue();
        value.tag = this.tags;
        this.card = value;

        this.board.tables[this.tableIndex].cards[this.cardIndex] = this.card;
        this._updateBoard$.next(this.board);
        this._ms.closeAll();
    }

    onDeleteCard(): void {
        this.showConfirm = true;
    }

    onConfirmDelete(): void {
        this.board.tables[this.tableIndex].cards.splice(this.cardIndex, 1);
        this._updateBoard$.next(this.board);
        this._ms.closeAll();
    }

    private _createForm(card: Card): FormGroup {
        return this._fb.group({
            title: new FormControl(card.title, Validators.required),
            color: new FormControl(card.color, Validators.required),
            comment: new FormControl(card.comment, Validators.required),
            tag: new FormControl(null, Validators.required)
        });
    }

}
