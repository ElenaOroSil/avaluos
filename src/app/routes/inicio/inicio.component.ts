
import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MatDialog} from '@angular/material/dialog';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ComunicadosService } from './../../_services/comunicados.service';
import { first } from 'rxjs/operators';
import { Comunicados } from './../../_models/comunicados.model';
import { ReporteSeguimiento } from './../../_models/avaluo.model';
import { AvaluosService } from './../../_services';
import { AvaluosDataService } from './../../routes/avaluos/data.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { stagger40ms } from './../../../@vex/animations/stagger.animation';
import { fadeInUp400ms } from './../../../@vex/animations/fade-in-up.animation';
import { FormControl } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { TableColumn } from './../../../@vex/interfaces/table-column.interface';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import theme from './../../../@vex/utils/tailwindcss';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { filter } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
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

export class InicioComponent implements OnInit, AfterViewInit, OnDestroy {

  comunicadosFormGroup: FormGroup;
  msg= '';
  classAlert: string;
  loading = false;
  info: Comunicados;
  layoutCtrl = new FormControl('boxed'); 
  reactiveForm: FormGroup;
  list = [];
  isLoading = true;
  name: string;
  color: string;

  subject$: ReplaySubject<ReporteSeguimiento[]> = new ReplaySubject<ReporteSeguimiento[]>(1);
  data$: Observable<ReporteSeguimiento[]> = this.subject$.asObservable();
  dataAvaluo: ReporteSeguimiento[];

  idtipoAvaluo: number;
  idestatusAvaluo: number;
  solicitante: string;
  folio: string;


    //Nombre de columnas en tabla
    @Input()
    columns: TableColumn<ReporteSeguimiento>[] = [
      { label: 'IdSociedad', property: 'idSociedad', type: 'text', visible: false },
      { label: 'Sociedad', property: 'sociedad', type: 'text', visible: true },
      { label: 'IdPerito', property: 'idPerito', type: 'text', visible: false },
      { label: 'Perito', property: 'perito', type: 'text', visible: true },
      { label: 'IdTipoAvaluo', property: 'idtipoavaluo', type: 'text', visible: false },
      { label: 'Tipo avalúo', property: 'tipoavaluo', type: 'text', visible: true, cssClasses: ['font-medium'] },
      { label: 'IdEstatusAvaluo', property: 'idestatusavaluo', type: 'text', visible: false},
      { label: 'Estatus avalúo', property: 'estatusavaluo', type: 'text', visible: true },
      { label: 'Registros', property: 'registros', type: 'text', visible: true },
    ];

    pageSize = 10;
    pageSizeOptions: number[] = [5, 10, 20, 50];
    dataSource: MatTableDataSource<ReporteSeguimiento> | null;
    selection = new SelectionModel<ReporteSeguimiento>(true, []);
  
    searchCtrl = new FormControl();
    theme = theme;


 //Paginación y sort 
 @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
 @ViewChild(MatSort, { static: true }) sort: MatSort;


 constructor(private fb: FormBuilder,
   public dialog1: MtxDialog,
   public dialog: MatDialog,
   private avaluosService: AvaluosService,
   private comunicadosService: ComunicadosService) {
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

     this.searchComunicados();
     //busca avaluos
    this.searchAvaluos();

     this.dataSource = new MatTableDataSource();
     this.data$.pipe(
       filter<ReporteSeguimiento[]>(Boolean)
     ).subscribe(dataAvaluo => {
       this.dataAvaluo = dataAvaluo;
       this.dataSource.data = dataAvaluo;
     });

    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }


    open(value: any) {
      this.dialog1.alert(`You have deleted ${value.position}!`);
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

  onLabelChange(change: MatSelectChange, row: ReporteSeguimiento) {
    const index = this.dataAvaluo.findIndex(c => c === row);
    //this.tpoAvaluo[index].labels = change.value;
    this.subject$.next(this.dataAvaluo);
  }

  ngOnDestroy() {
  }

  updateCustomer() {
   
    console.log("UPDATE")
  }

  //Llama servicio para la consulta de avalúos en tabla
  searchAvaluos () {


   this.loading = true;
   this.avaluosService.searchSeguimientoAvaluo()
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
  


    //Llama servicio para la consulta de comunicados
  searchComunicados () {

    this.loading = true;
    this.comunicadosService.getComunicados()
           .pipe(first())
           .subscribe( data => {                    
                 this.loading = false;
                 this.info = data.comunicados;

               },
               error => {  
                this.loading = false;
                this.msg = error;
                this.classAlert = 'alert-danger alert alert-dismissible fade show';
               });               
               
       }
  

  }
  