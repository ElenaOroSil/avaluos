import { Component, OnInit} from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import { first } from 'rxjs/operators';
import { CaractUrbanas, EquipamientoUrbano  } from './../../../_models/caractUrbanas.model';
import { CaracteristicasUrbanasService } from './../../../_services/caracteristicas-urbanas.service';
import { CatalogosService } from './../../../_services/catalogos.service';
import { Catalogo } from './../../../_models/catalogo.model';


@Component({
  selector: 'app-panel-caracteristicas-urbanas',
  templateUrl: './panel-caracteristicas-urbanas.component.html',
  styleUrls: ['./panel-caracteristicas-urbanas.component.scss']
})
export class PanelCaracteristicasUrbanasComponent implements OnInit {
  carUrb1FormGroup: FormGroup;
  carUrb2FormGroup: FormGroup;

  caractUrbanas: CaractUrbanas;
  equipaUrbano: EquipamientoUrbano;
  folio = localStorage.getItem('folio');
  info: any = {};
  templos: boolean;
  mercados: boolean;
  plazasPublicas: boolean;
  parquesJardines: boolean;
  escuelas: boolean;
  hospitales: boolean;
  bancos: boolean;
  estacionTransporte: boolean;
  loading = false;
  alertCaract: boolean = false;
  alertServicios: boolean = false;
  classAlert: string;
  msg= '';
  isExpanded:boolean = false;

 //Caracteristicas Urbanas CATÁLOGOS
  clasifZonaCat: Catalogo[];
  estClasifZonaCat: Catalogo[];
  densidadPobCat: Catalogo[];
  indiceSatZonaCat: Catalogo[];
  nivleSocioEconoCat: Catalogo[];
  usoSueloCat: Catalogo[];
  dencidadViviendaCat: Catalogo[];

 //EquipamientoUrbano CATÁLOGOS
 suministroTelCat: Catalogo[];
 acometidaInmuebleCat: Catalogo[];
 senalizacionViasCat: Catalogo[];
 nomenclaturaCallersCat: Catalogo[];
 recoleccionBasuraCat: Catalogo[];

  items: any = {} ;

  //Caracteristicas Urbanas
  clasifZona;
  estatusClasifZona;
  tpoConstruccion;
  indiceSatZona;
  denZona;
  indSatZonaValor;
  nivelSocioeconomico;
  densidadPob;
  contAmbZona;
  usoSuelo;
  numMaxNivConstruir;
  porcentAreaLibre;
  densidadVivienda;
  supMinLote;
  superfTpoLote;
  viasAccesoImp;

  //Equipamiento Urbano
  idSuministroTelefonico;
  idAcometidaInmueble;
  idSenalizacionVias;
  idNomenclaturaCalle;
  distinciaTransporteUrbano;
  frecuenciaTransporteUrbano;
  distanciaTransporteSuburbano
  frecuenciaTransporteSuburbano;
  idRecoleccionBasura;


  constructor(private formBuilder: FormBuilder,
    private caracteristicasUrbanasService: CaracteristicasUrbanasService,
    private catalogoService: CatalogosService) {  }

