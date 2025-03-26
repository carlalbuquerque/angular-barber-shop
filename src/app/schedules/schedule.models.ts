export interface ScheduleAppointementMonthModel {
    year: number
    month:number
    scheduledAppointments: ClientScheduleAppointmentModel[]
}

export interface ClientScheduleAppointmentModel{
    id: number
    day:number
    startAt: Date
    endAt: Date
    clientId: number
    clientName: string

}

export interface saveScheduleModel{
    startAt?: Date
    endAt?: Date
    clientId?: number


}

export interface selectClientModel{
    id: number
    name: string

}