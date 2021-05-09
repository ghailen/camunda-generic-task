import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProcessInstanceService} from '../services/process-instance.service';
import {Language} from '../../configs/parametresDataTable';
import {processModels} from '../models/processModels';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';



@Component({
  selector: 'app-process-instance-details',
  templateUrl: './process-instance-details.component.html',
  styleUrls: ['./process-instance-details.component.css']
})
export class ProcessInstanceDetailsComponent implements OnInit {
  // @ts-ignore
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<String> = new Subject();
  processInstanceData: processModels;
  constructor(private processInstanceService: ProcessInstanceService, private router: Router) { }
  ngOnInit(): void {
    this.dtTrigger.next();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: Language
    };

    this.processInstanceService.getProcessInstanceList().subscribe(data => {
      this.processInstanceData = data;
      console.log('data', data);
      this.dtTrigger.next();
    });

  }

  viewTask(dataIdProcessInstance){
    console.log('dataIdProcessInstance', dataIdProcessInstance);
    this.router.navigate(['/process/task/' + dataIdProcessInstance]);
  }
}
