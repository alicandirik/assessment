import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { TestingModule } from '../../../../testing/testing.module';
import { Store } from '@ngxs/store';
import { Board } from '../../../../shared/types';
import { BoardActions, BoardState } from '../../../../shared/states';

describe('CardComponent', () => {
  let store: Store;
  let board: Board;
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [TestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    board = {
      name: 'Test',
      color: 'blue',
      id: 'test',
      creator: 'Ali Can Dirik',
      createdAt: new Date(),
      viewedAt: new Date(),
      tables: [
        {
          name: 'table1',
          showInput: false,
          cards: [
            {
              title: 'card',
              comment: 'comment area',
              tag: ['tag1', 'tag2'],
              color: 'magenta',
              showInput: false
            }
          ]
        }
      ]
    };

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selected board', () => {
    store.dispatch(new BoardActions.SetSelected(board));
    const b = store.selectSnapshot(BoardState.selected);
    expect(b).toEqual(board);
  });

  it('should add new tag', () => {
    component.form = component.createForm(board.tables[0].cards[0]);
    component.form.get('tag').patchValue(['test']);
    component.card = {...board.tables[0].cards[0]};
    component.tags = [...board.tables[0].cards[0].tag];
    component.onAddTag();
    expect(component.tags.length).toEqual(2);
  });

  it('should add new card', () => {
    let cards = board.tables[0].cards;
    cards.push({
      title: 'new card',
      tag: [],
      showInput: false,
      color: 'magenta',
      comment: ''
    });
    expect(cards.length).toEqual(2);
  });

  it('should delete card', () => {
    component.board = {...board};
    component.cardIndex = 0;
    component.tableIndex = 0;
    component.onConfirmDelete();
    expect(component.board.tables[0].cards.length).toEqual(0);
  });
});
