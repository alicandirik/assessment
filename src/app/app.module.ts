import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { DragDropRegistry } from '@angular/cdk/drag-drop';
import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot(),
    ...environment.plugins,
  ],
  providers: [
    {provide: NZ_I18N, useValue: en_US},
    ViewportRuler,
    Platform,
    DragDropRegistry,
    ScrollDispatcher
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
