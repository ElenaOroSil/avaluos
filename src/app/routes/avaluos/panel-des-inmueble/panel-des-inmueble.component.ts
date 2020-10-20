import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegistroconstruccionDialogComponent } from '../registroconstruccion-dialog/registroconstruccion-dialog.component';
import { TablaEdoGralConservacionDialogComponent } from '../tabla-edo-gral-conservacion-dialog/tabla-edo-gral-conservacion-dialog.component';
import { TablaMatricesDialogComponent } from '../tabla-matrices-dialog/tabla-matrices-dialog.component';
import { ListamatricesDialogComponent } from '../listamatrices-dialog/listamatrices-dialog.component';
import { DescripcionInmuebleService } from '../../../_services/descripcion-inmueble.service';
import { first } from 'rxjs/operators';
import { DescripcionInmueble, PrivativaComun } from './../../../_models/desInmueble.model';
import { Observable, ReplaySubject } from 'rxjs';
import { TableColumn } from './../../../../@vex/interfaces/table-column.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs/operators';
import { Catalogo } from './../../../_models/catalogo.model';
import { CatalogosService } from './../../../_services/catalogos.service';


@Component({
  selector: 'app-panel-des-inmueble',
  templateUrl: './panel-des-inmueble.component.html',
  styleUrls: ['./panel-des-inmueble.component.scss']
})


export class PanelDesInmuebleComponent implements OnInit {
  isLinear = false;
  desInmueble1FormGroup: FormGroup;
  desInmueble2FormGroup: FormGroup;
  desInmueble3FormGroup: FormGroup;
  desInmueble4FormGroup: FormGroup;
  name: string;
  color: string;
  loading = false;
  folio = localStorage.getItem('folio');
  alertDesInmueble: boolean = false;
  msg= '';
  classAlert: string;
  valorTipo: number;
  edit: boolean = true;
  save: boolean = false;
  cancel: boolean = false;
  selectedTipo: number = -1;
  selectedUso: number = -1;
  selectedNivel: number = -1;
  selectedCo: number = -1;

  infoP: any = {};
  subject$P: ReplaySubject<DescripcionInmueble[]> = new ReplaySubject<DescripcionInmueble[]>(1);
  data$P: Observable<DescripcionInmueble[]> = this.subject$P.asObservable();

  infoC: any = {};
  subject$C: ReplaySubject<DescripcionInmueble[]> = new ReplaySubject<DescripcionInmueble[]>(1);
  data$C: Observable<DescripcionInmueble[]> = this.subject$C.asObservable();

  infoPri: any = {};
  subject$Pri: ReplaySubject<PrivativaComun[]> = new ReplaySubject<PrivativaComun[]>(1);
  data$Pri: Observable<PrivativaComun[]> = this.subject$Pri.asObservable();

  infoCom: any = {};
  subject$Com: ReplaySubject<PrivativaComun[]> = new ReplaySubject<PrivativaComun[]>(1);
  data$Com: Observable<PrivativaComun[]> = this.subject$Com.asObservable();


