import { Component, OnInit } from '@angular/core';
import {TaskDetailsService} from '../services/task-details.service';
import {Language} from '../../configs/parametresDataTable';
import {ActivatedRoute, Router} from '@angular/router';
import {taskModels} from '../models/taskModels';
import {taskVariablesModels, variableValues} from '../models/taskVariableModels';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
private processInstanceId: string;
private taskData: taskModels;
private formData: any;
private taskVariableList: taskVariablesModels[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<String> = new Subject();

  dtOptionsVariables: DataTables.Settings = {};
  dtTriggerVariables: Subject<String> = new Subject();
  constructor(private taskDetailsService: TaskDetailsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.processInstanceId = this.route.snapshot.paramMap.get('id');
   // console.log('aaaaaa:' + this.processInstanceId);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: Language
    };
    this.dtOptionsVariables = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: Language
    };
    this.taskDetailsService.getActiveTaskData(this.processInstanceId).subscribe(data => {
      this.taskData = data;
      this.dtTrigger.next();
      //       console.log('data', this.taskData[0].id);

    }, (err) => { }, () => {
      this.getFormVariable(this.taskData[0].id);
    });
  }


  getFormVariable(id) {

    let ttt: taskVariablesModels[] = [];
    this.taskDetailsService.getFormVariableTaskData(id).subscribe(formVariable => {
      this.formData = formVariable;

      Object.keys(formVariable).forEach(function(key) {
        const variablesData = new taskVariablesModels;
        const value = formVariable[key];
       // console.log(key + ':' + value);
        variablesData.name = key;
        const variablesInfo: variableValues = new variableValues();
        Object.keys(value).forEach(function(key1) {
          const val = value[key1];
          // tslint:disable-next-line:triple-equals
          if (key1 == 'type') {variablesInfo.type = val;
          }
          // tslint:disable-next-line:triple-equals
          if (key1 == 'value') {
            variablesInfo.value = val;
          }
          // tslint:disable-next-line:triple-equals
          if (key1 == 'valueInfo') {
            variablesInfo.valueInfo = val;
          }
         // console.log(key1 + ':' + val);
        });
        variablesData.content = variablesInfo;

        console.log('variablesData.name' + variablesData.name);
        console.log('variablesData.content.type' + variablesData.content.type);
        console.log('variablesData.content.value' + variablesData.content.value);
        console.log('variablesData.content.valueInfo' + variablesData.content.valueInfo);

        ttt.push(variablesData);
        ttt = [...ttt];
      });
      ttt.forEach(m => {
        console.log('ttt ' + m.name);

      });
      this.taskVariableList = ttt;

      console.log('taskVariableList ' + this.taskVariableList);
      this.dtTriggerVariables.next();
    });


  }


  getData(taskVariableList) {
    console.log('hello ', taskVariableList);
 /*   const objVariable: Object = new Object;
    this.taskVariableList.forEach(ele => {

      objVariable['value'] = ele.content.value;
      objVariable['type'] = ele.content.type;
      // {"value" :"false", "type": "Boolean"}
    });*/


 /**la méthode au dessous consiste à faire le parsing depuis un array vers un json de cette format :
 /*
    {"variables":
      {
        "userName": {"value": "aStringValue"},
        "password": {"value": "strinj"},
        "ok": {"value": true},
        "okbool": {"value": true}
      }
    }*/
    let valueDataPartJson: Object;
    const nameDataPartJson = {};
    const variablesStaticDataPartJson = {};


    for (const key of taskVariableList) {
      valueDataPartJson = new Object();
      // tslint:disable-next-line:triple-equals
      if (key.content.value == null && key.content.type == 'String') {
        valueDataPartJson['value'] = '';
        // tslint:disable-next-line:max-line-length triple-equals
      } else if (key.content.value == null && (key.content.type == 'Long' || key.content.type == 'Double')) { valueDataPartJson['value'] = 0; } else { valueDataPartJson['value'] = key.content.value; }
      nameDataPartJson[key.name] = valueDataPartJson;
    }
    variablesStaticDataPartJson['variables'] = nameDataPartJson;
    console.log('obj2', variablesStaticDataPartJson);
    console.log('obj3', variablesStaticDataPartJson);


    this.taskDetailsService.putFormVariableTask(this.taskData[0].id, variablesStaticDataPartJson).subscribe(responseBody => {
      console.log('added data:', responseBody);
    });

    setTimeout(() => { this.router.navigate(['/process']);}, 1000 );
  }



  selectedCheckbox(event) {
    this.taskVariableList.forEach(ele => {
      // tslint:disable-next-line:triple-equals
      if (ele.name == event.target.value) {
        ele.content.value = event.target.checked;
      }
    });
}


  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.dtTriggerVariables.unsubscribe();
  }
}


