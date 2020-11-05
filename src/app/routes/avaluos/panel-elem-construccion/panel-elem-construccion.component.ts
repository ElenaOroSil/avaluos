import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import { ElementosConstruccionService } from './../../../_services/elementosConstruccion.service'
import { first } from 'rxjs/operators';
import { ElementosConstruccion } from 'app/_models/elementosConstruccion.model';

@Component({
  selector: 'app-panel-elem-construccion',
  templateUrl: './panel-elem-construccion.component.html',
  styleUrls: ['./panel-elem-construccion.component.scss']
})
export class PanelElemConstruccionComponent implements OnInit {
  isLinear = false;
  eleConst1FormGroup: FormGroup;
  isExpanded:boolean = false;
  alertElementoCons: boolean = false;
  classAlert: string;
  loading = false;
  folio = localStorage.getItem('folio');
  info: any = [];
  msg= '';
  elementosConstruccion: ElementosConstruccion;

  //Elementos de la construcción
  cimientos;
  estructuras;
  muros;
  entrepisos;
  techos;
  azoteas;
  bardas;
  aplanados;
  plafones;
  lambrines;
  pisos;
  zoclos;
  escaleras;
  pintura;
  recubrimientosEspeciales;
  puertasInteriores;
  guardaropas;
  mueblesEmpotradosFijos;
  mueblesBanio;
  ramaleosHidraulicos;
  ramaleosSanitarios;
  instalacionesElectricas;
  herreria;
  ventaneria;
  vidrieria;
  cerrajeria;
  fachadas;


  constructor(private formBuilder: FormBuilder,
    private elementosConsService: ElementosConstruccionService,) { }

  ngOnInit(): void {

    this.expand();

    //busca elementos de construccion
    this.searchElementosConstruccion();

    this.eleConst1FormGroup = this.formBuilder.group({
      'cimientos': new FormControl(''),
      'estructuras': new FormControl(''),
      'muros':  new FormControl(''),
      'entrepisos':  new FormControl(''),
      'techos':  new FormControl(''),
      'azoteas':  new FormControl(''),
      'bardas': new FormControl(''),
      'aplanados': new FormControl(''),
      'plafones':  new FormControl(''),
      'lambrines':  new FormControl(''),
      'pisos': new FormControl(''),
      'zoclos':  new FormControl(''),
      'escaleras':  new FormControl(''),
      'pintura':  new FormControl(''),
      'recubrimientosEspeciales':  new FormControl(''),
      'puertasInteriores':  new FormControl(''),
      'guardaropas': new FormControl(''),
      'mueblesEmpotradosFijos':  new FormControl(''),
      'mueblesBanio': new FormControl(''),
      'ramaleosHidraulicos': new FormControl(''),
      'ramaleosSanitarios': new FormControl(''),
      'instalacionesElectricas': new FormControl(''),
      'herreria':  new FormControl(''),
      'ventaneria':  new FormControl(''),
      'vidrieria': new FormControl(''),
      'cerrajeria': new FormControl(''),
      'fachadas': new FormControl(''),
    });

   

  }

  expand(){
    this.isExpanded = !this.isExpanded;
  }