  isExpanded:boolean = false;
  excluded: boolean;
  editable: boolean = false;
  desInmueble: DescripcionInmueble;
  privativaComun: PrivativaComun;
  tipoCons: string;
 

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
     { label: 'Clase CMFF', property: 'claseCMFF', type: 'text', visible: false },
     { label: 'Acciones', property: 'actions', type: 'button', visible: true }
   ];

   @Input()
   columnsPC: TableColumn<PrivativaComun>[] = [
     { label: 'id', property: 'idInmConstruccion', type: 'text', visible: false},
     { label: 'Tipo', property: 'tipoConstruccion', type: 'text', visible: true },
     { label: 'Uso', property: 'idUsoConstruccion', type: 'text', visible: true },
     { label: 'Rango de Nivel', property: 'idRangoNivelTGDF', type: 'text', visible: true},
     { label: 'Clase', property: 'claseF', type: 'text', visible: true},
     { label: '', property: 'clasifica1F', type: 'text', visible: true },
     { label: 'Clasificación', property: 'clasifica2F', type: 'text', visible: true },
     { label: '', property: 'clasifica3F', type: 'text', visible: true },
     { label: 'Edad', property: 'edadF', type: 'text', visible: true },
     { label: '', property: 'conservaEdoCve', type: 'text', visible: true},
     { label: 'Estado', property: 'conservaEdoDesc', type: 'text', visible: true },
     { label: 'Fact', property: 'conservaEdoFact', type: 'text', visible: true},
     { label: 'V.P.', property: 'vp', type: 'text', visible: true },
     { label: 'Redondeado', property: 'fedICRRedF', type: 'text', visible: true },
     { label: 'Sin/Redondeo', property: 'fedICRNoRedF', type: 'text', visible: true },
     { label: 'VUR', property: 'vurF', type: 'text', visible: true },
     { label: 'Dep. Edad', property: 'depEdadF', type: 'text', visible: true },
     { label: 'V.U.C. Catastral', property: 'vucCatastralF', type: 'text', visible: true },  
     { label: 'Valor Unitario de Reposición Nuevo', property: 'valorUniRepoNuevo', type: 'text', visible: true },
     { label: 'Losa de Concreto', property: 'losaConcreto', type: 'text', visible: true },
     { label: 'Acciones', property: 'actions', type: 'button', visible: true }
   ];
 
   pageSizeP = 10;
   pageSizeOptionsP: number[] = [5, 10, 20, 50];
   dataSourceP: MatTableDataSource<DescripcionInmueble> | null;
   selectionP = new SelectionModel<DescripcionInmueble>(true, []);

   pageSizeC = 10;
   pageSizeOptionsC: number[] = [5, 10, 20, 50];
   dataSourceC: MatTableDataSource<DescripcionInmueble> | null;
   selectionC = new SelectionModel<DescripcionInmueble>(true, []);

   pageSizePri = 10;
   pageSizeOptionsPri: number[] = [5, 10, 20, 50];
   dataSourcePri: MatTableDataSource<PrivativaComun> | null;
   selectionPri = new SelectionModel<PrivativaComun>(true, []);

   pageSizeCom = 10;
   pageSizeOptionsCom: number[] = [5, 10, 20, 50];
   dataSourceCom: MatTableDataSource<PrivativaComun> | null;
   selectionCom = new SelectionModel<PrivativaComun>(true, []);

  //Paginación
  //@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('paginator3') paginator3: MatPaginator;
  @ViewChild('paginator4') paginator4: MatPaginator;


  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private desInmService: DescripcionInmuebleService,
    private catalogoService: CatalogosService) { }

   //muestra columnas en tabla
   get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  get visibleColumnsPC() {
    return this.columnsPC.filter(column => column.visible).map(column => column.property);
  }


  ngOnInit(): void {

      this.expand();

      //Combos de Colindancias
      this.getCatalogoTpoConstruccion("TIPOCONSTRUCCION", "P");
      this.getCatalogosDesInmueble("USOCONSTRUCCION");
      this.getCatalogosDesInmueble("RANGONIVEL");
      this.getCatalogosDesInmueble("ESTADOCONSERVACION");
    
    //busca construcciones
    this.searchConstruccionP("P");
    this.searchConstruccionC("C");
    this.searchConstruccionPC("P");
    this.searchConstruccionPC("C");

    this.dataSourceP = new MatTableDataSource();
    this.data$P.pipe(
      filter<DescripcionInmueble[]>(Boolean)
    ).subscribe(dataDescripcion => {
      this.infoP = dataDescripcion;
      this.dataSourceP.data = dataDescripcion;
    });

    this.dataSourceC = new MatTableDataSource();
    this.data$C.pipe(
      filter<DescripcionInmueble[]>(Boolean)
    ).subscribe(dataDescripcion => {
      this.infoC = dataDescripcion;
      this.dataSourceC.data = dataDescripcion;
    });

     this.dataSourcePri = new MatTableDataSource();
    this.data$Pri.pipe(
      filter<PrivativaComun[]>(Boolean)
    ).subscribe(dataDescripcion => {
      this.infoPri = dataDescripcion;
      this.dataSourcePri.data = dataDescripcion;
    });

     this.dataSourceCom = new MatTableDataSource();
    this.data$Com.pipe(
      filter<PrivativaComun[]>(Boolean)
    ).subscribe(dataDescripcion => {
      this.infoCom = dataDescripcion;
      this.dataSourceCom.data = dataDescripcion;
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
      'idClaseConstruccionF': new FormControl(''),
      'vidaMinimaRemanenteF': new FormControl(''),
      'indiceCostosRemanenteF': new FormControl(''),
      'totalPuntosAjustadosF': new FormControl(''),
      'claseSM': new FormControl(''),
      'puntajeSM': new FormControl(''),
      'claseCMFF': new FormControl(''),
    });

      //Sección Terreno
      this.desInmueble2FormGroup = this.formBuilder.group({
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
        'claseCMFF': new FormControl(''),
      });

      //Sección Terreno
      this.desInmueble3FormGroup = this.formBuilder.group({
        'idInmConstruccion': new FormControl(''),
        'tipoConstruccion': new FormControl(''),
        'idUsoConstruccion': new FormControl(''),
        'idRangoNivelTGDF': new FormControl(''),
        'claseF': new FormControl('', [Validators.required]),
        'clasifica1F': new FormControl('', [Validators.required]),
        'clasifica2F': new FormControl('', [Validators.required]),
        'clasifica3F': new FormControl(''),
        'edadF': new FormControl(''),
        'conservaEdoCve': new FormControl(''),
        'conservaEdoDesc': new FormControl(''),
        'conservaEdoFact': new FormControl('', [Validators.required]),
        'vp': new FormControl(''),
        'fedICRRedF': new FormControl('', [Validators.required]),
        'fedICRNoRedF': new FormControl(''),
        'vurF': new FormControl(''),
        'depEdadF': new FormControl(''),
        'vucCatastralF': new FormControl(''),
        'valorUniRepoNuevo': new FormControl(''),
        'losaConcreto': new FormControl(''),
      });

      //Sección Terreno
      this.desInmueble4FormGroup = this.formBuilder.group({
        'idInmConstruccion': new FormControl(''),
        'tipoConstruccion': new FormControl(''),
        'idUsoConstruccion': new FormControl(''),
        'idRangoNivelTGDF': new FormControl(''),
        'claseF': new FormControl('', [Validators.required]),
        'clasifica1F': new FormControl('', [Validators.required]),
        'clasifica2F': new FormControl('', [Validators.required]),
        'clasifica3F': new FormControl(''),
        'edadF': new FormControl(''),
        'conservaEdoCve': new FormControl(''),
        'conservaEdoDesc': new FormControl(''),
        'conservaEdoFact': new FormControl('', [Validators.required]),
        'vp': new FormControl(''),
        'fedICRRedF': new FormControl('', [Validators.required]),
        'fedICRNoRedF': new FormControl(''),
        'vurF': new FormControl(''),
        'depEdadF': new FormControl(''),
        'vucCatastralF': new FormControl(''),
        'valorUniRepoNuevo': new FormControl(''),
        'losaConcreto': new FormControl(''),
      });
  }

  // convenience getter for easy access to form fields
  get ant1() { return this.desInmueble1FormGroup.controls; }

  expand(){
    this.isExpanded = !this.isExpanded;
    }

  //ngAfterViewInit() {
  //  this.dataSourceP.paginator = this.paginator;
  //  this.dataSourceC.paginator = this.paginator;
  //}

  ngAfterViewInit() {
    this.dataSourceP.paginator = this.paginator;
    this.dataSourceC.paginator = this.paginator2;
    this.dataSourcePri.paginator = this.paginator3;
    this.dataSourceCom.paginator = this.paginator4;
  }

  //Abre modal para el registro de la construcción
