import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {taskModels} from '../models/taskModels';


const HTTP_OPTION = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TaskDetailsService {

 // private taskUrl = 'http://localhost:8000/engine-rest/engine/default/task';
  private taskUrl = '/default/task';
  private processVariableUrl = 'http://localhost:8000/engine-rest/engine/default/process-instance';

  private taskVariableUrl = ' http://localhost:8000/engine-rest/engine/default/task/9879c075-7d6b-11ea-a8d7-48f17f00bb77/complete';


  constructor(private http: HttpClient) { }

  public getActiveTaskData(id): Observable<taskModels> {
    return this.http.get<taskModels>(this.taskUrl + '/?processInstanceId=' + id + '&active=true');
  }


  public getFormVariableTaskData(id): Observable<any> {
    return this.http.get<any>(this.taskUrl + '/' + id + '/form-variables');
  }

/** add variable data using process instance api**/
  /*  public putFormVariableTask(id, varName, requestBody) {
    return this.http.put(this.processVariableUrl + '/' + id + '/variables/' + varName, requestBody, HTTP_OPTION);
  }*/
  /** add variable data using userTask api**/
    public putFormVariableTask(idTask, requestBody) {
  return this.http.post(this.taskUrl + '/' + idTask + '/complete', requestBody, HTTP_OPTION);
}


}
