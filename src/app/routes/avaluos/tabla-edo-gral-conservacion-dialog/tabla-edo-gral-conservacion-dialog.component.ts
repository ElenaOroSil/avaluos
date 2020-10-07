import { Component, OnInit, Input } from '@angular/core';
import { Catalogo } from './../../../_models/catalogo.model';
import { CatalogosService } from './../../../_services/catalogos.service';
import { TableColumn } from './../../../../@vex/interfaces/table-column.interface';
import { TablaEdoGralConservacion } from './../../../_models/desInmueble.model';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DescripcionInmuebleService } from '../../../_services/descripcion-inmueble.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-tabla-edo-gral-conservacion-dialog',
  templateUrl: './tabla-edo-gral-conservacion-dialog.component.html',
  styleUrls: ['./tabla-edo-gral-conservacion-dialog.component.scss']
})
export class TablaEdoGralConservacionDialogComponent implements OnInit {
  subject$: ReplaySubject<TablaEdoGralConservacion[]> = new ReplaySubject<TablaEdoGralConservacion[]>(1);
  data$: Observable<TablaEdoGralConservacion[]> = this.subject$.asObservable();
  info: any = {};
  edoGralFormGroup: FormGroup;
  loading = false;
  alertDesInmueble: boolean = false;
  msg= '';
  classAlert: string;
  folio = localStorage.getItem('folio');

   //registro CATÁLOGOS
   edoConservacion: Catalogo[];

   //Nombre de columnas en tabla
  @Input()
  columns: TableColumn<TablaEdoGralConservacion>[] = [
    { label: 'id', property: 'idPartidaPorcentaje', type: 'text', visible: false},
    { label: 'Partidas', property: 'descripcionPartidaPorcentaje', type: 'text', visible: true },
    { label: 'Puntos por partida', property: 'puntosPartida', type: 'text', visible: true },
    { label: 'Estado de conservación Observado', property: 'idPartidaConserva', type: 'text', visible: true},
    { label: 'Mantenimiento requerido', property: 'manttRequerido', type: 'text', visible: true},
    { label: 'Índice de conservación', property: 'indiceConservacion', type: 'text', visible: true },
    { label: 'Vida mínima (años)', property: 'vidaMinimaAnios', type: 'text', visible: true },
    { label: 'Puntos ajustados', property: 'puntosAjustados', type: 'text', visible: true },
  ];

  dataSource: MatTableDataSource<TablaEdoGralConservacion> | null;

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private desInmService: DescripcionInmuebleService,
    private catalogoService: CatalogosService) { }

  
    //muestra columnas en tabla
   get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit(): void {

     //Combos de Estado de conservación
     this.getCatalogoEdoConservacion("PARTIDASCONSERVACION");

     this.searchEdoGralConservacion();

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(
      filter<TablaEdoGralConservacion[]>(Boolean)
    ).subscribe(dataDescripcion => {
      this.info = dataDescripcion;
      this.dataSource.data = dataDescripcion;
    });

      //Sección Terreno
      this.edoGralFormGroup = this.formBuilder.group({
        'idPartidaPorcentaje': new FormControl(''),
        'descripcionPartidaPorcentaje': new FormControl(''),
        'puntosPartida': new FormControl(''),
        'idPartidaConserva': new FormControl(''),
        'manttRequerido': new FormControl('', [Validators.required]),
        'indiceConservacion': new FormControl('', [Validators.required]),
        'vidaMinimaAnios': new FormControl('', [Validators.required]),
        'puntosAjustados': new FormControl(''),
      });
  }


   //Llama servicio sección Descripción del Inmueble
   getCatalogoEdoConservacion (catalogo: string) {

    this.loading = true;
    this.catalogoService.getCatalogosDesInmueble(catalogo)
          .pipe(first())
          .subscribe( data => {                    
                this.loading = false;             
                  this.edoConservacion = data;                
              },
              error => {
                this.alertDesInmueble = true;  
                this.loading = false;
                this.msg = error;
                this.classAlert = 'alert-danger alert alert-dismissible fade show';
              });    
  }

  //Llama servicio para la consulta de la tabla de des
  searchEdoGralConservacion() {
   
  console.log("SEARCH AAAAA");
  this.loading = true;
  this.desInmService.searchTablaConservacion(this.folio, "5", "1")
         .pipe(first())
         .subscribe( data => {                    
               this.loading = false;
               this.info = data.inmuebleConstrucciones;
               console.log("this.info");
               console.log(this.info);
               this.subject$.next(this.info);

             },
             error => {
              this.alertDesInmueble = true;  
              this.loading = false;
              this.msg = error;
              this.classAlert = 'alert-danger alert alert-dismissible fade show';
             });                           
     }

  
}
