import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";


@Injectable({
    providedIn: 'root'
})

export class customPaginator extends MatPaginatorIntl{

    override  itemsPerPageLabel = 'Item por página';
    override  nextPageLabel = 'Proxima página';
    override  previousPageLabel = 'Página anterior';
    override  firstPageLabel = 'Primeira página';
    override  lastPageLabel = 'Ultima página';
    




}