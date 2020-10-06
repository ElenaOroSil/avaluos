import { Component, OnInit} from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import { Asentamiento } from './../../../_models/asentamiento.model';
import { AsentamientoService } from './../../../_services/asentamiento.service';
import { first } from 'rxjs/operators';
import { Solicitante, Propietario, Inmueble } from './../../../_models/antecedentes.model';
import { AntecedentesService } from './../../../_services/antecedentes.service';
import { CatalogosService } from './../../../_services/catalogos.service';



@Component({
  selector: 'app-panel-antecedentes',
  templateUrl: './panel-antecedentes.component.html',
  styleUrls: ['./panel-antecedentes.component.scss']
})
export class PanelAntecedentesComponent implements OnInit {

  ant1FormGroup: FormGroup;
  ant2FormGroup: FormGroup;
  ant3FormGroup: FormGroup;
  data: any = {};
  infoIdentidad: string;
  infoEntidad: string;
  infoIdmunicipio: string;
  infoMunicipio: string;
  listaAsenSol: any = []; 
  loading = false;
  alertSolicitante: boolean = false;
  alertPropietario: boolean = false;
  alertInmueble: boolean = false;
  classAlert: string;
  msg= '';
  isExpanded:boolean = false;
  

  infoPIdentidad: string;
  infoPEntidad: string;
  infoPIdmunicipio: string;
  infoPMunicipio: string;
  listaAsenPro: any = []; 

  infoInIdentidad: string;
  infoIEntidad: string;
  infoInIdmunicipio: string;
  infoIMunicipio: string;
  listaAsenInm: any = []; 

  info: any = {};
  listaAsentamientos: Asentamiento[];
  solicitante: Solicitante;
  propietario: Propietario;
  inmueble: Inmueble;
  folio = localStorage.getItem('folio');
  latitudMap: 40.4045067;
  longitudMap: 49.8724673;


  tpoPersonaSolicitante;
  nombreSolicitante;
  apSolicitante;
  amSolicitante;
  rfcSolicitante;
  curpSolicitante;
  telSolicitante;
  extSolicitante;
  movilSolicitante;
  cpSolicitante;
  calleSolicitante;
  numExtSolicitante;
  numIntSolicitante;
  mnzaSolicitante;
  loteSolicitante;
  edifSolicitante;

 
  tpoPersonaPropietario;
  nombrePropietario;
  apPropietario;
  amPropietario;
  rfcPropietario;
  curpPropietario;
  telPropietario;
  extPropietario;
  movilPropietario;
  cpPropietario;
  callePropietario;
  numExtPropietario;
  numIntPropietario;
  mnzaPropietario;
  lotePropietario;
  edifPropietario;

  cpInmueble;
  calleInmueble;
  numExtInmueble;
  numIntInmueble;
  mnzaInmueble;
  loteInmueble;
  edifInmueble;
  regionPredial;
  manzanaPredial;
  lotePredial;
  localidadPredial;
  cuentaAgua;
  desInmuebleEvaluar;
  idUsoConstruccion;
  idClaseConstruccion;
  regimenPropiedad;
  porcentajeIndiviso;
  idObjetoAvaluo;
  idPropositoAvaluo;
  areaCatastral;
  valorCatastral;
  corredorEnclave;
  valorCorredorEnClave;
  corredorOEnClave;
  valorCorredorOEnClave;
  anioEjercicioFiscalf;
  aniosDiferenciaF;
  areaValorf;
  corredorEnclavef;
  areaValorAniof;
  valorCorredorEnclaveAniof;
  latitud;
  longitud;
  altitud;

  constructor(private formBuilder: FormBuilder,
    private asentamientoService: AsentamientoService,
    private antecedentesService: AntecedentesService,
    private catalogoService: CatalogosService) { }