  ngOnInit(): void {

    this.expand();

    //Combos de Características Urbanas
    this.getCatCaractUrbanas("CLASIFICACIONZONA");
    this.getCatCaractUrbanas("ESTCLASIFICACIONZONA");
    this.getCatCaractUrbanas("DENCIDADPOBLACION");
    this.getCatCaractUrbanas("INDICESATURAZONA");
    this.getCatCaractUrbanas("NIVELSOCIOECONO");
    this.getCatCaractUrbanas("USOSUELO");
    this.getCatCaractUrbanas("DENCIDADVIVIENDA");
   
    //Combos de EquipamientoUrbano
    this.getCatEquipaUrbano("SUMINISTROTEL");
    this.getCatEquipaUrbano("ACOMETIDAINMUEBLE");
    this.getCatEquipaUrbano("SENALIZACIONVIAS");
    this.getCatEquipaUrbano("NOMENCLATURACALLES");
    this.getCatEquipaUrbano("RECOLECCIONBASURA");


    //Sección Características Urbanas
    this.carUrb1FormGroup = this.formBuilder.group({
      'clasifZona': new FormControl('', [Validators.required]),
      'estatusClasifZona': new FormControl(''),
      'tpoConstruccion': new FormControl( '', [Validators.required]),
      'indiceSatZona': new FormControl(''),
      'nivelSocioeconomico': new FormControl('', [Validators.required]),
      'densidadPob': new FormControl(''),
      'contAmbZona': new FormControl('', [Validators.required]),
      'usoSuelo': new FormControl('', [Validators.required]),
      'numMaxNivConstruir': new FormControl(''),
      'porcentAreaLibre': new FormControl(''),
      'densidadVivienda': new FormControl(''),
      'supMinLote': new FormControl(''),
      'superfTpoLote': new FormControl('', [Validators.required]),
      'viasAccesoImp': new FormControl('', [Validators.required]),
      'claveUsoSueloF': new FormControl({ value: '', disabled: true }),
      'descripUsoSueloF': new FormControl({ value: '', disabled: true }),
      'coeficienteDeUsoDelSueloF': new FormControl({ value: '', disabled: true }),
    });

    //Sección Equipamiento Urbano
    this.carUrb2FormGroup = this.formBuilder.group({
      'idSuministroTelefonico': new FormControl('', [Validators.required]),
      'idAcometidaInmueble': new FormControl('', [Validators.required]),
      'idSenalizacionVias': new FormControl( '', [Validators.required]),
      'idNomenclaturaCalle': new FormControl('', [Validators.required]),
      'distanciaTransporteUrbano': new FormControl(''),
      'frecuenciaTransporteUrbano': new FormControl(''),
      'distanciaTransporteSuburbano': new FormControl(''),
      'frecuenciaTransporteSuburbano': new FormControl(''),
      'idRecoleccionBasura': new FormControl('', [Validators.required]),
      'templos': new FormControl(false, [Validators.required]),
      'mercados': new FormControl(false, [Validators.required]),
      'plazasPublicas': new FormControl(false, [Validators.required]),
      'parquesJardines': new FormControl(false, [Validators.required]),
      'escuelas': new FormControl(false, [Validators.required]),
      'hospitales': new FormControl(false, [Validators.required]),
      'bancos': new FormControl(false, [Validators.required]),
      'estacionTransporte': new FormControl(false, [Validators.required]),
      'nivelEquipamientoF': new FormControl('')

    });
   
  }

  expand(){
    this.isExpanded = !this.isExpanded;
    }

   // convenience getter for easy access to form fields
   get ant1() { return this.carUrb1FormGroup.controls; }


   //Llama servicio para alta de características urbanas
   addCaractUrbanas(){
  
      // stop here if form is invalid
      if (this.carUrb1FormGroup.invalid) {
        return;
    }


   this.items = this.carUrb1FormGroup.get('indiceSatZona').value;

   this.caractUrbanas = {idclasifzona: this.ant1.clasifZona.value, idestatusclasifzona: this.ant1.estatusClasifZona.value, tipoconstruccion: this.ant1.tpoConstruccion.value,
                  idindicesaturacionzona: this.items["clave"],  indicesaturacionzonavalor: Number(this.items["valor"]), idnivelsocioeconomico: this.ant1.nivelSocioeconomico.value, 
                  iddensidadpoblacion: this.ant1.densidadPob.value,  contambientalzona: this.ant1.contAmbZona.value, idusosuelo: this.ant1.usoSuelo.value, 
                  nummaxnivelesconst: this.ant1.numMaxNivConstruir.value, porcentajearealibre: this.ant1.porcentAreaLibre.value, iddensidadvivienda: this.ant1.densidadVivienda.value, 
                  superficielotemin: this.ant1.supMinLote.value, superficielotetipo: this.ant1.superfTpoLote.value, viasaccesoeimportancia: this.ant1.viasAccesoImp.value, claveUsoSueloF: this.ant1.claveUsoSueloF.value,
                  descripUsoSueloF: this.ant1.descripUsoSueloF.value, coeficienteDeUsoDelSueloF: this.ant1.coeficienteDeUsoDelSueloF.value}
          
  
    this.loading = true;
    this.caracteristicasUrbanasService.addCaractUrbanas(this.folio, this.caractUrbanas)
        .pipe(first())
        .subscribe(
            data => {
  
            if(data.ok){
              this.alertCaract = true;        
              this.loading = false;
              this.msg = data.mensaje;
              this.classAlert = 'alert-success alert alert-dismissible fade show';   
          } else {
            this.alertCaract = true;   
            this.loading = false;
            this.msg = data.mensaje;
            this.classAlert = 'alert-danger alert alert-dismissible fade show';
          }
          },
          error => {
            this.alertCaract = true;  
            this.loading = false;
            this.msg = error;
            this.classAlert = 'alert-danger alert alert-dismissible fade show';
          });
  
    }
  
