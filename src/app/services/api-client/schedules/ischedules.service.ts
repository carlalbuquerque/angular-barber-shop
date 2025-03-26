import { Observable } from "rxjs";
import { saveScheduleResquest, ScheduleAppointementMonthResponse, saveScheduleResponse } from "./schedule.models";

export interface IScheduleService{
    save(request: saveScheduleResquest): Observable<saveScheduleResponse>

    delete(id: number): Observable<void>

    listInMonth(year: number, month: number): Observable<ScheduleAppointementMonthResponse>
}