  ngOnInit(): void {

    this.expand();

    //Combos de Inmuebles
    this.getCatInmuebles("REGIMENPROPIEDAD");
    this.getCatInmuebles("OBJETOAVALUO");
    this.getCatInmuebles("PROPOSITOAVALUO");
    this.getCatInmuebles("USOCONSTRUCCION");
    this.getCatInmuebles("CLASECONSTRUCCION");
     

    this.ant1FormGroup = this.formBuilder.group({
      'tpoPersonaSolicitante': new FormControl('F', [Validators.required]),
      'nombreSolicitante': new FormControl('', [Validators.required]),
      'apSolicitante': new FormControl( '', [Validators.required]),
      'amSolicitante': new FormControl(''),
      'rfcSolicitante': new FormControl('', [Validators.required]),
      'curpSolicitante': new FormControl('', [Validators.required]),
      'telSolicitante': new FormControl('', [Validators.required]),
      'extSolicitante': new FormControl(''),
      'movilSolicitante': new FormControl('', [Validators.required]),
      'cpSolicitante': new FormControl('', [Validators.required]),
      'infoIdentidad': new FormControl(''),
      'infoEntidad': new FormControl(''),
      'infoIdmunicipio': new FormControl(''),
      'infoMunicipio': new FormControl(''),
      'idasentamiento': new FormControl('', [Validators.required]),
      'calleSolicitante': new FormControl('', [Validators.required]),
      'numExtSolicitante': new FormControl('', [Validators.required]),
      'numIntSolicitante': new FormControl(''),
      'mnzaSolicitante': new FormControl(''),
      'loteSolicitante': new FormControl(''),
      'edifSolicitante': new FormControl(''),
    });

    this.ant2FormGroup = this.formBuilder.group({
      'tpoPersonaPropietario': new FormControl('F', [Validators.required]),
      'nombrePropietario': new FormControl('', [Validators.required]),
      'apPropietario': new FormControl( '', [Validators.required]),
      'amPropietario': new FormControl(''),
      'rfcPropietario': new FormControl('', [Validators.required]),
      'curpPropietario': new FormControl('', [Validators.required]),
      'telPropietario': new FormControl('', [Validators.required]),
      'extPropietario': new FormControl(''),
      'movilPropietario': new FormControl('', [Validators.required]),
      'cpPropietario': new FormControl('', [Validators.required]),
      'infoPIdentidad': new FormControl(''),
      'infoPEntidad': new FormControl(''),
      'infoPIdmunicipio': new FormControl(''),
      'infoPMunicipio': new FormControl(''),
      'idPasentamiento': new FormControl('', [Validators.required]),
      'callePropietario': new FormControl('', [Validators.required]),
      'numExtPropietario': new FormControl('', [Validators.required]),
      'numIntPropietario': new FormControl(''),
      'mnzaPropietario': new FormControl(''),
      'lotePropietario': new FormControl(''),
      'edifPropietario': new FormControl(''),
    });

    this.ant3FormGroup = this.formBuilder.group({
      'cpInmueble': new FormControl('', [Validators.required]),
      'infoInIdentidad': new FormControl('', [Validators.required]),
      'infoIEntidad': new FormControl(''),
      'infoInIdmunicipio': new FormControl(''),
      'infoIMunicipio': new FormControl(''),
      'idIasentamiento': new FormControl('', [Validators.required]),
      'calleInmueble': new FormControl('', [Validators.required]),
      'numExtInmueble': new FormControl('', [Validators.required]),
      'numIntInmueble': new FormControl(''),
      'mnzaInmueble': new FormControl(''),
      'loteInmueble': new FormControl(''),
      'edifInmueble': new FormControl(''),
      'regionPredial': new FormControl('', [Validators.required]),
      'manzanaPredial': new FormControl('', [Validators.required]),
      'lotePredial': new FormControl('', [Validators.required]),
      'localidadPredial': new FormControl('', [Validators.required]),
      'digitoVerificador': new FormControl('', [Validators.required]),
      'cuentaAgua': new FormControl('', [Validators.required]),
      'descInmuebleEvaluar': new FormControl(''),
      'idUsoConstruccion': new FormControl('', [Validators.required]),
      'idClaseConstruccion': new FormControl('', [Validators.required]),
      'idRegimenPropiedad': new FormControl('', [Validators.required]),
      'porcentajeIndiviso': new FormControl('', [Validators.required]),
      'idObjetoAvaluo': new FormControl('', [Validators.required]),
      'idPropositoAvaluo': new FormControl('', [Validators.required]),
      'areaCatastral': new FormControl(''),
      'valorCatastral': new FormControl('', [Validators.required]),
      'corredorEnclave': new FormControl('', [Validators.required]),
      'valorCorredorEnClave': new FormControl('', [Validators.required]),
      'corredorOEnClave': new FormControl('', [Validators.required]),
      'valorCorredorOEnClave': new FormControl('', [Validators.required]),
      'anioEjercicioFiscalf': new FormControl({ value: '', disabled: true }),
      'aniosDiferenciaF': new FormControl({ value: '', disabled: true }),
      'areaValorf': new FormControl({ value: '', disabled: true }),
      'corredorEnclavef': new FormControl({ value: '', disabled: true }),
      'areaValorAniof': new FormControl({ value: '', disabled: true }),
      'valorCorredorEnclaveAniof': new FormControl({ value: '', disabled: true }),
      'latitud': new FormControl(''),
      'longitud': new FormControl(''),
      'altitud': new FormControl('')
    });


  }

