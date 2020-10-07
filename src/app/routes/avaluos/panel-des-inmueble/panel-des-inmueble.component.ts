import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList,ElementRef} from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegistroconstruccionDialogComponent } from '../registroconstruccion-dialog/registroconstruccion-dialog.component';
import { TablaEdoGralConservacionDialogComponent } from '../tabla-edo-gral-conservacion-dialog/tabla-edo-gral-conservacion-dialog.component';
import { DescripcionInmuebleService } from '../../../_services/descripcion-inmueble.service';
import { first } from 'rxjs/operators';
import { DescripcionInmueble } from './../../../_models/desInmueble.model';
import { Observable, ReplaySubject } from 'rxjs';
import { TableColumn } from './../../../../@vex/interfaces/table-column.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs/operators';
import { Catalogo } from './../../../_models/catalogo.model';
import { CatalogosService } from './../../../_services/catalogos.service';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-panel-des-inmueble',
  templateUrl: './panel-des-inmueble.component.html',
  styleUrls: ['./panel-des-inmueble.component.scss']
})


export class PanelDesInmuebleComponent implements OnInit {
  isLinear = false;
  desInmueble1FormGroup: FormGroup;
  desInmueble2FormGroup: FormGroup;
  name: string;
  color: string;
  loading = false;
  folio = localStorage.getItem('folio');
  alertDesInmueble: boolean = false;
  msg= '';
  classAlert: string;
  info: any = {};
  subject$: ReplaySubject<DescripcionInmueble[]> = new ReplaySubject<DescripcionInmueble[]>(1);
  data$: Observable<DescripcionInmueble[]> = this.subject$.asObservable();
  isExpanded:boolean = false;
  excluded: boolean;
  editable: boolean;
  desInmueble: DescripcionInmueble;
  image: string = "edit";
  editSave: string = "Editar";
 

   //registro CATÁLOGOS
   tpoConstruccion: Catalogo[];
   usoConstruccion: Catalogo[];
   rangoNivel: Catalogo[];
   edoConservacion: Catalogo[];

   //Nombre de columnas en tabla
   @Input()
   columns: TableColumn<DescripcionInmueble>[] = [
     { label: 'id', property: 'id', type: 'text', visible: false},
     { label: 'folio', property: 'folio', type: 'text', visible: false },
     { label: 'tipoConstruccion', property: 'tipoConstruccion', type: 'text', visible: false },
     { label: 'Tipo', property: 'idTipoConstruccion', type: 'text', visible: true},
     { label: 'Superficie', property: 'superficie', type: 'text', visible: true},
     { label: 'Descripción', property: 'descripcionModulo', type: 'text', visible: true },
     { label: 'Nivel tipo', property: 'nivelTipo', type: 'text', visible: true },
     { label: 'Uso', property: 'idUsoConstruccion', type: 'text', visible: true },
     { label: 'Rango nivel', property: 'idRangoNivelTGFD', type: 'text', visible: true },
     { label: 'CLASE', property: 'claseF', type: 'text', visible: true, cssClasses: ['font-large']},
     { label: 'PUNTAJE', property: 'puntajeF', type: 'text', visible: true },
     { label: 'Edad', property: 'edad', type: 'text', visible: true},
     { label: 'Estado de conservación', property: 'idEstadoConservacion', type: 'text', visible: true },
     { label: 'Indiviso', property: 'indiviso', type: 'text', visible: false },
     { label: 'Clase ISAI', property: 'idClaseConstruccionF', type: 'text', visible: true },
     { label: 'totalPuntosAjustadosF', property: 'totalPuntosAjustadosF', type: 'text', visible: true },
     { label: 'Vida Min. Rem.', property: 'vidaMinimaRemanenteF', type: 'text', visible: true },
     { label: 'Indice Costos Rem.', property: 'indiceCostosRemanenteF', type: 'text', visible: true },  
     { label: 'Clase s/matriz', property: 'claseSM', type: 'text', visible: true },
     { label: 'Puntaje s/matriz', property: 'puntajeSM', type: 'text', visible: true },
     { label: 'Acciones', property: 'actions', type: 'button', visible: true }
   ];
 
   pageSize = 10;
   pageSizeOptions: number[] = [5, 10, 20, 50];
   dataSource: MatTableDataSource<DescripcionInmueble> | null;
   selection = new SelectionModel<DescripcionInmueble>(true, []);

  //Paginación
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private desInmService: DescripcionInmuebleService,
    private catalogoService: CatalogosService) { }

   //muestra columnas en tabla
   get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }


  ngOnInit(): void {

      this.expand();

      //Combos de Colindancias
      this.getCatalogoTpoConstruccion("TIPOCONSTRUCCION", "P");
      this.getCatalogosDesInmueble("USOCONSTRUCCION");
      this.getCatalogosDesInmueble("RANGONIVEL");
      this.getCatalogosDesInmueble("ESTADOCONSERVACION");
    
    //busca construcciones
    this.searchConstruccion("P");


    this.dataSource = new MatTableDataSource();
    this.data$.pipe(
      filter<DescripcionInmueble[]>(Boolean)
    ).subscribe(dataDescripcion => {
      this.info = dataDescripcion;
      this.dataSource.data = dataDescripcion;
    });

     //Sección Terreno
     this.desInmueble1FormGroup = this.formBuilder.group({
      'idInmConstruccion': new FormControl(''),
      'folio': new FormControl(''),
      'tipoConstruccion': new FormControl(''),
      'idTipoConstruccion': new FormControl(''),
      'superficie': new FormControl('', [Validators.required]),
      'descripcionModulo': new FormControl('', [Validators.required]),
      'nivelTipo': new FormControl('', [Validators.required]),
      'idUsoConstruccion': new FormControl(''),
      'idRangoNivelTGDF': new FormControl(''),
      'claseF': new FormControl(''),
      'puntajeF': new FormControl(''),
      'edad': new FormControl('', [Validators.required]),
      'idEstadoConservacion': new FormControl(''),
      'indiviso': new FormControl('', [Validators.required]),
      'idClaseConstruccionF': new FormControl(''),
      'vidaMinimaRemanenteF': new FormControl(''),
      'indiceCostosRemanenteF': new FormControl(''),
      'totalPuntosAjustadosF': new FormControl(''),
      'claseSM': new FormControl(''),
      'puntajeSM': new FormControl(''),
    });
  }

  expand(){
    this.isExpanded = !this.isExpanded;
    }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }

  //Abre modal para el registro de la construcción
