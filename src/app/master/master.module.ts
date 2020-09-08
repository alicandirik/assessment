import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MasterComponent } from './master.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BoardComponent } from './board/board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TableComponent } from './board/table/table.component';
import { CardComponent } from './board/table/card/card.component';


@NgModule({
  declarations: [
    MasterComponent,
    DashboardComponent,
    BoardComponent,
    TableComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    SharedModule,
    DragDropModule
  ],
  providers: []
})
export class MasterModule {
}
