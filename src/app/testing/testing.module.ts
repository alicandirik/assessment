import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { en_US, NgZorroAntdModule, NZ_I18N } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../../environments/environment';
import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { DragDropModule, DragDropRegistry } from '@angular/cdk/drag-drop';
import { BoardState, RecentlyViewedState } from '../shared/states';
import { RouterTestingModule } from '@angular/router/testing';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterTestingModule,
    DragDropModule,
    NgxsModule.forRoot([
      BoardState,
      RecentlyViewedState
    ]),
    ...environment.plugins
  ],
  providers: [
    {provide: NZ_I18N, useValue: en_US},
    ViewportRuler,
    Platform,
    DragDropRegistry,
    ScrollDispatcher
  ],
  exports: [
    SharedModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterTestingModule,
    DragDropModule
  ]
})
export class TestingModule { }
