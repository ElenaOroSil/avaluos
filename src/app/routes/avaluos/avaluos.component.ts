import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MatDialog } from '@angular/material/dialog';

import { AvaluosDataService } from './data.service';
import { AltaDialogComponent } from './alta-dialog/alta-dialog.component';
import { Router, NavigationExtras } from '@angular/router';
import { CatalogosService } from './../../_services';
import { Catalogo } from './../../_models/catalogo.model';
import { first } from 'rxjs/operators';
import { AvaluosService } from './../../_services';
import { DetalleAvaluo, FilterAvaluo } from './../../_models/avaluo.model'; 

import { Observable, ReplaySubject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { TableColumn } from './../../../@vex/interfaces/table-column.interface';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import theme from './../../../@vex/utils/tailwindcss';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { filter } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material/select';
import { stagger40ms } from './../../../@vex/animations/stagger.animation';
import { fadeInUp400ms } from './../../../@vex/animations/fade-in-up.animation';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { formatDate } from "@angular/common";


export interface FilterElements {
  folio: string;
  solicitante: string;
  fechaInicial: Date;
  fechaFinal: Date;
  idtipoavaluo: number;
  idestatusavaluo: number;
}

@Component({
  selector: 'app-avaluos',
  styleUrls: ['./avaluos.component.scss'],
  templateUrl: './avaluos.component.html',
  providers: [AvaluosDataService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
})

export class AvaluosComponent implements OnInit, AfterViewInit, OnDestroy {

  layoutCtrl = new FormControl('boxed'); 
  reactiveForm: FormGroup;
  list = [];
  loading = false;
  isLoading = true;
  name: string;
  color: string;

  subject$: ReplaySubject<DetalleAvaluo[]> = new ReplaySubject<DetalleAvaluo[]>(1);
  data$: Observable<DetalleAvaluo[]> = this.subject$.asObservable();
  tpoAvaluo: Catalogo[];
  estatusAvaluo: Catalogo[];
  idusuario: string;
  dataAvaluo: DetalleAvaluo[];

  folioFilter = new FormControl();
  solicitanteFilter = new FormControl();
  fechaInicialFilter = new FormControl();
  fechaFinalFilter = new FormControl();
  tpoAvaluoFilter = new FormControl();
  estatusavaluoFilter = new FormControl();

  idtipoAvaluo: number;
  idestatusAvaluo: number;
  solicitante: string;
  filterAvaluo: FilterAvaluo[];
  folio: string;

  filteredValues = { folio:'', fechaInicial:'', fechaFinal:'', idtipoavaluo: 0, solicitante:'', idestatusavaluo: 0 };

  //Nombre de columnas en tabla
  @Input()
  columns: TableColumn<DetalleAvaluo>[] = [
    { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: 'Folio', property: 'folio', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-small']},
    { label: 'IdTipoAvaluo', property: 'idtipoavaluo', type: 'text', visible: false },
    { label: 'Tipo avalúo', property: 'tipoavaluo', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Perito', property: 'perito', type: 'text', visible: true },
    { label: 'IdSociedad', property: 'idSociedad', type: 'text', visible: false },
    { label: 'Sociedad', property: 'sociedad', type: 'text', visible: true },
    { label: 'Responsable', property: 'responsable', type: 'text', visible: true },
    { label: 'Solicitante', property: 'solicitante', type: 'text', visible: true },
    { label: 'Propietario', property: 'propietario', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Fecha avalúo', property: 'fechaavaluo', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'IdEstatusAvaluo', property: 'idestatusavaluo', type: 'text', visible: false},
    { label: 'Estatus avalúo', property: 'estatusavaluo', type: 'text', visible: true },
    { label: 'Acciones', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<DetalleAvaluo> | null;
  selection = new SelectionModel<DetalleAvaluo>(true, []);

  searchCtrl = new FormControl();
  theme = theme;


  //Paginación y sort 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private fb: FormBuilder,
    public dialog1: MtxDialog,
    public dialog: MatDialog,
    private router: Router,
    private catalogoService: CatalogosService,
    private avaluosService: AvaluosService) {
    this.reactiveForm = this.fb.group({
      fechaInicial: ['', [Validators.required]],
      fechaFinal: ['', [Validators.required]],
    });  

   }

  //muestra columnas en tabla
   get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() { 


    //llena catalogos
    this.getTpoAvaluo("TIPOAVALUO");
    this.getEstatusAvaluo("ESTATUSAVALUO");

    //busca avaluos
    this.searchAvaluos();
      
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(
      filter<DetalleAvaluo[]>(Boolean)
    ).subscribe(dataAvaluo => {
      this.dataAvaluo = dataAvaluo;
      this.dataSource.data = dataAvaluo;
    });

 
  }
 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  deleteAvaluo(detalleAvaluo: DetalleAvaluo) {
    this.dataAvaluo.splice(this.dataAvaluo.findIndex((existingCustomer) => existingCustomer.folio === detalleAvaluo.folio), 1);
    this.selection.deselect(detalleAvaluo);
    this.subject$.next(this.dataAvaluo);
  }

  //elimina el avalúo seleccionado
  deleteAvaluos(customers: DetalleAvaluo[]) {
    customers.forEach(c => this.deleteAvaluo(c));
  }

  //Va a la página de detalle de avalúos
  irDetalle(value: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "folio": value.folio,
          "perito": value.perito,
          "fechaAvaluo": value.fechaavaluo,
          "sociedad": value.sociedad,
          "estatusavaluo": value.estatusavaluo
      }
  };
    this.router.navigate(["page2"], navigationExtras);
    this.router.navigate(['/admin-layout/avaluos-layout'], navigationExtras);
  }

  limpiarDatos(){
      this.folioFilter.setValue('');
      this.fechaInicialFilter.setValue('');
      this.fechaFinalFilter.setValue('');
      this.tpoAvaluoFilter.setValue(0);
      this.solicitanteFilter.setValue('');
      this.estatusavaluoFilter.setValue(0);
      this.searchAvaluos();
  }

  open(value: any) {
    this.dialog1.alert(`You have deleted ${value.position}!`);
  }

  //Abre modal para el registro de avalúo
  openDialog(): void {
    const dialogRef = this.dialog.open(AltaDialogComponent, {
      width: '800px',
    });
  
    dialogRef.afterClosed().subscribe(res => {
      this.searchAvaluos();
    });
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

  //manejo de checkbox
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  onLabelChange(change: MatSelectChange, row: DetalleAvaluo) {
    const index = this.dataAvaluo.findIndex(c => c === row);
    //this.tpoAvaluo[index].labels = change.value;
    this.subject$.next(this.dataAvaluo);
  }

  ngOnDestroy() {
  }

  updateCustomer() {
   
    console.log("UPDATE")
  }


  //Llama servicio para catálogo Tipo avalúo
  getTpoAvaluo (tipo: string) {

    this.loading = true;
    this.catalogoService.getCatalogoAvaluo(tipo)
          .pipe(first())
          .subscribe( data => {                    
                this.loading = false;
                this.tpoAvaluo = data;
         
              },
              error => {
                //this.error = error;
     
                  this.loading = false;
              });    
  }

  //Llama servicio para catálogo Estatus avalúo
  getEstatusAvaluo (tipo: string) {

    this.loading = true;
   this.catalogoService.getCatalogoAvaluo(tipo)
          .pipe(first())
          .subscribe( data => {                    
                this.loading = false;
                this.estatusAvaluo = data;
             
              },
              error => {
                //this.error = error;
         
                  this.loading = false;
              });    
  }


 //Llama servicio para la consulta de avalúos en tabla
  searchAvaluos () {

    let data = JSON.parse(localStorage.getItem('currentUser'));
    let usuario = data["usuario"]
    let iduser = Object.values(usuario)
    this.idusuario = String(iduser[0]);

   this.loading = true;
   this.avaluosService.searchAvaluos(this.idusuario)
          .pipe(first())
          .subscribe( data => {                    
                this.loading = false;
                this.dataAvaluo = data

                this.subject$.next(this.dataAvaluo);
             
              },
              error => {
                //this.error = error;
       
                  this.loading = false;
              });    
  }

  filtrarDatos () {

      const format = "yyyy/MM/dd";
      const locale = 'en-US'; 
      let fechaInicial: string; 
      let fechaFinal: string;  

      if (this.folioFilter.value == null) {              
        this.folio = "";
      } else {
          this.folio = this.folioFilter.value;
      }

    if (this.fechaInicialFilter.value != null && this.fechaInicialFilter.value != "" ) {
      let fechaIni = new Date(this.fechaInicialFilter.value)
      fechaInicial = formatDate(fechaIni, format, locale);

      } else {
        fechaInicial = ""; 
      }
   

      if (this.fechaFinalFilter.value != null && this.fechaFinalFilter.value != "" ) {
      let fechaFin = new Date(this.fechaFinalFilter.value)
      fechaFinal = formatDate(fechaFin, format, locale);
      } else {
        fechaFinal = "";
      }

      if (this.tpoAvaluoFilter.value == null) {
        this.idtipoAvaluo = 0;
        } else {
          this.idtipoAvaluo = this.tpoAvaluoFilter.value
        }

        if (this.estatusavaluoFilter.value == null) {
          this.idestatusAvaluo = 0;
        } else {
            this.idestatusAvaluo = this.estatusavaluoFilter.value
        }

          if (this.solicitanteFilter.value == null) {              
            this.solicitante = "";
          } else {
              this.solicitante = this.solicitanteFilter.value;
          }

    this.filteredValues['folio'] = this.folio;
    this.filteredValues['fechaInicial'] = fechaInicial;
    this.filteredValues['fechaFinal'] = fechaFinal;
    this.filteredValues['idtipoavaluo'] = this.idtipoAvaluo;
    this.filteredValues['solicitante'] = this.solicitante;
    this.filteredValues['idestatusavaluo'] = this.idestatusAvaluo;

    this.filterAvaluo = Array.of(this.filteredValues)

    this.loading = true;
    this.avaluosService.filterAvaluos(this.filterAvaluo)
          .pipe(first())
          .subscribe( data => {                    
                this.loading = false;
                this.dataAvaluo = data

                this.subject$.next(this.dataAvaluo);
             
              },
              error => {
                //this.error = error;
     
                  this.loading = false;
              });    
  }

 


}
