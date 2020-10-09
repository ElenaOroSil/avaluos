import { Component, OnInit, Input } from '@angular/core';
import { Catalogo } from './../../../_models/catalogo.model';
import { TableColumn } from './../../../../@vex/interfaces/table-column.interface';

@Component({
  selector: 'app-listamatrices-dialog',
  templateUrl: './listamatrices-dialog.component.html',
  styleUrls: ['./listamatrices-dialog.component.scss']
})
export class ListamatricesDialogComponent implements OnInit {

  //registro CATÁLOGOS
  edoConservacion: Catalogo[];

   //Nombre de columnas en tabla
   @Input()
   columns: TableColumn<Catalogo>[] = [
     { label: '', property: 'clave', type: 'text', visible: false},
     { label: '', property: 'descripcionPartidaPorcentaje', type: 'text', visible: true },
     { label: 'Puntos por partida', property: 'puntosPartida', type: 'text', visible: true },
     { label: 'Estado de conservación Observado', property: 'idPartidaConserva', type: 'text', visible: true},
     { label: 'Mantenimiento requerido', property: 'manttRequerido', type: 'text', visible: true},
     { label: 'Índice de conservación', property: 'indiceConservacion', type: 'text', visible: true },
     { label: 'Vida mínima (años)', property: 'vidaMinimaAnios', type: 'text', visible: true },
     { label: 'Puntos ajustados', property: 'puntosAjustados', type: 'text', visible: true },
   ];

  constructor() { }

  ngOnInit(): void {
  }

}