  expand(){
    this.isExpanded = !this.isExpanded;
    }

  //Llama servicio sección Características Urbanas CATÁLOGOS
  getCatInmuebles (tipo: string) {

    this.loading = true;
    this.catalogoService.getCatalogoListaInmueble(tipo)
          .pipe(first())
          .subscribe( data => {                    
                this.loading = false;

                switch(tipo)
                { 
                  case "REGIMENPROPIEDAD":
                  this.regimenPropiedad = data; 
                  break;
                  case "OBJETOAVALUO":
                    this.idObjetoAvaluo = data; 
                  break;
                  case "PROPOSITOAVALUO":
                    this.idPropositoAvaluo = data; 
                  break;
                  case "USOCONSTRUCCION":
                    this.idUsoConstruccion = data; 
                  break;
                  case "CLASECONSTRUCCION":
                    this.idClaseConstruccion = data; 
                  break;                 
                  default: 
                } 
        
              },
              error => {
                this.alertInmueble = true;  
                this.loading = false;
                this.msg = error;
                this.classAlert = 'alert-danger alert alert-dismissible fade show';
              });    
  }


     //Llama servicio para búsqueda de CP
     searchCP (event, value) {

    this.loading = true;
    this.asentamientoService.getAsentamientos(event.target.value)
          .pipe(first())
          .subscribe( data => {                    
                this.loading = false;
                this.info = data.datosCP;

               
                if (value == 'solicitante'){
                this.infoIdentidad = this.info["identidad"];
                this.infoEntidad = this.info["entidad"];
                this.infoIdmunicipio = this.info["idmunicipio"];
                this.infoMunicipio = this.info["municipio"];
                this.listaAsenSol = this.info["listaasentamientos"];
              } 
              
              if (value == 'propietario'){
                this.infoPIdentidad = this.info["identidad"];
                this.infoPEntidad = this.info["entidad"];
                this.infoPIdmunicipio = this.info["idmunicipio"];
                this.infoPMunicipio = this.info["municipio"];
                this.listaAsenPro = this.info["listaasentamientos"];
              }

              if (value == 'inmueble'){
             this.infoInIdentidad = this.info["identidad"];
             this.infoIEntidad = this.info["entidad"];
             this.infoInIdmunicipio = this.info["idmunicipio"];
             this.infoIMunicipio = this.info["municipio"];
             this.listaAsenInm = this.info["listaasentamientos"];
           }
      
              },
              error => {
                //this.error = error;
 
                  this.loading = false;
              });    
  
  }

  // convenience getter for easy access to form fields
  get ant1() { return this.ant1FormGroup.controls; }

