import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {processModels} from '../models/processModels';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

const HTTP_OPTION = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ProcessInstanceService {

 // private processInstanceList = 'http://localhost:8000/engine-rest/engine/default/process-instance';
  private processInstanceList = '/default/process-instance';

  constructor(private http: HttpClient) { }

  public getProcessInstanceList(): Observable<processModels> {
    return this.http.get<processModels>(this.processInstanceList);
  }

}
