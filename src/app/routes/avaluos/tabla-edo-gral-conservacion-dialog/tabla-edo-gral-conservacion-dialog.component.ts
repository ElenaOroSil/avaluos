import { Component, OnInit, Input, Inject, Optional, HostListener } from '@angular/core';
import { CatalogoString, Catalogo } from './../../../_models/catalogo.model';
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
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  alertTablaEdoGral: boolean = false;
  msg= '';
  classAlert: string;
  folio = localStorage.getItem('folio');
  submitted = false;
  tablaEdoGralConservacion: TablaEdoGralConservacion;
  edoGralConservacionT: string;
  vidaMinimaRemanenteT: number;
  indiceCostosRemanente: number;
  puntosTotales: number;
  clase: string = "1";
  idInmCons: string;
  tipoCons: string;


   //registro CATÁLOGOS
   edoConservacion: Catalogo[];
   claseCatalogo: CatalogoString[];

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
    private catalogoService: CatalogosService,
    public dialogRef: MatDialogRef<TablaEdoGralConservacionDialogComponent>,
    @Optional()  @Inject(MAT_DIALOG_DATA) public data: any) {

      this.idInmCons = data.idInmCons;
      this.tipoCons = data.tipoCons;

     }

     @HostListener('window:keyup.esc') onKeyUp() {
      this.dialogRef.close();
    }

  
    //muestra columnas en tabla
   get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit(): void {

     //Combos de Estado de conservación
     this.getCatalogoEdoConservacion("PARTIDASCONSERVACION");
     this.getCatalogoClase("CLASECONSTRUCCION");

     this.searchEdoGralConservacion(this.folio, this.idInmCons, this.clase);

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(
      filter<TablaEdoGralConservacion[]>(Boolean)
    ).subscribe(dataDescripcion => {
      this.info = dataDescripcion;
      this.dataSource.data = dataDescripcion;
    });

      //Sección Terreno
      this.edoGralFormGroup = this.formBuilder.group({
        'claseConstruccion': new FormControl('', [Validators.required]),
        'idPartidaPorcentaje': new FormControl(''),
        'descripcionPartidaPorcentaje': new FormControl(''),
        'puntosPartida': new FormControl(''),
        'idPartidaConserva': new FormControl(''),
        'manttRequerido': new FormControl(''),
        'indiceConservacion': new FormControl(''),
        'vidaMinimaAnios': new FormControl(''),
        'puntosAjustados': new FormControl(''),
        'edoGralConservacionT': new FormControl(''),
        'vidaMinimaRemanenteT': new FormControl(''),
        'indiceCostosRemanente': new FormControl(''),
        'puntosTotales': new FormControl(''),
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
                this.alertTablaEdoGral = true;  
                this.loading = false;
                this.msg = error;
                this.classAlert = 'alert-danger alert alert-dismissible fade show';
              });    
  }

   //Llama servicio sección Descripción del Inmueble
   getCatalogoClase (catalogo: string) {

    this.loading = true;
    this.catalogoService.getCatalogosDesInmueble(catalogo)
          .pipe(first())
          .subscribe( data => {                    
                this.loading = false;             
                  this.claseCatalogo = data;             
              },
              error => {
                this.alertTablaEdoGral = true;  
                this.loading = false;
                this.msg = error;
                this.classAlert = 'alert-danger alert alert-dismissible fade show';
              });    
  }

   // convenience getter for easy access to form fields
   get ant1() { return this.edoGralFormGroup.controls; }

   //Llama servicio para guardar la tabla de Edo Gral de conservacion
   addEdoGralConservacion(idParConserva: any, value: any) {
    this.submitted = true;


  //stop here if form is invalid
  if (this.edoGralFormGroup.invalid) {
     return;
  }

  this.tablaEdoGralConservacion = {idinmuebleconstruccion: Number(this.idInmCons), 
    claseconstruccion: this.clase, 
    idpartidaporcentaje: value.idPartidaPorcentaje, 
    descripcionpartida: value.descripcionPartidaPorcentaje, puntospartida: value.puntosPartida, 
    idpartidaconserva: idParConserva.value,
    manttrequerido: value.manttRequerido, indiceconservacion: value.indiceConservacion, vidaminimaanios: value.vidaMinimaAnios,
    puntosajustados: value.puntosAjustados}

  
  this.loading = true;
  this.desInmService.addTablaConservacion(this.folio, this.tablaEdoGralConservacion)
      .pipe(first())
      .subscribe(
          data => {

          if(data.ok){
            this.alertTablaEdoGral = true;        
            this.loading = false;
            this.msg = data.mensaje;
            this.searchEdoGralConservacion(this.folio, this.idInmCons, this.clase)
            this.classAlert = 'alert-success alert alert-dismissible fade show';   
        } else {
          this.alertTablaEdoGral = true;   
          this.loading = false;
          this.msg = data.mensaje;
          this.classAlert = 'alert-danger alert alert-dismissible fade show';
        }
        },
        error => {
          this.alertTablaEdoGral = true;  
          this.loading = false;
          this.msg = error;
          this.classAlert = 'alert-danger alert alert-dismissible fade show';
        });

  }

  //Llama servicio para la consulta de la tabla de estado gral de conservacion
  searchEdoGralConservacion(folio: string, idInmConstruccion: string, claseConstruccion: string) {
   
  this.loading = true;
  this.desInmService.searchTablaConservacion(folio, idInmConstruccion, claseConstruccion)
         .pipe(first())
         .subscribe( data => {                    
               this.loading = false;
               this.info = data.tabla;
               this.clase = data.claseConstruccion;         
               this.edoGralFormGroup.controls['claseConstruccion'].setValue(this.clase); 
            

               this.edoGralConservacionT = data.estadoGralConserva;
               this.vidaMinimaRemanenteT = data.vidaMinRemanente;
               this.indiceCostosRemanente = data.indiceCostosRemanente;
               this.puntosTotales = data.totalPuntosAjustados;
  
               this.subject$.next(this.info);

             },
             error => {
              this.alertTablaEdoGral = true;  
              this.loading = false;
              this.msg = error;
              this.classAlert = 'alert-danger alert alert-dismissible fade show';
             });                           
     }

     closeAlertTablaEdoGral(){
      this.alertTablaEdoGral = false;
    }

     onNoClick(): void {
      this.dialogRef.close(this.tipoCons);
    }

    onSelectionClass(){

      this.clase = this.ant1.claseConstruccion.value
      this.searchEdoGralConservacion(this.folio, this.idInmCons, this.clase)

    }

    onSelectionEstado(e, row){

      this.addEdoGralConservacion(e, row);

    }

  
}
