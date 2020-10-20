import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import { first } from 'rxjs/operators';
import { Terreno, TerrenoFuenteLegal, TerrenoComplemento, TerrenoColindancias  } from './../../../_models/terreno.model';
import { TerrenoService } from './../../../_services/terreno.service';
import { CatalogosService } from './../../../_services/catalogos.service';
import { Catalogo } from './../../../_models/catalogo.model';
import { MatDialog } from '@angular/material/dialog';
import { ColindanciasDialogComponent } from './../colindancias-dialog/colindancias-dialog.component';
import { TableColumn } from './../../../../@vex/interfaces/table-column.interface';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-panel-terreno',
  templateUrl: './panel-terreno.component.html',
  styleUrls: ['./panel-terreno.component.scss']
})
export class PanelTerrenoComponent implements OnInit {
  terreno1FormGroup: FormGroup;
  terreno2FormGroup: FormGroup;
  terreno3FormGroup: FormGroup;
 
  terreno: Terreno;
  terrenoFuenteLegal: TerrenoFuenteLegal;
  terrenoComplemento: TerrenoComplemento;
 
  folio = localStorage.getItem('folio');
  info: any = {};
  loading = false;
  alertTerreno: boolean = false;
  alertTerrenoFuenteLegal: boolean = false;
  alertTerrenoComplemento: boolean = false;
  classAlert: string;
  msg= '';
  date = new FormControl(new Date());
  name: string;
  color: string;
  subject$: ReplaySubject<TerrenoColindancias[]> = new ReplaySubject<TerrenoColindancias[]>(1);
  data$: Observable<TerrenoColindancias[]> = this.subject$.asObservable();
  isExpanded:boolean = false;

  //Terreno CATÁLOGOS
  puntosCardinales: Catalogo[];
  fuenteInformacion: Catalogo[];
  topografia: Catalogo[];
  formaTerreno: Catalogo[];
  densidadHabitacional: Catalogo[];
  entidad: Catalogo[];

  //Terreno
  calleFrenteF;
  calleFrentePuntoCard;
  entreCalle;
  entreCallePuntoCard;
  calleY;
  calleYPuntoCard;
  calleManzana;
  calleManzanaPuntoCard;
  superficieTotalTerreno;
  descripcionSuperficie;
  idTipoFuenteInformacion;
  orientacion1;
  medida1;
  detalleColindante1;
  orientacion2;
  medida2;
  detalleColindante2;
  orientacion3;
  medida3;
  detalleColindante3;
  orientacion4;
  medida4;
  detalleColindante4;

  //TerrenoFuenteLegal
  escritura;
  volumenescritura;
  fechaescritura;
  numeronotariaescritura;
  nombrenotarioescritura;
  iddistritojudicialnotario;
  juzgadosentencia;
  fechasentencia;
  expedientesentencia;
  fechaalineanumoficial;
  folioalineanumoficial;
  fechacontratoprivado;
  nombreadquirente;
  paternoadquirente;
  maternoadquirente;
  nombreenajenante;
  paternoenajenante;
  maternoenajenante;

  //TerrenoComplemento
  idtopografia;
  idformaterreno;
  iddensidadhabitacional;
  servidumbresorestricciones;
  caracteristicaspanoramicasf;
  intencidadconstruccionf;
  descintencidadconstruccionf;

