import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { BoardState, RecentlyViewedState } from './states';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([
      BoardState,
      RecentlyViewedState
    ])
  ],
  exports: [
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