    //Llama servicio para la consulta de características urbanas
    searchCaractUrbanas () {
  
    this.closeAlertCaract();
    this.loading = true;
    this.caracteristicasUrbanasService.searchCaractUrbanas(this.folio)
           .pipe(first())
           .subscribe( data => {                    
                 this.loading = false;
                 this.info = data.caractUrbanas;
                if (this.info != ""){
 
                 this.carUrb1FormGroup.controls['clasifZona'].setValue(this.info.idClasificacionZona); 
                 this.carUrb1FormGroup.controls['estatusClasifZona'].setValue(this.info.idEstatusClasificacionZona);
                 this.carUrb1FormGroup.controls['tpoConstruccion'].setValue(this.info.tipoConstruccion);
                 this.carUrb1FormGroup.controls['indiceSatZona'].setValue(this.info.idIndiceSaturacionZona);
                 this.carUrb1FormGroup.controls['nivelSocioeconomico'].setValue(this.info.idNivelSocioEconomico);
                 this.carUrb1FormGroup.controls['densidadPob'].setValue(this.info.idDensidadPoblacion);
                 this.carUrb1FormGroup.controls['contAmbZona'].setValue(this.info.contaminacionAmbientalZona);
                 this.carUrb1FormGroup.controls['usoSuelo'].setValue(this.info.idUsoSuelo);
                 this.carUrb1FormGroup.controls['numMaxNivConstruir'].setValue(this.info.numeroMaximoNivelesConstruir);                   
                 this.carUrb1FormGroup.controls['porcentAreaLibre'].setValue(this.info.porcentajeAreaLibre);           
                 this.carUrb1FormGroup.controls['densidadVivienda'].setValue(this.info.idDensidadVivienda); 
                 this.carUrb1FormGroup.controls['supMinLote'].setValue(this.info.superficieLoteMinimo);  
                 this.carUrb1FormGroup.controls['superfTpoLote'].setValue(this.info.superficieLoteTipo);  
                 this.carUrb1FormGroup.controls['viasAccesoImp'].setValue(this.info.viasAccesoEImportancia);  
                 this.carUrb1FormGroup.controls['claveUsoSueloF'].setValue(this.info.claveUsoSueloF);  
                 this.carUrb1FormGroup.controls['descripUsoSueloF'].setValue(this.info.descripUsoSueloF);  
                 this.carUrb1FormGroup.controls['coeficienteDeUsoDelSueloF'].setValue(this.info.coeficienteDeUsoDelSueloF);  
                }
  
               },
               error => {
                this.alertCaract = true;  
                this.loading = false;
                this.msg = error;
                this.classAlert = 'alert-danger alert alert-dismissible fade show';
               }); 
               
               
       }