 //Llama servicio para alta de solicitante
  addSolicitante(){

    // stop here if form is invalid
    if (this.ant1FormGroup.invalid) {
      return;
  }

  this.solicitante = {nombre: this.ant1.nombreSolicitante.value, paterno: this.ant1.apSolicitante.value, materno: this.ant1.amSolicitante.value,
                tipoPersona: this.ant1.tpoPersonaSolicitante.value,  rfc: this.ant1.rfcSolicitante.value, curp: this.ant1.curpSolicitante.value, telefonoFijo: this.ant1.telSolicitante.value, 
                extTelefono: this.ant1.extSolicitante.value, telefonoMovil: this.ant1.movilSolicitante.value, cp: String(this.ant1.cpSolicitante.value),
                idEntidad: String(this.ant1.infoIdentidad.value), idMunicipio: String(this.ant1.infoIdmunicipio.value), idAsentamiento: String(this.ant1.idasentamiento.value),
                calle: this.ant1.calleSolicitante.value, exterior: this.ant1.numExtSolicitante.value, interior: this.ant1.numIntSolicitante.value, 
                manzana: this.ant1.mnzaSolicitante.value, lote: this.ant1.loteSolicitante.value, edificio: this.ant1.edifSolicitante.value}


  this.loading = true;
  this.antecedentesService.addSolicitante(this.folio, this.solicitante)
      .pipe(first())
      .subscribe(
        data => {

        if(data.ok){
          this.alertSolicitante = true;        
          this.loading = false;
          this.msg = data.mensaje;
          this.classAlert = 'alert-success alert alert-dismissible fade show';       
      } else {
        this.alertSolicitante = true;   
        this.loading = false;
        this.msg = data.mensaje;
        this.classAlert = 'alert-danger alert alert-dismissible fade show';
      }
      },
      error => {
        this.alertSolicitante = true;  
        this.loading = false;
        this.msg = error;
        this.classAlert = 'alert-danger alert alert-dismissible fade show';
      });

  }

  //Llama servicio para la consulta de solicitantes
 searchSolicitantes () {

  this.closeAlertSol();
  this.loading = true;
  this.antecedentesService.searchSolicitantes(this.folio)
         .pipe(first())
         .subscribe( data => {                    
               this.loading = false;
               this.info = data.solicitante;
              if (this.info != ""){

               this.ant1FormGroup.controls['tpoPersonaSolicitante'].setValue(this.info.tipoPersona); 
               this.ant1FormGroup.controls['nombreSolicitante'].setValue(this.info.nombre);
               this.ant1FormGroup.controls['apSolicitante'].setValue(this.info.paterno);
               this.ant1FormGroup.controls['amSolicitante'].setValue(this.info.materno);
               this.ant1FormGroup.controls['rfcSolicitante'].setValue(this.info.rfc);
               this.ant1FormGroup.controls['curpSolicitante'].setValue(this.info.curp);
               this.ant1FormGroup.controls['telSolicitante'].setValue(this.info.telefonoFijo);
               this.ant1FormGroup.controls['extSolicitante'].setValue(this.info.extTelefono);
               this.ant1FormGroup.controls['movilSolicitante'].setValue(this.info.telefonoMovil);
               this.ant1FormGroup.controls['cpSolicitante'].setValue(this.info.cp);

               this.infoIdentidad = this.info.idEntidad;
               this.infoEntidad = this.info.entidad;
               this.infoIdmunicipio = this.info.idMunicipio;
               this.infoMunicipio = this.info.municipio;
               this.listaAsenSol = this.info.listaasentamientos
                      
               this.ant1FormGroup.controls['calleSolicitante'].setValue(this.info.calle);           
               this.ant1FormGroup.controls['numExtSolicitante'].setValue(this.info.exterior); 
               this.ant1FormGroup.controls['numIntSolicitante'].setValue(this.info.interior);  
               this.ant1FormGroup.controls['mnzaSolicitante'].setValue(this.info.manzana);  
               this.ant1FormGroup.controls['loteSolicitante'].setValue(this.info.lote);  
               this.ant1FormGroup.controls['edifSolicitante'].setValue(this.info.edificio);              
              }

             },
             error => {
              this.alertSolicitante = true;  
              this.loading = false;
              this.msg = error;
              this.classAlert = 'alert-danger alert alert-dismissible fade show';
             });    
     }


      // convenience getter for easy access to form fields
  get ant2() { return this.ant2FormGroup.controls; }

