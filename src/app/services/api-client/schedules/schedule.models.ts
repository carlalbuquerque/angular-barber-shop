export interface ScheduleAppointementMonthResponse {
    year: number,
    month:number,
    scheduledAppointments: ClientScheduleAppointmentResponse[];
}

export interface ClientScheduleAppointmentResponse{
    id: number,
    day:number,
    startAt: Date,
    endAt: Date,
    clientId: number,
    clientName: string

}

export interface SaveScheduleResponse{
    id:number,
    startAt: Date,
    endAt: Date,
    clientId: number


}

export interface SaveScheduleResquest{
    startAt: Date,
    endAt: Date,
    clientId: number

}