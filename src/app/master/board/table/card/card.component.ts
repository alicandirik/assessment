import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Card } from '../../../../shared/types';
import { NzModalService } from 'ng-zorro-antd';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

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
  tags = [];

  @ViewChild('modal', {static: false}) modal: TemplateRef<any>;
  @Input() card: Card;
  @Input() tableIndex: number;

  constructor(
    private _ms: NzModalService,
    private _fb: FormBuilder,
    private _store: Store
  ) {
  }

  ngOnInit() {
  }

  onDetail(): void {
    this.form = this._createForm(this.card);
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