  //Llama servicio para alta de propietario
  addPropietario(){

    // stop here if form is invalid
    if (this.ant2FormGroup.invalid) {
      return;
  }

  this.propietario = {nombre: this.ant2.nombrePropietario.value, paterno: this.ant2.apPropietario.value, materno: this.ant2.amPropietario.value,
                tipoPersona: this.ant2.tpoPersonaPropietario.value,  rfc: this.ant2.rfcPropietario.value, curp: this.ant2.curpPropietario.value, telefonoFijo: this.ant2.telPropietario.value, 
                extTelefono: this.ant2.extPropietario.value, telefonoMovil: this.ant2.movilPropietario.value, cp: String(this.ant2.cpPropietario.value),
                idEntidad: String(this.ant2.infoPIdentidad.value), idMunicipio: String(this.ant2.infoPIdmunicipio.value), idAsentamiento: String(this.ant2.idPasentamiento.value),
                calle: this.ant2.callePropietario.value, exterior: this.ant2.numExtPropietario.value, interior: this.ant2.numIntPropietario.value, 
                manzana: this.ant2.mnzaPropietario.value, lote: this.ant2.lotePropietario.value, edificio: this.ant2.edifPropietario.value}

  this.loading = true;
  this.antecedentesService.addPropietario(this.folio, this.propietario)
      .pipe(first())
      .subscribe(
          data => {

          if(data.ok){
            this.alertPropietario = true;        
            this.loading = false;
            this.msg = data.mensaje;
            this.classAlert = 'alert-success alert alert-dismissible fade show';  
        } else {
          this.alertPropietario = true;   
          this.loading = false;
          this.msg = data.mensaje;
          this.classAlert = 'alert-danger alert alert-dismissible fade show';
        }
        },
        error => {
          this.alertPropietario = true;  
          this.loading = false;
          this.msg = error;
          this.classAlert = 'alert-danger alert alert-dismissible fade show';
        });

  }

  //Llama servicio para la consulta de propietarios
 searchPropietarios() {

  this.closeAlertPro();
  this.loading = true;
  this.antecedentesService.searchPropietario(this.folio)
         .pipe(first())
         .subscribe( data => {                    
               this.loading = false;
               this.info = data.propietario;
               
               if (this.info != ""){

                this.ant2FormGroup.controls['tpoPersonaPropietario'].setValue(this.info.tipoPersona); 
                this.ant2FormGroup.controls['nombrePropietario'].setValue(this.info.nombre);
                this.ant2FormGroup.controls['apPropietario'].setValue(this.info.paterno);
                this.ant2FormGroup.controls['amPropietario'].setValue(this.info.materno);
                this.ant2FormGroup.controls['rfcPropietario'].setValue(this.info.rfc);
                this.ant2FormGroup.controls['curpPropietario'].setValue(this.info.curp);
                this.ant2FormGroup.controls['telPropietario'].setValue(this.info.telefonoFijo);
                this.ant2FormGroup.controls['extPropietario'].setValue(this.info.extTelefono);
                this.ant2FormGroup.controls['movilPropietario'].setValue(this.info.telefonoMovil);
                this.ant2FormGroup.controls['cpPropietario'].setValue(this.info.cp);
 
                this.infoPIdentidad = this.info.idEntidad;
                this.infoPEntidad = this.info.entidad;
                this.infoPIdmunicipio = this.info.idMunicipio;
                this.infoPMunicipio = this.info.municipio;
                this.listaAsenPro = this.info.listaasentamientos;
                       
                this.ant2FormGroup.controls['callePropietario'].setValue(this.info.calle);           
                this.ant2FormGroup.controls['numExtPropietario'].setValue(this.info.exterior); 
                this.ant2FormGroup.controls['numIntPropietario'].setValue(this.info.interior);  
                this.ant2FormGroup.controls['mnzaPropietario'].setValue(this.info.manzana);  
                this.ant2FormGroup.controls['lotePropietario'].setValue(this.info.lote);  
                this.ant2FormGroup.controls['edifPropietario'].setValue(this.info.edificio);              
               }
      

             },
             error => {
              this.alertPropietario = true;  
              this.loading = false;
              this.msg = error;
              this.classAlert = 'alert-danger alert alert-dismissible fade show';
             });    
     }


