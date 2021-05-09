import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProcessInstanceDetailsComponent} from './process-instance-details/process-instance-details.component';
import {TaskDetailsComponent} from './task-details/task-details.component';


const routes: Routes = [
  {path: '', component: ProcessInstanceDetailsComponent},
  {path: 'task/:id', component: TaskDetailsComponent},
  {path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
// tslint:disable-next-line:class-name
export class processRoutingModule { }