   //Llama servicio para la consulta de elementos de construccion
   searchElementosConstruccion () {

    this.closeAlertElementosCons();
    this.loading = true;
    this.elementosConsService.searchElementosConst(this.folio)
           .pipe(first())
           .subscribe( data => {                    
                 this.loading = false;
                 this.info = data.elementosConstrucion;

                if (this.info != ""){
                 this.eleConst1FormGroup.controls['cimientos'].setValue(this.info[0].cimientos); 
                 this.eleConst1FormGroup.controls['estructuras'].setValue(this.info[0].estructuras); 
                 this.eleConst1FormGroup.controls['muros'].setValue(this.info[0].muros);
                 this.eleConst1FormGroup.controls['entrepisos'].setValue(this.info[0].entrepisos);
                 this.eleConst1FormGroup.controls['techos'].setValue(this.info[0].techos);
                 this.eleConst1FormGroup.controls['azoteas'].setValue(this.info[0].azoteas);
                 this.eleConst1FormGroup.controls['bardas'].setValue(this.info[0].bardas);
                 this.eleConst1FormGroup.controls['aplanados'].setValue(this.info[0].aplanados);
                 this.eleConst1FormGroup.controls['plafones'].setValue(this.info[0].plafones);
                 this.eleConst1FormGroup.controls['lambrines'].setValue(this.info[0].lambrines);                   
                 this.eleConst1FormGroup.controls['pisos'].setValue(this.info[0].pisos);           
                 this.eleConst1FormGroup.controls['zoclos'].setValue(this.info[0].zoclos); 
                 this.eleConst1FormGroup.controls['escaleras'].setValue(this.info[0].escaleras);  
                 this.eleConst1FormGroup.controls['pintura'].setValue(this.info[0].pintura);  
                 this.eleConst1FormGroup.controls['recubrimientosEspeciales'].setValue(this.info[0].recubrimientosEspeciales);  
                 this.eleConst1FormGroup.controls['puertasInteriores'].setValue(this.info[0].puertasInteriores);  
                 this.eleConst1FormGroup.controls['guardaropas'].setValue(this.info[0].guardaropas);  
                 this.eleConst1FormGroup.controls['mueblesEmpotradosFijos'].setValue(this.info[0].mueblesEmpotradosFijos);  
                 this.eleConst1FormGroup.controls['mueblesBanio'].setValue(this.info[0].mueblesBaño);  
                 this.eleConst1FormGroup.controls['ramaleosHidraulicos'].setValue(this.info[0].ramaleosHidraulicos);  
                 this.eleConst1FormGroup.controls['ramaleosSanitarios'].setValue(this.info[0].ramaleosSanitarios);  
                 this.eleConst1FormGroup.controls['instalacionesElectricas'].setValue(this.info[0].instalacionesElectricas);  
                 this.eleConst1FormGroup.controls['herreria'].setValue(this.info[0].herreria);  
                 this.eleConst1FormGroup.controls['ventaneria'].setValue(this.info[0].ventaneria);  
                 this.eleConst1FormGroup.controls['vidrieria'].setValue(this.info[0].vidrieria);  
                 this.eleConst1FormGroup.controls['cerrajeria'].setValue(this.info[0].cerrajeria);  
                 this.eleConst1FormGroup.controls['fachadas'].setValue(this.info[0].fachadas);  
                }
  
               },
               error => {
                this.alertElementoCons = true;  
                this.loading = false;
                this.msg = error;
                this.classAlert = 'alert-danger alert alert-dismissible fade show';
               });               
               
       }

       closeAlertElementosCons(){
        this.alertElementoCons = false;
      }

        // convenience getter for easy access to form fields
        get ant1() { return this.eleConst1FormGroup.controls; }


       //Llama servicio para alta de elementos de construccion
       addElementosCons(){

  
    // stop here if form is invalid
    if (this.eleConst1FormGroup.invalid) {
      return;
  }

  this.elementosConstruccion = {cimientos: this.ant1.cimientos.value, estructuras: this.ant1.estructuras.value, muros: this.ant1.muros.value, 
    entrepisos: this.ant1.entrepisos.value, techos: this.ant1.techos.value,  azoteas: this.ant1.azoteas.value, bardas: this.ant1.bardas.value, 
    aplanados: this.ant1.aplanados.value,  plafones: this.ant1.plafones.value, lambrines: this.ant1.lambrines.value, pisos: this.ant1.pisos.value, 
    zoclos: this.ant1.zoclos.value, escaleras: this.ant1.escaleras.value, pintura: this.ant1.pintura.value, 
    recubrimientosEspeciales: this.ant1.recubrimientosEspeciales.value, puertasInteriores: this.ant1.puertasInteriores.value, 
    guardaropas: this.ant1.guardaropas.value, mueblesEmpotradosFijos: this.ant1.mueblesEmpotradosFijos.value, mueblesBanio: this.ant1.mueblesBanio.value, 
    ramaleosHidraulicos: this.ant1.ramaleosHidraulicos.value, ramaleosSanitarios: this.ant1.ramaleosSanitarios.value, 
    instalacionesElectricas: this.ant1.instalacionesElectricas.value, herreria: this.ant1.herreria.value, ventaneria: this.ant1.ventaneria.value, 
    vidrieria: this.ant1.vidrieria.value,  cerrajeria: this.ant1.cerrajeria.value, fachadas: this.ant1.fachadas.value }

  
  this.loading = true;
  this.elementosConsService.addElementosCons(this.folio, this.elementosConstruccion)
      .pipe(first())
      .subscribe(
          data => {

          if(data.ok){
            this.alertElementoCons = true;        
            this.loading = false;
            this.msg = data.mensaje;
            this.classAlert = 'alert-success alert alert-dismissible fade show';   
        } else {
          this.alertElementoCons = true;   
          this.loading = false;
          this.msg = data.mensaje;
          this.classAlert = 'alert-danger alert alert-dismissible fade show';
        }
        },
        error => {
          this.alertElementoCons = true;  
          this.loading = false;
          this.msg = error;
          this.classAlert = 'alert-danger alert alert-dismissible fade show';
        });

  }


}
