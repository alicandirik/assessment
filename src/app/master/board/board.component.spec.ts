import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { TestingModule } from '../../testing/testing.module';
import { TableComponent } from './table/table.component';
import { CardComponent } from './table/card/card.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Store } from '@ngxs/store';
import { Board } from '../../shared/types';
import { BoardActions, BoardState, RecentlyViewedActions, RecentlyViewedState } from '../../shared/states';

describe('BoardComponent', () => {
  let store: Store;
  let board: Board;
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BoardComponent,
        TableComponent,
        CardComponent,
        DashboardComponent
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
          cards: []
        }
      ]
    };

    fixture = TestBed.createComponent(BoardComponent);
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

  it('should add board to recently viewed', () => {
    store.dispatch(new RecentlyViewedActions.Add(board));
    const boards = store.selectSnapshot(RecentlyViewedState.entities);
    expect(boards.length).toBeGreaterThan(0);
  });

  it('should reset selected board', () => {
    store.dispatch(new BoardActions.SetSelected(board));
    store.dispatch(new BoardActions.ResetSelected());
    const b = store.selectSnapshot(BoardState.selected);
    expect(b).toBeNull();
  });

  it('should have createdTime as today', () => {
    const b = board.createdAt.getDate();
    const n = new Date().getDate();

    expect(b).toEqual(n);
  });

  it('should have name as Test', () => {
    expect(board.name).toContain('Test');
  });

  it('should have id as test', () => {
    expect(board.id).toContain('test');
  });

  it('should have color as blue', () => {
    expect(board.color).toContain('blue');
  });

  it('should have creator as me', () => {
    expect(board.creator).toContain('Ali Can');
  });

  it('should have 1 table', () => {
    expect(board.tables.length).toBeGreaterThan(0);
  });
});
