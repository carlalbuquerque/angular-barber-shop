import { Injectable } from '@angular/core';
import { IScheduleService } from './ischedules.service'; 
import { Observable } from 'rxjs';
import { saveScheduleResquest, saveScheduleResponse, ScheduleAppointementMonthResponse } from './schedule.models';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService implements IScheduleService{

  private readonly basePath = environment.apiUrl

  constructor(private http: HttpClient) { }
  save(request: saveScheduleResquest): Observable<saveScheduleResponse> {
    return this.http.post<saveScheduleResponse>(`${this.basePath}schedules`, request)
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}schedules/${id}`)
  }
  
  listInMonth(year: number, month: number): Observable<ScheduleAppointementMonthResponse> {
    return this.http.get<ScheduleAppointementMonthResponse>(`${this.basePath}schedules/${year}/${month}`)
  }
  
}
