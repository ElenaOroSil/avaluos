import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList,ElementRef} from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegistroconstruccionDialogComponent } from '../registroconstruccion-dialog/registroconstruccion-dialog.component';
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
  selected = 2;
  editRowId:number=-1
  @ViewChildren(MatInput,{read:ElementRef}) inputs:QueryList<ElementRef>;

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
     { label: 'Tipo', property: 'idTipoConstruccion', type: 'text', visible: true },
     { label: 'Superficie', property: 'superficie', type: 'text', visible: true },
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
     { label: 'estadoGralConservacionF', property: 'estadoGralConservacionF', type: 'text', visible: true },   
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
    private catalogoService: CatalogosService,) { }

   //muestra columnas en tabla
   get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }


  ngOnInit(): void {

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
      'folio': new FormControl('', [Validators.required]),
      'tipoConstruccion': new FormControl('', [Validators.required]),
      'idTipoConstruccion': new FormControl('', [Validators.required]),
      'superficie': new FormControl('', [Validators.required]),
      'descripcionModulo': new FormControl('', [Validators.required]),
      'nivelTipo': new FormControl('', [Validators.required]),
      'idUsoConstruccion': new FormControl('', [Validators.required]),
      'idRangoNivelTGDF': new FormControl('', [Validators.required]),
      'claseF': new FormControl(''),
      'puntajeF': new FormControl('', [Validators.required]),
      'edad': new FormControl('', [Validators.required]),
      'idEstadoConservacion': new FormControl('', [Validators.required]),
      'indiviso': new FormControl('', [Validators.required]),
      'idClaseConstruccionF': new FormControl('', [Validators.required]),
      'medida2': new FormControl('', [Validators.required]),
      'detalleColindante2': new FormControl('', [Validators.required]),
      'estadoGralConservacionF': new FormControl('', [Validators.required]),
      'vidaMinimaRemanenteF': new FormControl('', [Validators.required]),
      'indiceCostosRemanenteF': new FormControl('', [Validators.required]),
      'totalPuntosAjustadosF': new FormControl('', [Validators.required]),
      'claseSM': new FormControl('', [Validators.required]),
      'puntajeSM': new FormControl('', [Validators.required]),
    });
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

 //Llama servicio para la consulta de terreno
 searchConstruccion (res: string) {
    
  this.loading = true;
  this.desInmService.searchConstruccion(this.folio, res)
         .pipe(first())
         .subscribe( data => {                    
               this.loading = false;
               this.info = data.inmuebleConstrucciones;
             
               console.log("this.info")
               console.log(this.info)
              
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

  edit(row,element)
  {

    console.log(row)
    console.log(element)
    this.editRowId=row;
    setTimeout(()=>{
      this.inputs.find(x=>x.nativeElement.getAttribute('formControlName')==element).nativeElement.focus()

    })
  }

}