  //Nombre de columnas en tabla
  @Input()
  columns: TableColumn<TerrenoColindancias>[] = [
    { label: 'Descripción colindancia', property: 'descripcionColindancia', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-small']},
    { label: 'Orientación', property: 'orientacion1', type: 'text', visible: true },
    { label: 'Medida', property: 'medida1', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Detalle colindante', property: 'detalleColindante1', type: 'text', visible: true },
    { label: 'Orientación', property: 'orientacion2', type: 'text', visible: true },
    { label: 'Medida', property: 'medida2', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Detalle colindante', property: 'detalleColindante2', type: 'text', visible: true },
    { label: 'Orientación', property: 'orientacion3', type: 'text', visible: true },
    { label: 'Medida', property: 'medida3', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Detalle colindante', property: 'detalleColindante3', type: 'text', visible: true },
    { label: 'Orientación', property: 'orientacion4', type: 'text', visible: true },
    { label: 'Medida', property: 'medida4', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Detalle colindante', property: 'detalleColindante4', type: 'text', visible: true },
  ];

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<TerrenoColindancias> | null;
  selection = new SelectionModel<TerrenoColindancias>(true, []);

  //Paginación
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder,
    private terrenoService: TerrenoService,
    private catalogoService: CatalogosService,
    public dialog: MatDialog) { }

    //muestra columnas en tabla
   get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit(): void {

     this.expand();
  
     //Combos de Características Urbanas
     this.getCatTerreno("PUNTOSCARDINALES");
     this.getCatTerreno("FUENTEINFORMACION");
     this.getCatTerreno("TOPOGRAFIA");
     this.getCatTerreno("FORMATERRENO");
     this.getCatTerreno("DENSIDADHABITACIONAL");
     this.getCatTerreno("ENTIDAD");

    //busca nuevas colindancias
    this.searchTerrenoColindancias();
      
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(
      filter<TerrenoColindancias[]>(Boolean)
    ).subscribe(dataColindancia => {
      this.info = dataColindancia;
      this.dataSource.data = dataColindancia;
    });



     //Sección Terreno
     this.terreno1FormGroup = this.formBuilder.group({
      'calleFrenteF': new FormControl('', [Validators.required]),
      'calleFrentePuntoCard': new FormControl('', [Validators.required]),
      'entreCalle': new FormControl('', [Validators.required]),
      'entreCallePuntoCard': new FormControl('', [Validators.required]),
      'calleY': new FormControl('', [Validators.required]),
      'calleYPuntoCard': new FormControl('', [Validators.required]),
      'calleManzana': new FormControl('', [Validators.required]),
      'calleManzanaPuntoCard': new FormControl('', [Validators.required]),
      'superficieTotalTerreno': new FormControl('', [Validators.required]),
      'descripcionSuperficie': new FormControl(''),
      'idTipoFuenteInformacion': new FormControl('', [Validators.required]),
      'orientacion1': new FormControl('', [Validators.required]),
      'medida1': new FormControl('', [Validators.required]),
      'detalleColindante1': new FormControl('', [Validators.required]),
      'orientacion2': new FormControl('', [Validators.required]),
      'medida2': new FormControl('', [Validators.required]),
      'detalleColindante2': new FormControl('', [Validators.required]),
      'orientacion3': new FormControl('', [Validators.required]),
      'medida3': new FormControl('', [Validators.required]),
      'detalleColindante3': new FormControl('', [Validators.required]),
      'orientacion4': new FormControl('', [Validators.required]),
      'medida4': new FormControl('', [Validators.required]),
      'detalleColindante4': new FormControl('', [Validators.required]),
    });

     //Sección TerrenoFuenteLegal
     this.terreno2FormGroup = this.formBuilder.group({
      'escritura': new FormControl('', [Validators.required]),
      'volumenEscritura': new FormControl('', [Validators.required]),
      'fechaEscritura': new FormControl('', [Validators.required]),
      'numeroNotariaEscritura': new FormControl('', [Validators.required]),
      'nombreNotarioEscritura': new FormControl('', [Validators.required]),
      'idDistritoJudicialNotario': new FormControl('', [Validators.required]),
      'juzgadoSentencia': new FormControl('', [Validators.required]),
      'fechaSentencia': new FormControl('', [Validators.required]),
      'expedienteSentencia': new FormControl('', [Validators.required]),
      'fechaAlineaNumOficial': new FormControl(''),
      'folioAlineaNumOficial': new FormControl('', [Validators.required]),
      'fechaContratoPrivado': new FormControl('', [Validators.required]),
      'nombreAdquirente': new FormControl('', [Validators.required]),
      'paternoAdquirente': new FormControl('', [Validators.required]),
      'maternoAdquirente': new FormControl('', [Validators.required]),
      'nombreEnajenante': new FormControl('', [Validators.required]),
      'paternoEnajenante': new FormControl('', [Validators.required]),
      'maternoEnajenante': new FormControl('', [Validators.required]),
    });

     //Sección TerrenoComplemento
     this.terreno3FormGroup = this.formBuilder.group({
      'idTopografia': new FormControl('', [Validators.required]),
      'idFormaTerreno': new FormControl('', [Validators.required]),
      'idDensidadHabitacional': new FormControl('', [Validators.required]),
      'servidumbresORestricciones': new FormControl('', [Validators.required]),
      'caracteristPanoramicasF': new FormControl({ value: '', disabled: true }),
      'intencidadConstruccionF': new FormControl({ value: '', disabled: true }),
      'descIntencidadConstruccionF': new FormControl({ value: '', disabled: true }),
    });   
  }

  expand(){
    this.isExpanded = !this.isExpanded;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // convenience getter for easy access to form fields
  get ant1() { return this.terreno1FormGroup.controls; }

   //Llama servicio sección Terrenos CATÁLOGOS
   getCatTerreno (tipo: string) {

    this.loading = true;
    this.catalogoService.getCatalogoTerreno(tipo)
          .pipe(first())
          .subscribe( data => {                    

                this.loading = false;

                switch(tipo)
                { 
                  case "PUNTOSCARDINALES":
                  this.puntosCardinales = data; 
                  break;
                  case "FUENTEINFORMACION":
                    this.fuenteInformacion = data; 
                  break;
                  case "TOPOGRAFIA":
                    this.topografia = data; 
                  break;
                  case "FORMATERRENO":
                    this.formaTerreno = data; 
                  break;
                  case "DENSIDADHABITACIONAL":
                    this.densidadHabitacional = data; 
                  break;
                  case "ENTIDAD":
                    this.entidad = data; 
                  break;
                  default: 
                }          
              },
              error => {
                this.alertTerreno = true;  
                this.loading = false;
                this.msg = error;
                this.classAlert = 'alert-danger alert alert-dismissible fade show';
              });    
  }


   //Llama servicio para alta de terreno
   addTerreno(){
  
    // stop here if form is invalid
    if (this.terreno1FormGroup.invalid) {
      return;
  }

  this.terreno = {callefrentef: this.ant1.calleFrenteF.value, callefrentepuntocard: this.ant1.calleFrentePuntoCard.value, entrecalle: this.ant1.entreCalle.value, entrecallepuntocard: this.ant1.entreCallePuntoCard.value,
                calley: this.ant1.calleY.value,  calleypuntocard: this.ant1.calleYPuntoCard.value, callemanzana: this.ant1.calleManzana.value, 
                callemanzanapuntocard: this.ant1.calleManzanaPuntoCard.value,  superficietotalterreno: this.ant1.superficieTotalTerreno.value, descripcionsuperficie: this.ant1.descripcionSuperficie.value, 
                idtipofuenteinformacion: this.ant1.idTipoFuenteInformacion.value, orientacion1: this.ant1.orientacion1.value, medida1: this.ant1.medida1.value, 
                detallecolindante1: this.ant1.detalleColindante1.value, orientacion2: this.ant1.orientacion2.value, medida2: this.ant1.medida2.value, detallecolindante2: this.ant1.detalleColindante2.value,
                orientacion3: this.ant1.orientacion3.value, medida3: this.ant1.medida3.value, detallecolindante3: this.ant1.detalleColindante3.value,
                orientacion4: this.ant1.orientacion4.value, medida4: this.ant1.medida4.value, detallecolindante4: this.ant1.detalleColindante4.value}
  

  this.loading = true;
  this.terrenoService.addTerreno(this.folio, this.terreno)
      .pipe(first())
      .subscribe(
          data => {

          if(data.ok){
            this.alertTerreno = true;        
            this.loading = false;
            this.msg = data.mensaje;
            this.classAlert = 'alert-success alert alert-dismissible fade show';   
        } else {
          this.alertTerreno = true;   
          this.loading = false;
          this.msg = data.mensaje;
          this.classAlert = 'alert-danger alert alert-dismissible fade show';
        }
        },
        error => {
          this.alertTerreno = true;  
          this.loading = false;
          this.msg = error;
          this.classAlert = 'alert-danger alert alert-dismissible fade show';
        });

  }

  //Llama servicio para la consulta de terreno
  searchTerreno () {

  this.closeAlertTerreno();
  this.loading = true;
  this.terrenoService.searchTerreno(this.folio)
         .pipe(first())
         .subscribe( data => {                    
               this.loading = false;
               this.info = data.terreno;
              if (this.info != ""){

               this.terreno1FormGroup.controls['calleFrenteF'].setValue(this.info.calleFrenteF); 
               this.terreno1FormGroup.controls['calleFrentePuntoCard'].setValue(this.info.calleFrentePuntoCard); 
               this.terreno1FormGroup.controls['entreCalle'].setValue(this.info.entreCalle);
               this.terreno1FormGroup.controls['entreCallePuntoCard'].setValue(this.info.entreCallePuntoCard);
               this.terreno1FormGroup.controls['calleY'].setValue(this.info.calleY);
               this.terreno1FormGroup.controls['calleYPuntoCard'].setValue(this.info.calleYPuntoCard);
               this.terreno1FormGroup.controls['calleManzana'].setValue(this.info.calleManzana);
               this.terreno1FormGroup.controls['calleManzanaPuntoCard'].setValue(this.info.calleManzanaPuntoCard);
               this.terreno1FormGroup.controls['superficieTotalTerreno'].setValue(this.info.superficieTotalTerreno);
               this.terreno1FormGroup.controls['descripcionSuperficie'].setValue(this.info.descripcionSuperficie);                   
               this.terreno1FormGroup.controls['idTipoFuenteInformacion'].setValue(this.info.idTipoFuenteInformacion);           
               this.terreno1FormGroup.controls['orientacion1'].setValue(this.info.orientacion1); 
               this.terreno1FormGroup.controls['medida1'].setValue(this.info.medida1);  
               this.terreno1FormGroup.controls['detalleColindante1'].setValue(this.info.detalleColindante1);  
               this.terreno1FormGroup.controls['orientacion2'].setValue(this.info.orientacion2);  
               this.terreno1FormGroup.controls['medida2'].setValue(this.info.medida2);  
               this.terreno1FormGroup.controls['detalleColindante2'].setValue(this.info.detalleColindante2);  
               this.terreno1FormGroup.controls['orientacion3'].setValue(this.info.orientacion3);  
               this.terreno1FormGroup.controls['medida3'].setValue(this.info.medida3);  
               this.terreno1FormGroup.controls['detalleColindante3'].setValue(this.info.detalleColindante3);  
               this.terreno1FormGroup.controls['orientacion4'].setValue(this.info.orientacion4);  
               this.terreno1FormGroup.controls['medida4'].setValue(this.info.medida4);  
               this.terreno1FormGroup.controls['detalleColindante4'].setValue(this.info.detalleColindante4);  
              }

             },
             error => {
              this.alertTerreno = true;  
              this.loading = false;
              this.msg = error;
              this.classAlert = 'alert-danger alert alert-dismissible fade show';
             }); 
             
             
     }

      // convenience getter for easy access to form fields
  get ant2() { return this.terreno2FormGroup.controls; }

    //Llama servicio para alta de terreno
    addTerrenoFuenteLegal(){
  
    // stop here if form is invalid
      if (this.terreno2FormGroup.invalid) {
       return;
    }
    
    this.terrenoFuenteLegal = {escritura: this.ant2.escritura.value, volumenescritura: this.ant2.volumenEscritura.value, fechaescritura: this.ant2.fechaEscritura.value, numeronotariaescritura: this.ant2.numeroNotariaEscritura.value,
                  nombrenotarioescritura: this.ant2.nombreNotarioEscritura.value,  iddistritojudicialnotario: this.ant2.idDistritoJudicialNotario.value, juzgadosentencia: this.ant2.juzgadoSentencia.value, 
                  fechasentencia: this.ant2.fechaSentencia.value,  expedientesentencia: this.ant2.expedienteSentencia.value, fechaalineanumoficial: this.ant2.fechaAlineaNumOficial.value, 
                  folioalineanumoficial: this.ant2.folioAlineaNumOficial.value, fechacontratoprivado: this.ant2.fechaContratoPrivado.value, nombreadquirente: this.ant2.nombreAdquirente.value, 
                  paternoadquirente: this.ant2.paternoAdquirente.value, maternoadquirente: this.ant2.maternoAdquirente.value, nombreenajenante: this.ant2.nombreEnajenante.value, paternoenajenante: this.ant2.paternoEnajenante.value,
                  maternoenajenante: this.ant2.maternoEnajenante.value}
  
    this.loading = true;
    this.terrenoService.addTerrenoFuenteLegal(this.folio, this.terrenoFuenteLegal)
        .pipe(first())
        .subscribe(
            data => {
  
            if(data.ok){
              this.alertTerrenoFuenteLegal = true;        
              this.loading = false;
              this.msg = data.mensaje;
              this.classAlert = 'alert-success alert alert-dismissible fade show';   
          } else {
            this.alertTerrenoFuenteLegal = true;   
            this.loading = false;
            this.msg = data.mensaje;
            this.classAlert = 'alert-danger alert alert-dismissible fade show';
          }
          },
          error => {
            this.alertTerrenoFuenteLegal = true;  
            this.loading = false;
            this.msg = error;
            this.classAlert = 'alert-danger alert alert-dismissible fade show';
          });
  
    }

     //Llama servicio para la consulta de terreno
  searchTerrenoFuenteLegal () {

    this.closeAlertTerrenoFuenteLegal();
    this.loading = true;
    this.terrenoService.searchTerrenoFuenteLegal(this.folio)
           .pipe(first())
           .subscribe( data => {                    
                 this.loading = false;
                 this.info = data.terrenoFuenteLegal;
                if (this.info != ""){

                 this.terreno2FormGroup.controls['escritura'].setValue(this.info.escritura); 
                 this.terreno2FormGroup.controls['volumenEscritura'].setValue(this.info.volumenEscritura); 
                 this.terreno2FormGroup.controls['fechaEscritura'].setValue(this.info.fechaEscritura);
                 this.terreno2FormGroup.controls['numeroNotariaEscritura'].setValue(this.info.numeroNotariaEscritura);
                 this.terreno2FormGroup.controls['nombreNotarioEscritura'].setValue(this.info.nombreNotarioEscritura);
                 this.terreno2FormGroup.controls['idDistritoJudicialNotario'].setValue(this.info.idDistritoJudicialNotario);
                 this.terreno2FormGroup.controls['juzgadoSentencia'].setValue(this.info.juzgadoSentencia);
                 this.terreno2FormGroup.controls['fechaSentencia'].setValue(this.info.fechaSentencia);
                 this.terreno2FormGroup.controls['expedienteSentencia'].setValue(this.info.expedienteSentencia);
                 this.terreno2FormGroup.controls['fechaAlineaNumOficial'].setValue(this.info.fechaAlineaNumOficial);                   
                 this.terreno2FormGroup.controls['folioAlineaNumOficial'].setValue(this.info.folioAlineaNumOficial);           
                 this.terreno2FormGroup.controls['fechaContratoPrivado'].setValue(this.info.fechaContratoPrivado); 
                 this.terreno2FormGroup.controls['nombreAdquirente'].setValue(this.info.nombreAdquirente);  
                 this.terreno2FormGroup.controls['paternoAdquirente'].setValue(this.info.paternoAdquirente);  
                 this.terreno2FormGroup.controls['maternoAdquirente'].setValue(this.info.maternoAdquirente);  
                 this.terreno2FormGroup.controls['nombreEnajenante'].setValue(this.info.nombreEnajenante);  
                 this.terreno2FormGroup.controls['paternoEnajenante'].setValue(this.info.paternoEnajenante);  
                 this.terreno2FormGroup.controls['maternoEnajenante'].setValue(this.info.maternoEnajenante);  
                }
  
               },
               error => {
                this.alertTerrenoFuenteLegal = true;  
                this.loading = false;
                this.msg = error;
                this.classAlert = 'alert-danger alert alert-dismissible fade show';
               }); 
               
               
       }

  // convenience getter for easy access to form fields
  get ant3() { return this.terreno3FormGroup.controls; }

  //Llama servicio para alta de terreno
  addTerrenoComplemento(){


  // stop here if form is invalid
  if (this.terreno3FormGroup.invalid) {
     return;
  }
  
  this.terrenoComplemento = {idtopografia: this.ant3.idTopografia.value, idformaterreno: this.ant3.idFormaTerreno.value, 
    iddensidadhabitacional: this.ant3.idDensidadHabitacional.value, servidumbresorestricciones: this.ant3.servidumbresORestricciones.value,
  caracteristicaspanoramicasf: this.ant3.caracteristPanoramicasF.value, intencidadconstruccionf: this.ant3.intencidadConstruccionF.value,
  descintencidadconstruccionf: this.ant3.descIntencidadConstruccionF.value }
  

  this.loading = true;
  this.terrenoService.addTerrenoComplemento(this.folio, this.terrenoComplemento)
      .pipe(first())
      .subscribe(
          data => {

          if(data.ok){
            this.alertTerrenoComplemento = true;        
            this.loading = false;
            this.msg = data.mensaje;
            this.classAlert = 'alert-success alert alert-dismissible fade show';   
        } else {
          this.alertTerrenoComplemento = true;   
          this.loading = false;
          this.msg = data.mensaje;
          this.classAlert = 'alert-danger alert alert-dismissible fade show';
        }
        },
        error => {
          this.alertTerrenoComplemento = true;  
          this.loading = false;
          this.msg = error;
          this.classAlert = 'alert-danger alert alert-dismissible fade show';
        });

  }

   //Llama servicio para la consulta de terreno
searchTerrenoComplemento () {

  this.closeAlertTerrenoComplemento();
  this.loading = true;
  this.terrenoService.searchTerrenoComplemento(this.folio)
         .pipe(first())
         .subscribe( data => {                    
               this.loading = false;
               this.info = data.terrenoComplemento;

              if (this.info != ""){
               this.terreno3FormGroup.controls['idTopografia'].setValue(this.info.idTopografia); 
               this.terreno3FormGroup.controls['idFormaTerreno'].setValue(this.info.idFormaTerreno); 
               this.terreno3FormGroup.controls['idDensidadHabitacional'].setValue(this.info.idDensidadHabitacional);
               this.terreno3FormGroup.controls['servidumbresORestricciones'].setValue(this.info.servidumbresORestricciones);
               this.terreno3FormGroup.controls['caracteristPanoramicasF'].setValue(this.info.caracteristPanoramicasF);
               this.terreno3FormGroup.controls['intencidadConstruccionF'].setValue(this.info.intencidadConstruccionF);
               this.terreno3FormGroup.controls['descIntencidadConstruccionF'].setValue(this.info.descIntencidadConstruccionF);
              }

             },
             error => {
              this.alertTerrenoComplemento = true;  
              this.loading = false;
              this.msg = error;
              this.classAlert = 'alert-danger alert alert-dismissible fade show';
             }); 
             
             
     }


 

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  closeAlertTerreno(){
    this.alertTerreno = false;
  }

  closeAlertTerrenoFuenteLegal(){
    this.alertTerrenoFuenteLegal = false;
  }

  closeAlertTerrenoComplemento(){
    this.alertTerrenoComplemento = false;
  }


  validateNumber(e: any) {
    let input = String.fromCharCode(e.charCode);
    const reg = /^\d*(?:[.,]\d{1,2})?$/;

    if (!reg.test(input)) {
      e.preventDefault();
    }
}

//Abre modal para el registro de avalúo
openDialog(): void {
  const dialogRef = this.dialog.open(ColindanciasDialogComponent, {
    width: '900px',
    data: { name: this.name, color: this.color }
  });

  dialogRef.afterClosed().subscribe(res => {
    this.color = res;
    this.searchTerrenoColindancias();
  });
}

   //Llama servicio para la consulta de terreno
   searchTerrenoColindancias () {
    
    this.loading = true;
    this.terrenoService.searchTerrenoColindancias(this.folio)
           .pipe(first())
           .subscribe( data => {                    
                 this.loading = false;
                 this.info = data.colindancias;
  
                 this.subject$.next(this.info);
  
               },
               error => {
                this.alertTerrenoComplemento = true;  
                this.loading = false;
                this.msg = error;
                this.classAlert = 'alert-danger alert alert-dismissible fade show';
               }); 
               
               
       }



}
