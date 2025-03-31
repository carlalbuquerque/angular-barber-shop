import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild, ViewChildren, } from '@angular/core';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import { IDialogManagerService } from '../../../services/idialog-manager.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ClientScheduleAppointmentModel, SaveScheduleModel, ScheduleAppointementMonthModel, SelectClientModel,  } from '../../schedule.models';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { YesNoDialogComponent } from '../../../commons/components/yes-no-dialog/yes-no-dialog.component';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-schedule-calendar',
  imports: [CommonModule,
            FormsModule,
            MatDatepickerModule,
            MatCardModule,
            MatTableModule,
            MatButtonModule,
            MatIconModule,
            MatPaginatorModule,
            MatTooltipModule,
            MatTimepickerModule,
            MatInputModule,
            MatFormFieldModule,
            MatSelectModule,],
  templateUrl: './schedule-calendar.component.html',
  styleUrl: './schedule-calendar.component.scss',
  providers:[provideNativeDateAdapter(),
    {
      provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService
    }
  ]
})

export class ScheduleCalendarComponent implements OnDestroy, AfterViewInit, OnChanges {

  private subscription?: Subscription

  private _selected: Date =  new Date();


  displayedColumns: string[] = ['startAt' , 'endAt' , 'client' , 'actions'];

  dataSource!: MatTableDataSource<ClientScheduleAppointmentModel>

  addingSchedule: boolean= false

  newSchedule: SaveScheduleModel = { startAt: undefined, endAt: undefined, clientId: undefined }

  clientSelectFormControl = new FormControl()

  @Input() monthSchedule!: ScheduleAppointementMonthModel
  @Input() clients: SelectClientModel[] = []

  @Output() onDateChange = new EventEmitter<Date>()
  @Output() onConfirmDelete = new EventEmitter<ClientScheduleAppointmentModel>()
  @Output() onScheduleClient = new EventEmitter<SaveScheduleModel>

  @ViewChild(MatPaginator) paginator!: MatPaginator


  constructor(
    @Inject(SERVICES_TOKEN.DIALOG) private readonly dialogManagerService: IDialogManagerService) { }

    get selected():Date{
      return this._selected
    }

    set selected(selected: Date){
      if(this._selected.getTime()!== selected.getTime()){
        this.onDateChange.emit(selected)
        this.buildTable()
        this._selected = selected
      }

    }
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }
  ngAfterViewInit(): void {
    if(this.dataSource && this.paginator){
      this.dataSource.paginator = this.paginator
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['monthSchedule'] && this.monthSchedule){
      this.buildTable()
    }
  }

  onSubmit(form: NgForm) {
    if (!this.monthSchedule) {
        console.error("Erro: monthSchedule está undefined.");
        return;
    }

    if (!this.monthSchedule.scheduledAppointments) {
        console.warn("scheduledAppointments estava undefined. Criando array vazio.");
        this.monthSchedule.scheduledAppointments = []; // Inicializa o array se for undefined
    }

    // Verifica se o cliente existe
    const client = this.clients.find(c => c.id === this.newSchedule.clientId);
    if (!client) {
        console.error("Erro: Cliente não encontrado.");
        return;
    }

    // Verifica se o clientId é válido
    if (!this.newSchedule.clientId || this.newSchedule.clientId <= 0) {
        console.error("Erro: ID do cliente inválido.");
        return;
    }

    // Certifique-se de que startAt e endAt estão definidos corretamente
    const startAt = new Date(this._selected);
    const endAt = new Date(this._selected);
    startAt.setHours(this.newSchedule.startAt?.getHours() || 0, this.newSchedule.startAt?.getMinutes() || 0);
    endAt.setHours(this.newSchedule.endAt?.getHours() || 0, this.newSchedule.endAt?.getMinutes() || 0);

    // Garantir que o ID seja gerado corretamente ou atribuído se já existir
    const saved: ClientScheduleAppointmentModel = {
        id: this.newSchedule.id && this.newSchedule.id > 0 ? this.newSchedule.id : Date.now(), // Gera um ID único ou usa o valor do ID
        day: this._selected.getDate(),
        startAt,
        endAt,
        clientId: this.newSchedule.clientId,  // ID do cliente utilizado diretamente aqui
        clientName: client.name  // Nome do cliente extraído da busca
    };

    // Agora você pode adicionar 'saved' à lista de agendamentos e realizar outras ações necessárias
    this.monthSchedule.scheduledAppointments.push(saved);
    this.onScheduleClient.emit(saved);
    this.buildTable();
    form.resetForm();
    this.newSchedule = {startAt: undefined, endAt: undefined, clientId: undefined}; // Resetando o formulário
}



requestDelete(schedule: ClientScheduleAppointmentModel) {
  this.subscription = this.dialogManagerService.showYesNoDialog(
    YesNoDialogComponent,
    { title: 'Exclusão de agendamento', content: 'Confirma a exclusão do agendamento?' }
  ).subscribe(result => {
    if (result) {
      this.onConfirmDelete.emit(schedule)
      const updatedeList = this.dataSource.data.filter(c => c.id !== schedule.id)
      this.dataSource = new MatTableDataSource<ClientScheduleAppointmentModel>(updatedeList)
      if (this.paginator) {
        this.dataSource.paginator = this.paginator
      }
    }
  })
}


  
  

onTimeChange(time: Date) {
  // Verifica se o valor 'time' é válido e se é uma instância válida de Date
  if (!(time instanceof Date) || isNaN(time.getTime())) {
    console.error("Erro: O valor de 'time' é inválido.");
    return;
  }

  // Atualiza o valor de 'endAt' no objeto newSchedule, adicionando 1 hora ao 'time'
  if (!this.newSchedule.endAt) {
    this.newSchedule.endAt = new Date(time.getTime());
  } else {
    this.newSchedule.endAt.setTime(time.getTime());
  }
  this.newSchedule.endAt.setHours(this.newSchedule.endAt.getHours() + 1); // Adiciona 1 hora

  console.log("Novo horário de término definido:", this.newSchedule.endAt);
}




  private buildTable(){
    if (!this.monthSchedule || !this.monthSchedule.scheduledAppointments) {
      console.warn("monthSchedule ou scheduledAppointments não definidos.");
      return;
    }
    const appointments = this.monthSchedule.scheduledAppointments.filter(a =>
      this.monthSchedule.year === this._selected.getFullYear() &&
      this.monthSchedule.month - 1 === this._selected.getMonth() &&
      a.day === this._selected.getDate()
    )
    this.dataSource = new MatTableDataSource<ClientScheduleAppointmentModel>(appointments);
     if(this.paginator){
      this.dataSource.paginator =this.paginator
     }
    }

}
