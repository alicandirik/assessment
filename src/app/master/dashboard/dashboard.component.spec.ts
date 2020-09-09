import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { TestingModule } from '../../testing/testing.module';
import { BoardActions, BoardState } from '../../shared/states';
import { Store } from '@ngxs/store';
import { Board } from '../../shared/types';

describe('DashboardComponent', () => {
  let store: Store;
  let board: Board;
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        TestingModule
      ]
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
      tables: []
    };

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form', () => {
    expect(component.form).toBeDefined();
  });

  it('should open create board', () => {
    store.dispatch(new BoardActions.Create(board));
    const boards = store.selectSnapshot(BoardState.entities);
    expect(boards.length).toBeGreaterThan(0);
  });

  it('should get board entities', () => {
    const boards = [board, board, board];
    boards.forEach(
      (board) => store.dispatch(new BoardActions.Create(board))
    );

    const entities = store.selectSnapshot(BoardState.entities);
    expect(entities.length).toBeGreaterThan(0);
  });

  it('should get selected board', () => {
    store.dispatch(new BoardActions.SetSelected(board));
    const b = store.selectSnapshot(s => s.board.selected);
    expect(b).toEqual(board);
  });

  it('should select color', function () {
    component.colors = [
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
    component.form.get('color').patchValue(component.colors[0].name);
    component.onSelectColor(0);
    expect(component.colors[0].checked).toBeTruthy();
  });

  it('should create board', function () {
    component.form.patchValue({
      name: 'test',
      color: 'green'
    });

    component.onCreate();
    const b = store.selectSnapshot(BoardState.selected);
    expect(b).not.toBeNull();
  });
});