    //Llama servicio sección Características Urbanas CATÁLOGOS
    getCatCaractUrbanas (tipo: string) {

    this.loading = true;
    this.catalogoService.getCatalogoCaractUrb(tipo)
          .pipe(first())
          .subscribe( data => {                    
                this.loading = false;

                switch(tipo)
                { 
                  case "CLASIFICACIONZONA":
                  this.clasifZonaCat = data; 
                  break;
                  case "ESTCLASIFICACIONZONA":
                    this.estClasifZonaCat = data; 
                  break;
                  case "DENCIDADPOBLACION":
                    this.densidadPobCat = data; 
                  break;
                  case "INDICESATURAZONA":
                    this.indiceSatZonaCat = data; 
                  break;
                  case "NIVELSOCIOECONO":
                    this.nivleSocioEconoCat = data; 
                  break;
                  case "USOSUELO":
                    this.usoSueloCat = data; 
                  break;
                  case "DENCIDADVIVIENDA":
                    this.dencidadViviendaCat = data; 
                  break;
                  default: 
                } 

           
         
              },
              error => {
                this.alertCaract = true;  
                this.loading = false;
                this.msg = error;
                this.classAlert = 'alert-danger alert alert-dismissible fade show';
              });    
  }


   // convenience getter for easy access to form fields
   get ant2() { return this.carUrb2FormGroup.controls; }


   //Llama servicio para alta de Equipamiento Urbano
   addEquipamientoUrbano(){
  
  
      // stop here if form is invalid
      if (this.carUrb2FormGroup.invalid) {
        return;
      }


    this.templos = this.carUrb2FormGroup.get('templos').value;
    this.mercados = this.carUrb2FormGroup.get('mercados').value;
    this.plazasPublicas = this.carUrb2FormGroup.get('plazasPublicas').value;
    this.parquesJardines = this.carUrb2FormGroup.get('parquesJardines').value;
    this.escuelas = this.carUrb2FormGroup.get('escuelas').value;
    this.hospitales = this.carUrb2FormGroup.get('hospitales').value;
    this.bancos = this.carUrb2FormGroup.get('bancos').value;
    this.estacionTransporte = this.carUrb2FormGroup.get('estacionTransporte').value;


   this.equipaUrbano = {idsuministrotelefonico: this.ant2.idSuministroTelefonico.value, idacometidainmueble: this.ant2.idAcometidaInmueble.value, idsenalizacionvias: this.ant2.idSenalizacionVias.value,
    idnomenclaturacalle: this.ant2.idNomenclaturaCalle.value,  distanciatransporteurbano: this.ant2.distanciaTransporteUrbano.value, frecuenciatransporteurbano: this.ant2.frecuenciaTransporteUrbano.value, 
    distanciatransportesuburbano: this.ant2.distanciaTransporteSuburbano.value,  frecuenciatransportesuburbano: this.ant2.frecuenciaTransporteSuburbano.value, idrecoleccionbasura: this.ant2.idRecoleccionBasura.value, 
    templos: this.templos, mercados: this.mercados, plazaspublicas: this.plazasPublicas, parquesjardines: this.parquesJardines, escuelas: this.escuelas, hospitales: this.hospitales, 
    bancos: this.bancos, estaciontransporte: this.estacionTransporte, nivelEquipamientoF: this.ant2.nivelEquipamientoF.value}
       
    this.loading = true;
    this.caracteristicasUrbanasService.addEquipamientoUrbano(this.folio, this.equipaUrbano)
        .pipe(first())
        .subscribe(
            data => {
  
            if(data.ok){
              this.alertServicios = true;        
              this.loading = false;
              this.msg = data.mensaje;
              this.classAlert = 'alert-success alert alert-dismissible fade show'; 
          } else {
            this.alertServicios = true;  
            this.loading = false;
            this.msg = data.mensaje;;
            this.classAlert = 'alert-danger alert alert-dismissible fade show';
          }
          },
          error => {
            this.alertServicios = true;  
            this.loading = false;
            this.msg = error;
            this.classAlert = 'alert-danger alert alert-dismissible fade show';
          });
  
    }
  
