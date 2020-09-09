import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { TestingModule } from '../../../testing/testing.module';
import { CardComponent } from './card/card.component';
import { Store } from '@ngxs/store';
import { Board } from '../../../shared/types';
import { BoardActions, BoardState } from '../../../shared/states';

describe('TableComponent', () => {
  let store: Store;
  let board: Board;
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TableComponent,
        CardComponent
      ],
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

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update board', () => {
    store.dispatch(new BoardActions.SetSelected(board));
    const b = store.selectSnapshot(BoardState.selected);
    expect(b).toEqual(board);
  });

  it('should call create list', () => {
    component.tables = board.tables;
    component.onCreateList();
    expect(component.form).toBeDefined();
  })

  it('should add new list', () => {
    component.board = {...board};
    component.form.get('title').patchValue('test');
    component.board.tables = [...board.tables];
    component.onAddList();
    expect(component.board.tables.length).toEqual(1);
  });

  it('should delete list', () => {
    let tables = [...board.tables];
    tables = [...tables.slice(1)];
    expect(component.tables.length).toEqual(board.tables.length - 1);
  });

  it('should add new card', () => {
    component.tables = board.tables;
    component.tables[0].cards = [...board.tables[0].cards];
    component.onAddCard(component.tables[0]);
    expect(component.tables[0].cards.length).toEqual(2);
  });

  it('should delete card', () => {
    let cards = [...board.tables[0].cards];
    cards = [...cards.slice(1)];
    expect(cards.length).toEqual(0);
  });
});