openDialog(): void {
  const dialogRef = this.dialog.open(RegistroconstruccionDialogComponent, {
    width: '1300px',
    data: { name: this.name, color: this.color }
  });

  dialogRef.afterClosed().subscribe(res => {
    this.color = res;   
      this.searchConstruccionP("P"); 
      this.searchConstruccionC("C"); 
      this.searchConstruccionPC("P");
      this.searchConstruccionPC("C");
  });
}


 //Llama servicio para alta de terreno
 addConstruccion(value: any){


  if (this.selectedTipo != -1){
    value.idTipoConstruccion = this.selectedTipo;
  } else {
    value.idTipoConstruccion = value.idTipoConstruccion;
  }

  if (this.selectedUso != -1){
    value.idUsoConstruccion = this.selectedUso;
  } else {
    value.idUsoConstruccion = value.idUsoConstruccion;
  }

  if (this.selectedNivel != -1){
    value.idRangoNivelTGDF = this.selectedNivel;
  } else {
    value.idRangoNivelTGDF = value.idRangoNivelTGDF;
  } 

  if (this.selectedCo != -1){
    value.idEstadoConservacion = this.selectedCo;
  } else {
    value.idEstadoConservacion = value.idEstadoConservacion;
  }

 
  this.desInmueble = {idinmconstruccion: value.idInmConstruccion, tipoconstruccion: value.tipoConstruccion, idtipoconstruccion: value.idTipoConstruccion, 
              superficie: value.superficie, descripcionmodulo: value.descripcionModulo,  niveltipo: value.nivelTipo, 
              idusoconstruccion: value.idUsoConstruccion, idrangoniveltgdf: value.idRangoNivelTGDF,  clasef: "", puntajef: 0,
              edad: value.edad, idestadoconservacion: value.idEstadoConservacion, indiviso: value.indiviso,
              idclaseconstruccionf: 0, estadogralconservacionf: "", vidaminimaremanentef: 0, indicecostosremanentef: 0, totalpuntosajustadosf: 0,
              clasesm: 0, puntajesm: 0, claseCMFF: null}

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


//Llama servicio para alta de terreno
addConstruccionPC(value: any){

this.privativaComun = {idinmconstruccion: value.idInmConstruccion, tipoconstruccion: value.tipoConstruccion, idusoconstruccion: value.idUsoConstruccion,
idrangoniveltgdf: value.idRangoNivelTGDF, clasef: value.claseF, clasifica1f: value.clasifica1F, clasifica2f: value.clasifica2F,
clasifica3f: value.clasifica3F, edadf: value.edadF, conservaedocve: value.conservaEdoCve, conservaedodesc: value.conservaEdoDesc,
conservaedofact: value.conservaEdoFact, vp: value.vp, fedicrredf: value.fedICRRedF, fedicrnoredf: value.fedICRNoRedF, vurf: value.vurF,
depedadf: value.depEdadF, vuccatastralf: value.vucCatastralF, valorunireponuevo: value.valorUniRepoNuevo, losaconcreto: value.losaConcreto.trim()}


this.loading = true;
this.desInmService.addPrivativaComun(this.privativaComun)
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
 searchConstruccionP (res: string) {

  
  this.loading = true;
  this.desInmService.searchConstruccion(this.folio, res)
         .pipe(first())
         .subscribe( data => {                    
               this.loading = false;
               
               this.infoP = data.inmuebleConstrucciones;
               this.subject$P.next(this.infoP);
            
             },
             error => {
              this.alertDesInmueble = true;  
              this.loading = false;
              this.msg = error;
              this.classAlert = 'alert-danger alert alert-dismissible fade show';
             });           
             
     }


      //Llama servicio para la consulta de terreno
 searchConstruccionC (res: string) {

  
  this.loading = true;
  this.desInmService.searchConstruccion(this.folio, res)
         .pipe(first())
         .subscribe( data => {                    
               this.loading = false;
               
               this.infoC = data.inmuebleConstrucciones;
               this.subject$C.next(this.infoC);
            
             },
             error => {
              this.alertDesInmueble = true;  
              this.loading = false;
              this.msg = error;
              this.classAlert = 'alert-danger alert alert-dismissible fade show';
             });           
             
     }


         //Llama servicio para la consulta de terreno
 searchConstruccionPC (res: string) {
 
  this.loading = true;
  this.desInmService.searchPrivativaComun(this.folio, res)
         .pipe(first())
         .subscribe( data => {                    
               this.loading = false;
               

               if (res == "P"){
               this.infoPri = data.descripcionGralComple;
               this.subject$Pri.next(this.infoPri);
               } else {
               this.infoCom = data.descripcionGralComple;
               this.subject$Com.next(this.infoCom); 
               }
            
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


  editar(e) {  
       
    this.selectedTipo = -1;
    this.selectedUso = -1;
    this.selectedNivel = -1;
    this.selectedCo = -1;
    this.save = true;
    this.cancel = true;
    this.edit = false;
    e.editable = !e.editable;    
  }

  cancelar(e) {   
    
    this.searchConstruccionP("P");
    this.searchConstruccionC("C");
    this.searchConstruccionPC("P");
    this.searchConstruccionPC("C");
    this.save = false;
    this.cancel = false;
    this.edit = true;
    e.editable = !e.editable;  
  }

  salvar(e) {   
    this.addConstruccion(e);
    e.editable = !e.editable;  
    this.save = false;
    this.cancel = false;
    this.edit = true;
    
  }

  salvarPC(e) {    
    this.addConstruccionPC(e);
    e.editable = !e.editable;  
    this.save = false;
    this.cancel = false;
    this.edit = true;
    
  }

    //Abre modal de la tabla de Estado general de conservación
openDialogTabEdoGralCons(row: any): void {

  const dialogRef = this.dialog.open(TablaEdoGralConservacionDialogComponent, {
    width: '1200px',
    data: { idInmCons: row.idInmConstruccion, tipoCons: row.tipoConstruccion}
  });

  dialogRef.afterClosed().subscribe(res => {
    this.tipoCons = res;   
    this.searchConstruccionP("P"); 
    this.searchConstruccionC("C");         
  });

}

   //Abre modal del catálogo de Matrices
   openDialogListaMatrices(row: any): void {

    if(row.claseCMFF == null){

  const dialogRef = this.dialog.open(ListamatricesDialogComponent, {
      width: '900px',
      data: { idInmCons: row.idInmConstruccion}
    });
  
    dialogRef.afterClosed().subscribe(res => {
      this.tipoCons = res;   
      this.searchConstruccionP("P"); 
      this.searchConstruccionC("C");         
    });
  } else {
    const dialogRef = this.dialog.open(TablaMatricesDialogComponent, {
      width: '1300px',
      data: { idInmCons: row.idInmConstruccion, idMatriz: null}
    });
  
    dialogRef.afterClosed().subscribe(res => {
      this.tipoCons = res;   
      this.searchConstruccionP("P"); 
      this.searchConstruccionC("C");         
    });
  }
  }

  onChangeTipo(e) {   
       
      this.selectedTipo = e.source.value;
  }

  onChangeUso(e) {   

    this.selectedUso = e.source.value;
  }

  onChangeNivel(e) {   

    this.selectedNivel = e.source.value;
  }

  onChangeCo(e) { 
    
    this.selectedCo = e.source.value;

  }

}










