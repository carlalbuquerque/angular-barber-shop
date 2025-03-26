export interface ScheduleAppointementMonthResponse {
    year: number
    month:number
    scheduledAppointments: ClientScheduleAppointmentResponse[]
}

export interface ClientScheduleAppointmentResponse{
    id: number
    day:number
    startAt: Date
    endAt: Date
    clientId: number
    clientName: string

}

export interface saveScheduleResponse{
    id:number
    startAt: Date
    endAt: Date
    clientId: number


}

export interface saveScheduleResquest{
    startAt: Date
    endAt: Date
    clientId: number

}