openDialog(): void {
  const dialogRef = this.dialog.open(RegistroconstruccionDialogComponent, {
    width: '1200px',
    data: { name: this.name, color: this.color }
  });

  dialogRef.afterClosed().subscribe(res => {
    this.color = res;   
      this.searchConstruccion(res);        
  });
}


 //Llama servicio para alta de terreno
 addConstruccion(value: any){

  console.log("VALUE")
  console.log(value)
  
  // stop here if form is invalid
  //if (this.desInmueble1FormGroup.invalid) {
  //  return;
  //}

this.desInmueble = {idinmconstruccion: value.idInmConstruccion, tipoconstruccion: value.tipoConstruccion, idtipoconstruccion: value.idTipoConstruccion, 
              superficie: value.superficie, descripcionmodulo: value.descripcionModulo,  niveltipo: value.nivelTipo, 
              idusoconstruccion: value.idUsoConstruccion, idrangoniveltgdf: value.idRangoNivelTGDF,  clasef: "", puntajef: 0,
              edad: value.edad, idestadoconservacion: value.idEstadoConservacion, indiviso: value.indiviso,
              idclaseconstruccionf: 0, estadogralconservacionf: "", vidaminimaremanentef: 0, indicecostosremanentef: 0, totalpuntosajustadosf: 0,
              clasesm: 0, puntajesm: 0}

console.log("this.desInmueble")
console.log(this.desInmueble)


this.loading = true;
this.desInmService.addConstruccion(this.folio, this.desInmueble)
    .pipe(first())
    .subscribe(
        data => {

        if(data.ok){
          this.alertDesInmueble = true;        
          this.loading = false;
          this.msg = data.mensaje;
          this.classAlert = 'alert-success alert alert-dismissible fade show';   
      } else {
        this.alertDesInmueble = true;   
        this.loading = false;
        this.msg = data.mensaje;
        this.classAlert = 'alert-danger alert alert-dismissible fade show';
      }
      },
      error => {
        this.alertDesInmueble = true;  
        this.loading = false;
        this.msg = error;
        this.classAlert = 'alert-danger alert alert-dismissible fade show';
      });

}

 //Llama servicio para la consulta de terreno
 searchConstruccion (res: string) {
    
  this.loading = true;
  this.desInmService.searchConstruccion(this.folio, res)
         .pipe(first())
         .subscribe( data => {                    
               this.loading = false;
               this.info = data.inmuebleConstrucciones;
              
               this.subject$.next(this.info);

             },
             error => {
              this.alertDesInmueble = true;  
              this.loading = false;
              this.msg = error;
              this.classAlert = 'alert-danger alert alert-dismissible fade show';
             });                           
     }


  //Llama servicio sección Descripción del Inmueble
  getCatalogoTpoConstruccion (catalogo: string, tipo: string) {

    this.loading = true;
    this.catalogoService.getCatalogoTpoConstruccion(catalogo, tipo)
          .pipe(first())
          .subscribe( data => {                    
                this.loading = false;             
                  this.tpoConstruccion = data;                
              },
              error => {
                this.alertDesInmueble = true;  
                this.loading = false;
                this.msg = error;
                this.classAlert = 'alert-danger alert alert-dismissible fade show';
              });    
  }

   //Llama servicio sección Descripción del Inmueble
   getCatalogosDesInmueble (tipo: string) {
    this.loading = true;
    this.catalogoService.getCatalogosDesInmueble(tipo)
          .pipe(first())
          .subscribe( data => {                    
                this.loading = false;

                switch(tipo)
                { 
                  case "TIPOCONSTRUCCION":
                  this.tpoConstruccion = data; 
                  break;
                  case "USOCONSTRUCCION":
                    this.usoConstruccion = data; 
                  break;
                  case "RANGONIVEL":
                    this.rangoNivel = data; 
                  break;
                  case "ESTADOCONSERVACION":
                    this.edoConservacion = data; 
                  break;
                  default: 
                }          
              },
              error => {
                this.alertDesInmueble = true;  
                this.loading = false;
                this.msg = error;
                this.classAlert = 'alert-danger alert alert-dismissible fade show';
              });    
  }


  editar(e: any) {   
    this.image = "save";
    this.editSave = "Guardar"
    if (e.editable){
      this.addConstruccion(e)
      this.image = "edit";
      this.editSave = "Editar"
    } 
    e.editable = !e.editable;    

  }

    //Abre modal de la tabla de Estado general de conservación
openDialogTabEdoGralCons(): void {
  const dialogRef = this.dialog.open(TablaEdoGralConservacionDialogComponent, {
    width: '1200px',
    data: { name: this.name, color: this.color }
  });

  dialogRef.afterClosed().subscribe(res => {
    this.color = res;   
      this.searchConstruccion(res);        
  });
}

}










