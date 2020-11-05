
import { Component, OnInit, Input, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Customer } from './../../models/customer.model';
import { Observable, of, ReplaySubject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { TableColumn } from './../../../@vex/interfaces/table-column.interface';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { aioTableData, aioTableLabels } from './../../../static-data/aio-table-data';
import theme from './../../../@vex/utils/tailwindcss';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { filter } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatSelectChange } from '@angular/material/select';
import { stagger40ms } from './../../../@vex/animations/stagger.animation';
import { fadeInUp400ms } from './../../../@vex/animations/fade-in-up.animation';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { ComunicadosService } from './../../_services/comunicados.service';
import { first } from 'rxjs/operators';
import { Comunicados } from './../../_models/comunicados.model';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]
})
export class InicioComponent implements OnInit, AfterViewInit, OnDestroy {

  comunicadosFormGroup: FormGroup;
  subject$: ReplaySubject<Customer[]> = new ReplaySubject<Customer[]>(1);
  data$: Observable<Customer[]> = this.subject$.asObservable();
  customers: Customer[];
  msg= '';
  classAlert: string;

  @Input()
  columns: TableColumn<Customer>[] = [
    { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: 'Folio', property: 'folio', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-small']},
    { label: 'Producto', property: 'producto', type: 'text', visible: true },
    { label: 'Origen', property: 'origen', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Tipo de inmueble', property: 'tipoInmueble', type: 'text', visible: true },
    { label: 'Valuador', property: 'valuador', type: 'text', visible: true },
    { label: 'Responsable', property: 'responsable', type: 'text', visible: true },
    { label: 'Propietario', property: 'propietario', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Solicitante', property: 'solicitante', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Fecha', property: 'fecha', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Estatus', property: 'labels', type: 'button', visible: true },
    { label: 'Acciones', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<Customer> | null;
  selection = new SelectionModel<Customer>(true, []);
  searchCtrl = new FormControl();
  loading = false;
  info: Comunicados;

  labels = aioTableLabels;
  theme = theme;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    public dialog1: MtxDialog,
    public dialog: MatDialog,
    private comunicadosService: ComunicadosService) { }

    get visibleColumns() {
      return this.columns.filter(column => column.visible).map(column => column.property);
    }
  
    /**
     * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
     * We are simulating this request here.
     */
    getData() {
      return of(aioTableData.map(customer => new Customer(customer)));
    }
  
    ngOnInit() {

     this.searchComunicados();

      this.getData().subscribe(customers => {
        this.subject$.next(customers);
      });

      this.dataSource = new MatTableDataSource();
  
      this.data$.pipe(
        filter<Customer[]>(Boolean)
      ).subscribe(customers => {
        this.customers = customers;
        this.dataSource.data = customers;
      });
  
      this.searchCtrl.valueChanges.pipe(
        untilDestroyed(this)
      ).subscribe(value => this.onFilterChange(value));
    }
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    //Llama servicio para la consulta de comunicados
  searchComunicados () {

    this.loading = true;
    this.comunicadosService.getComunicados()
           .pipe(first())
           .subscribe( data => {                    
                 this.loading = false;
                 this.info = data.comunicados;
                
                 console.log("this.info")
                  console.log(this.info)
               },
               error => {  
                this.loading = false;
                this.msg = error;
                this.classAlert = 'alert-danger alert alert-dismissible fade show';
               });               
               
       }
  
  
  
    deleteCustomer(customer: Customer) {
      /**
       * Here we are updating our local array.
       * You would probably make an HTTP request here.
       */
      this.customers.splice(this.customers.findIndex((existingCustomer) => existingCustomer.folio === customer.folio), 1);
      this.selection.deselect(customer);
      this.subject$.next(this.customers);
    }
  
    deleteCustomers(customers: Customer[]) {
      /**
       * Here we are updating our local array.
       * You would probably make an HTTP request here.
       */
      customers.forEach(c => this.deleteCustomer(c));
    }
  
    onFilterChange(value: string) {
      if (!this.dataSource) {
        return;
      }
      value = value.trim();
      value = value.toLowerCase();
      this.dataSource.filter = value;
    }
  
    toggleColumnVisibility(column, event) {
      event.stopPropagation();
      event.stopImmediatePropagation();
      column.visible = !column.visible;
    }
  
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
    }
  
    trackByProperty<T>(index: number, column: TableColumn<T>) {
      return column.property;
    }
  
    onLabelChange(change: MatSelectChange, row: Customer) {
      const index = this.customers.findIndex(c => c === row);
      this.customers[index].labels = change.value;
      this.subject$.next(this.customers);
    }
  
    ngOnDestroy() {
    }

    createCustomer() {
      
console.log("CREATE")
    }
  
    updateCustomer() {
     
      console.log("UPDATE")
    }
  }
  