           // convenience getter for easy access to form fields
  get ant3() { return this.ant3FormGroup.controls; }

  

  //Llama servicio para la consulta de propietarios
 searchInmuebles() {

  this.closeAlertInm();
  this.loading = true;
  this.antecedentesService.searchInmuebles(this.folio)
         .pipe(first())
         .subscribe( data => {                    
               this.loading = false;
               this.info = data.inmueble;
               
               if (this.info != ""){

                this.ant3FormGroup.controls['calleInmueble'].setValue(this.info.calle); 
                this.ant3FormGroup.controls['numExtInmueble'].setValue(this.info.exterior);
                this.ant3FormGroup.controls['numIntInmueble'].setValue(this.info.interior);
                this.ant3FormGroup.controls['mnzaInmueble'].setValue(this.info.manzana);
                this.ant3FormGroup.controls['loteInmueble'].setValue(this.info.lote);
                this.ant3FormGroup.controls['edifInmueble'].setValue(this.info.edificio);
                this.ant3FormGroup.controls['cpInmueble'].setValue(this.info.cp);
                this.ant3FormGroup.controls['regionPredial'].setValue(this.info.regionPredial);
                this.ant3FormGroup.controls['manzanaPredial'].setValue(this.info.manzanaPredial);
                this.ant3FormGroup.controls['lotePredial'].setValue(this.info.lotePredial);
 
                this.infoInIdentidad = this.info.idEntidad;
                this.infoIEntidad = this.info.entidad;
                this.infoInIdmunicipio = this.info.idMunicipio;
                this.infoIMunicipio = this.info.municipio;
                this.listaAsenInm = this.info.listaasentamientos;
                       
                this.ant3FormGroup.controls['localidadPredial'].setValue(this.info.localidadPredial);           
                this.ant3FormGroup.controls['digitoVerificador'].setValue(this.info.digitoVerificador); 
                this.ant3FormGroup.controls['cuentaAgua'].setValue(this.info.cuentaAgua);  
                this.ant3FormGroup.controls['descInmuebleEvaluar'].setValue(this.info.descInmuebleEvaluar);  
                this.ant3FormGroup.controls['idUsoConstruccion'].setValue(this.info.idUsoConstruccion);  
                this.ant3FormGroup.controls['idClaseConstruccion'].setValue(this.info.idClaseConstruccion); 
                this.ant3FormGroup.controls['idRegimenPropiedad'].setValue(this.info.idRegimenPropiedad); 
                this.ant3FormGroup.controls['porcentajeIndiviso'].setValue(this.info.porcentajeIndiviso); 
                this.ant3FormGroup.controls['idObjetoAvaluo'].setValue(this.info.idObjetoAvaluo); 
                this.ant3FormGroup.controls['idPropositoAvaluo'].setValue(this.info.idPropositoAvaluo); 
                this.ant3FormGroup.controls['areaCatastral'].setValue(this.info.areaCatastral); 
                this.ant3FormGroup.controls['valorCatastral'].setValue(this.info.valorCatastral); 
                this.ant3FormGroup.controls['corredorEnclave'].setValue(this.info.corredorEnclave); 
                this.ant3FormGroup.controls['valorCorredorEnClave'].setValue(this.info.valorCorredorEnclave); 
                this.ant3FormGroup.controls['corredorOEnClave'].setValue(this.info.corredorOEnclave); 
                this.ant3FormGroup.controls['valorCorredorOEnClave'].setValue(this.info.valorCorredorOEnclave); 
                this.ant3FormGroup.controls['anioEjercicioFiscalf'].setValue(this.info.anioEjercicioFiscalf); 
                this.ant3FormGroup.controls['aniosDiferenciaF'].setValue(this.info.aniosDiferenciaF);  
                this.ant3FormGroup.controls['areaValorf'].setValue(this.info.areaValorf);   
                this.ant3FormGroup.controls['corredorEnclavef'].setValue(this.info.corredorEnclavef);   
                this.ant3FormGroup.controls['areaValorAniof'].setValue(this.info.areaValorAniof);   
                this.ant3FormGroup.controls['valorCorredorEnclaveAniof'].setValue(this.info.valorCorredorEnclaveAniof);   
                this.ant3FormGroup.controls['latitud'].setValue(this.info.latitud);   
                this.ant3FormGroup.controls['longitud'].setValue(this.info.longitud);   
                this.ant3FormGroup.controls['altitud'].setValue(this.info.altitud);   
    
               }
      

             },
             error => {
              this.alertInmueble = true;  
              this.loading = false;
              this.msg = error;
              this.classAlert = 'alert-danger alert alert-dismissible fade show';
             });    
     }


