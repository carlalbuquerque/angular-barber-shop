import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service.token';
import { IClientService } from '../../services/api-client/clients/iclients.service';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { ClientTableComponent } from "../components/client-table/client-table.component";
import { Router } from '@angular/router';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { ClientModelTable } from '../client.models';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-list-clients',
  imports: [ClientTableComponent],
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: ClientsService },
    { provide : SERVICES_TOKEN.SNACKBAR,useClass: SnackbarManagerService }

  ]
})

export class ListClientsComponent implements OnInit, OnDestroy {
  
  private httpSubscription: Subscription[] = []
  
  clients: ClientModelTable[] = []


  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpService: IClientService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly SnackBarManager: ISnackbarManagerService,
    private readonly router :Router
  ) { }
  ngOnInit(): void {
    this.httpSubscription.push(this.httpService.list().subscribe(data => this.clients = data))
  }
  ngOnDestroy(): void {
    this.httpSubscription.forEach(s => s.unsubscribe())

}

update(client: ClientModelTable){
  this.router.navigate(['clients/edit-client', client.id])
}
delete(client: ClientModelTable){
  this.httpSubscription.push(
    this.httpService.delete(client.id).subscribe(_ => this.SnackBarManager.show(`O cliente ${client.name} foi excluido com sucesso`))
  )
}
}
