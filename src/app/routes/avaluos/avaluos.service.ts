import { Injectable } from '@angular/core';

import { MtxGridColumn } from '@ng-matero/extensions';


@Injectable()
export class AvaluosBasicService {
  columns: MtxGridColumn[] = [
    {
      title: 'Select',
      index: 'select',
      type: 'checkbox',
      fixed: 'left',
      width: '30px',
      checked: true,
    },
    { title: 'Folio', index: 'position', width: 'auto', sort: true, checked: true },
    { title: 'Producto', index: 'name', width: 'auto', sort: true, checked: true },
    { title: 'Origen', index: 'weight', width: 'auto', checked: true },
    { title: 'Tipo de inmueble', index: 'symbol', width: 'auto', checked: true },
    { title: 'Valuador', index: 'gender', width: 'auto', checked: true },
    { title: 'Responsable', index: 'mobile', width: 'auto', checked: false },
    { title: 'Propietario', index: 'tele', width: 'auto', checked: true },
    { title: 'Solicitante', index: 'city', width: 'auto', checked: true },
    { title: 'Fecha', index: 'address', width: '90px', checked: true },
    { title: 'Estatus', index: 'date', width: 'auto', checked: true },
  ];



  getColumns(fn1: (record: any) => void,fn2: (record: any) => void,fn3: (record: any) => void,fn4: (record: any) => void) {
    this.columns.push({
      title: '',
      index: 'option',
      width: 'auto',
      fixed: 'right',
      right: '0px',
      type: 'button',
      checked: true,
      buttons: [
       
        {
          icon: 'info',
          tooltip: 'Detalle',
          type: 'icon',
          click: fn1,
        },
        {
          icon: 'filter_none',
          tooltip: 'Copiar',
          type: 'icon',
          click: fn2,
        },
        {
          icon: 'edit',
          tooltip: 'Editar',
          color: 'warn',
          type: 'icon',
          click: fn3,
        },
        {
          icon: 'more_vert',
          tooltip: 'Menú',
          type: 'icon',
          click: fn4,
        },
       
       
      ],
    });
    return this.columns;
  }

  


  constructor() {}
}


