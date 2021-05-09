import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {processRoutingModule} from './process-routing.module';
import {ProcessInstanceDetailsComponent} from './process-instance-details/process-instance-details.component';
import {TaskDetailsComponent} from './task-details/task-details.component';
import {DataTablesModule} from 'angular-datatables';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [ProcessInstanceDetailsComponent, TaskDetailsComponent],
  imports: [
    CommonModule,
    processRoutingModule,
    DataTablesModule,
    FormsModule
  ],
  exports: []
})
export class ProcessModule { }