     //Llama servicio para alta del inmueble
     addInmueble(){


    //stop here if form is invalid
    if (this.ant3FormGroup.invalid) {
      return;
     }


  this.inmueble = {calle: this.ant3.calleInmueble.value, exterior: this.ant3.numExtInmueble.value, interior: this.ant3.numIntInmueble.value,
                manzana: this.ant3.mnzaInmueble.value,  lote: this.ant3.loteInmueble.value, edificio: this.ant3.edifInmueble.value, cp: this.ant3.cpInmueble.value, 
                idEntidad: this.ant3.infoInIdentidad.value, idMunicipio: this.ant3.infoInIdmunicipio.value, idAsentamiento: this.ant3.idIasentamiento.value,

                regionPredial: this.ant3.regionPredial.value, manzanaPredial: this.ant3.manzanaPredial.value, lotePredial: this.ant3.lotePredial.value,
                localidadPredial: this.ant3.localidadPredial.value, digitoVerificador: this.ant3.digitoVerificador.value, cuentaAgua: this.ant3.cuentaAgua.value, 
                descInmuebleEvaluar: this.ant3.descInmuebleEvaluar.value, idUsoConstruccion: this.ant3.idUsoConstruccion.value, idClaseConstruccion: this.ant3.idClaseConstruccion.value,
                idRegimenPropiedad: this.ant3.idRegimenPropiedad.value, porcentajeIndiviso: this.ant3.porcentajeIndiviso.value, idObjetoAvaluo: this.ant3.idObjetoAvaluo.value,
                idPropositoAvaluo: this.ant3.idPropositoAvaluo.value, areaCatastral: this.ant3.areaCatastral.value, valorCatastral: this.ant3.valorCatastral.value,
                corredorEnclave: this.ant3.corredorEnclave.value, valorCorredorEnclave: this.ant3.valorCorredorEnClave.value, corredorOEnclave: this.ant3.corredorOEnClave.value,
                valorCorredorOEnclave: this.ant3.valorCorredorOEnClave.value, anioEjercicioFiscalf: this.ant3.anioEjercicioFiscalf.value, aniosDiferenciaF: this.ant3.aniosDiferenciaF.value,
                areaValorf: this.ant3.areaValorf.value,  corredorEnclavef: this.ant3.corredorEnclavef.value, areaValorAniof: this.ant3.areaValorAniof.value, 
                valorCorredorEnclaveAniof: this.ant3.valorCorredorEnclaveAniof.value, latitud: this.ant3.latitud.value, longitud: this.ant3.longitud.value, altitud: this.ant3.altitud.value }


  this.loading = true;
  this.antecedentesService.addInmueble(this.folio, this.inmueble)
      .pipe(first())
      .subscribe(
          data => {

          if(data.ok){
            this.alertInmueble = true;        
            this.loading = false;
            this.msg = data.mensaje;
            this.classAlert = 'alert-success alert alert-dismissible fade show';  
        } else {
          this.alertInmueble = true;        
          this.loading = false;
          this.msg = data.mensaje;
          this.classAlert = 'alert-danger alert alert-dismissible fade show'; 
        }
        },
        error => {
          this.alertInmueble = true;  
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

    closeAlertSol(){
      this.alertSolicitante = false;
    }

    closeAlertPro(){
      this.alertPropietario = false;
    }

    closeAlertInm(){
      this.alertInmueble = false;
    }

}

