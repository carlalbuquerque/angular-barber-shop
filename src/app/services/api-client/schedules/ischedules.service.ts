import { Observable } from "rxjs";
import {  ScheduleAppointementMonthResponse, SaveScheduleResponse, SaveScheduleResquest } from "./schedule.models";

export interface IScheduleService{
    save(request: SaveScheduleResquest): Observable<SaveScheduleResponse>

    delete(id: number): Observable<void>

    listInMonth(year: number, month: number): Observable<ScheduleAppointementMonthResponse>
}