    //Llama servicio para la consulta de Equipamiento Urbano
    searchEquipamientoUrbano () {
  
    this.closeAlertServicios();
    this.loading = true;
    this.caracteristicasUrbanasService.searchEquipamientoUrbano(this.folio)
           .pipe(first())
           .subscribe( data => {                    
                 this.loading = false;
                 this.info = data.equipamientoUrbano;
                if (this.info != ""){
  
                 this.carUrb2FormGroup.controls['idSuministroTelefonico'].setValue(this.info.idSuministroTelefonico); 
                 this.carUrb2FormGroup.controls['idAcometidaInmueble'].setValue(this.info.idAcometidaInmueble);
                 this.carUrb2FormGroup.controls['idSenalizacionVias'].setValue(this.info.idSenalizacionVias);
                 this.carUrb2FormGroup.controls['idNomenclaturaCalle'].setValue(this.info.idNomenclaturaCalle);
                 this.carUrb2FormGroup.controls['distanciaTransporteUrbano'].setValue(this.info.distanciaTranporteUrbano);
                 this.carUrb2FormGroup.controls['frecuenciaTransporteUrbano'].setValue(this.info.frecuenciaTransporteUrbano);
                 this.carUrb2FormGroup.controls['distanciaTransporteSuburbano'].setValue(this.info.distanciaTransporteSuburbano);
                 this.carUrb2FormGroup.controls['frecuenciaTransporteSuburbano'].setValue(this.info.frecuenciaTransporteSuburbano);
                 this.carUrb2FormGroup.controls['idRecoleccionBasura'].setValue(this.info.idRecoleccionBasura);
                 this.carUrb2FormGroup.controls['templos'].setValue(this.info.templo);
                 this.carUrb2FormGroup.controls['mercados'].setValue(this.info.mercados);                   
                 this.carUrb2FormGroup.controls['plazasPublicas'].setValue(this.info.plazasPublicas);           
                 this.carUrb2FormGroup.controls['parquesJardines'].setValue(this.info.parquesJardines); 
                 this.carUrb2FormGroup.controls['escuelas'].setValue(this.info.escuelas);  
                 this.carUrb2FormGroup.controls['hospitales'].setValue(this.info.hospitales);  
                 this.carUrb2FormGroup.controls['bancos'].setValue(this.info.bancos);  
                 this.carUrb2FormGroup.controls['estacionTransporte'].setValue(this.info.estacionTransporte); 
                 this.carUrb2FormGroup.controls['nivelEquipamientoF'].setValue(this.info.nivelEquipamientoF);    
                }
  
               },
               error => {
                this.alertServicios = true;  
                this.loading = false;
                this.msg = error;
                this.classAlert = 'alert-danger alert alert-dismissible fade show';
               }); 
               
               
       }

      //Llama servicio sección Equipamiento Urbano CATÁLOGOS
      getCatEquipaUrbano (tipo: string) {

      this.loading = true;
      this.catalogoService.getCatalogoEquipaUrbano(tipo)
            .pipe(first())
            .subscribe( data => {                    
                  this.loading = false;
  
                  switch(tipo)
                  { 
                    case "SUMINISTROTEL":
                    this.suministroTelCat = data; 
                    break;
                    case "ACOMETIDAINMUEBLE":
                      this.acometidaInmuebleCat = data; 
                    break;
                    case "SENALIZACIONVIAS":
                      this.senalizacionViasCat = data; 
                    break;
                    case "NOMENCLATURACALLES":
                      this.senalizacionViasCat = data; 
                    break;
                    case "RECOLECCIONBASURA":
                      this.recoleccionBasuraCat = data; 
                    break;
                    default: 
                  } 
          
                },
                error => {
                  this.alertServicios = true;  
                  this.loading = false;
                  this.msg = error;
                  this.classAlert = 'alert-danger alert alert-dismissible fade show';
                });    
    }  

    closeAlertCaract(){
      this.alertCaract = false;
    }

    closeAlertServicios(){
      this.alertServicios = false;
    }

}
